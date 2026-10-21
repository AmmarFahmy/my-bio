'use client';
import { useEffect, useRef } from 'react';

/**
 * Reading-progress bar plus parallax on the aurora layers.
 *
 * Both run off one rAF-throttled passive scroll listener and only ever set
 * transforms, so this stays off the layout/paint path. The parallax moves a
 * wrapper layer rather than the blob itself, leaving the blob's own drift
 * animation free to keep running underneath.
 */
export default function ScrollFx() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const layers = Array.from(document.querySelectorAll<HTMLElement>('.aurora-layer'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ticking = false;

    const update = () => {
      ticking = false;

      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (bar) {
        const progress = max > 0 ? Math.min(Math.max(scrolled / max, 0), 1) : 0;
        bar.style.transform = `scaleX(${progress})`;
      }

      if (reduceMotion) return;

      for (const layer of layers) {
        const speed = Number(layer.dataset.speed ?? 0);
        layer.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  );
}
