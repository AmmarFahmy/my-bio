'use client';
import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; depth: number; fire: number };
type Pulse = { from: number; to: number; t: number; hops: number };

/**
 * A neural network running behind the page.
 *
 * Nodes drift and connect when near. Gold signals travel along the
 * connections, light the pathway they're on, and make the node they reach
 * fire — which can pass the signal on, so activity ripples through the
 * graph. On desktop the cursor joins the network as a node, and nudging it
 * near a node sets that node off.
 *
 * Cost stays flat: edges are batched into a few alpha buckets (a handful of
 * strokes per frame rather than one per edge), and every glow is one sprite
 * rendered up front and stamped with drawImage instead of shadowBlur.
 *
 * Measured, this canvas was ~60% of the main thread's work while scrolling
 * on desktop — the same thread Lenis scrolls the page from, so the two
 * fought and scrolling lagged. Hence three limits:
 *   - it pauses while the page scrolls, and resumes once scrolling settles;
 *   - it draws at most 30fps on every device (a 120Hz screen was drawing it
 *     120 times a second);
 *   - its backing store is capped at 1.25x — it's a soft backdrop, mostly
 *     seen through glass, so the extra resolution bought nothing.
 * Movement is time-based, so frame rate changes smoothness, not speed.
 */
export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 640px), (pointer: coarse)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const NODE_COUNT = compact ? 26 : 46;
    const LINK = compact ? 120 : 150;
    const MAX_DPR = 1.25;
    const FRAME_MS = 1000 / 30;
    const SCROLL_SETTLE_MS = 160; // quiet time after the last scroll before resuming
    const DRIFT = 6; // px per second, per axis, at most
    const PULSE_SPEED = compact ? 110 : 130; // px per second along an edge
    const PULSE_EVERY = compact ? 420 : 260; // ms between new signals
    const MAX_PULSES = compact ? 8 : 14;
    const MAX_HOPS = 3;
    const CURSOR_LINK = 170;
    const EDGE_ALPHA = 0.38;
    const BUCKETS = 8;
    // Nodes wander a full link-length past each edge before wrapping, so a
    // node never vanishes while it still has a visible edge attached.
    const MARGIN = LINK;

    // One gold glow, rendered once, stamped wherever something lights up
    const glow = document.createElement('canvas');
    glow.width = glow.height = 64;
    const glowCtx = glow.getContext('2d');
    if (glowCtx) {
      const grad = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,246,222,1)');
      grad.addColorStop(0.2, 'rgba(255,210,94,0.95)');
      grad.addColorStop(0.5, 'rgba(245,180,24,0.3)');
      grad.addColorStop(1, 'rgba(245,180,24,0)');
      glowCtx.fillStyle = grad;
      glowCtx.fillRect(0, 0, 64, 64);
    }
    const stamp = (x: number, y: number, size: number, alpha: number) => {
      if (alpha <= 0.01) return;
      ctx.globalAlpha = alpha;
      ctx.drawImage(glow, x - size / 2, y - size / 2, size, size);
      ctx.globalAlpha = 1;
    };

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    let last = 0;
    let sinceSpawn = 0;
    const cursor = { x: 0, y: 0, active: false, lastNudge: 0 };

    const seed = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: -MARGIN + Math.random() * (width + MARGIN * 2),
        y: -MARGIN + Math.random() * (height + MARGIN * 2),
        vx: (Math.random() - 0.5) * 2 * DRIFT,
        vy: (Math.random() - 0.5) * 2 * DRIFT,
        depth: Math.random(), // 0 = far and faint, 1 = near and bright
        fire: 0,
      }));
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // Phone toolbars collapsing mid-scroll fire resize without changing
      // the canvas (it's sized to the large viewport). Without this guard the
      // whole network would reshuffle under the user's thumb.
      if (w === width && h === height) return;

      const scaleX = width ? w / width : 1;
      const scaleY = height ? h / height : 1;
      width = w;
      height = h;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';

      // Keep the existing network and stretch it, rather than re-rolling it
      if (nodes.length) {
        for (const node of nodes) {
          node.x *= scaleX;
          node.y *= scaleY;
        }
      } else {
        seed();
      }
    };

    const neighbours = (i: number, except = -1) => {
      const found: number[] = [];
      const a = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i || j === except) continue;
        const dx = a.x - nodes[j].x;
        const dy = a.y - nodes[j].y;
        if (dx * dx + dy * dy < LINK * LINK) found.push(j);
      }
      return found;
    };

    const send = (from: number, except = -1, hops = 0) => {
      if (pulses.length >= MAX_PULSES) return;
      const options = neighbours(from, except);
      if (!options.length) return;
      pulses.push({ from, to: options[(Math.random() * options.length) | 0], t: 0, hops });
    };

    // New signals start from a node that's on screen, so they're seen
    const spawn = () => {
      const visible: number[] = [];
      nodes.forEach((n, i) => {
        if (n.x > 0 && n.x < width && n.y > 0 && n.y < height) visible.push(i);
      });
      if (visible.length) send(visible[(Math.random() * visible.length) | 0]);
    };

    const update = (ms: number) => {
      const s = ms / 1000;
      for (const node of nodes) {
        node.x += node.vx * s;
        node.y += node.vy * s;
        if (node.x < -MARGIN) node.x = width + MARGIN;
        else if (node.x > width + MARGIN) node.x = -MARGIN;
        if (node.y < -MARGIN) node.y = height + MARGIN;
        else if (node.y > height + MARGIN) node.y = -MARGIN;
        node.fire = Math.max(0, node.fire - ms / 700);
      }

      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        p.t += (PULSE_SPEED * s) / length;
      }

      // Arrivals fire their node, and may pass the signal on
      const arrived = pulses.filter((p) => p.t >= 1);
      if (arrived.length) {
        pulses = pulses.filter((p) => p.t < 1);
        for (const p of arrived) {
          nodes[p.to].fire = 1;
          if (p.hops < MAX_HOPS && Math.random() < 0.6) send(p.to, p.from, p.hops + 1);
        }
      }

      sinceSpawn += ms;
      if (sinceSpawn >= PULSE_EVERY) {
        sinceSpawn = 0;
        spawn();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connections, batched by brightness
      const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= LINK * LINK) continue;

          const t = 1 - Math.sqrt(distSq) / LINK;
          const depth = (a.depth + b.depth) / 2;
          const alpha = Math.pow(t, 1.6) * EDGE_ALPHA * (0.55 + 0.45 * depth);
          const bucket = Math.min(BUCKETS - 1, Math.floor((alpha / EDGE_ALPHA) * BUCKETS));
          buckets[bucket].push(a.x, a.y, b.x, b.y);
        }
      }
      ctx.lineWidth = 1;
      buckets.forEach((coords, b) => {
        if (!coords.length) return;
        ctx.strokeStyle = `rgba(196,181,253,${(((b + 0.5) / BUCKETS) * EDGE_ALPHA).toFixed(3)})`;
        ctx.beginPath();
        for (let k = 0; k < coords.length; k += 4) {
          ctx.moveTo(coords[k], coords[k + 1]);
          ctx.lineTo(coords[k + 2], coords[k + 3]);
        }
        ctx.stroke();
      });

      // The cursor, as one more node
      if (cursor.active) {
        for (const node of nodes) {
          const d = Math.hypot(node.x - cursor.x, node.y - cursor.y);
          if (d >= CURSOR_LINK) continue;
          ctx.strokeStyle = `rgba(255,210,94,${(Math.pow(1 - d / CURSOR_LINK, 1.5) * 0.55).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
      }

      // Signals: a fading gold trail lighting the pathway, and a bright head
      ctx.lineWidth = 1.6;
      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const hx = a.x + (b.x - a.x) * p.t;
        const hy = a.y + (b.y - a.y) * p.t;
        const tail = Math.max(0, p.t - 0.45);
        const tx = a.x + (b.x - a.x) * tail;
        const ty = a.y + (b.y - a.y) * tail;
        const trail = ctx.createLinearGradient(tx, ty, hx, hy);
        trail.addColorStop(0, 'rgba(255,210,94,0)');
        trail.addColorStop(1, 'rgba(255,224,140,0.9)');
        ctx.strokeStyle = trail;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        stamp(hx, hy, compact ? 16 : 20, 1);
      }

      // Nodes: nearer ones larger and brighter; firing ones bloom gold
      for (const node of nodes) {
        ctx.fillStyle = `rgba(232,226,255,${(0.35 + 0.5 * node.depth).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 0.8 + node.depth * 1.5, 0, Math.PI * 2);
        ctx.fill();
        if (node.fire > 0) stamp(node.x, node.y, 18 + 26 * node.fire, node.fire);
      }
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!last) {
        last = now;
        return;
      }
      const elapsed = now - last;
      if (elapsed < FRAME_MS) return;
      last = now;
      update(Math.min(elapsed, 100)); // clamp the jump after a background tab
      draw();
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    // Hold still while the page scrolls, so the scroll gets the main thread
    let settle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      stop();
      clearTimeout(settle);
      settle = setTimeout(() => {
        if (!document.hidden) start();
      }, SCROLL_SETTLE_MS);
    };

    // Desktop only: the cursor links to nearby nodes, and moving it close to
    // one sets that node off. Throttled so a fast sweep can't flood the graph.
    const onPointerMove = (event: PointerEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      cursor.active = true;

      const now = performance.now();
      if (now - cursor.lastNudge < 320) return;
      let nearest = -1;
      let best = CURSOR_LINK;
      nodes.forEach((node, i) => {
        const d = Math.hypot(node.x - cursor.x, node.y - cursor.y);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      if (nearest >= 0) {
        cursor.lastNudge = now;
        nodes[nearest].fire = 1;
        send(nearest);
      }
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) cursor.active = false;
    };

    resize();
    draw();
    canvas.classList.add('is-ready');

    // Reduced motion still gets the network — just as a still image
    if (reduceMotion) return;

    for (let k = 0; k < 4; k++) spawn(); // alive from the first frame
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerout', onPointerOut, { passive: true });
    }

    return () => {
      stop();
      clearTimeout(settle);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}
