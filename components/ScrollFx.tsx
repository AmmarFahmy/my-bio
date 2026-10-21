'use client';
import { useEffect, useRef } from 'react';

/**
 * Reading-progress bar plus parallax on the aurora blobs.
 *
 * Both run off one rAF-throttled passive scroll listener and only ever touch
 * transform-family properties, so this stays off the layout/paint path.
 * Parallax is written to the `translate` property rather than `transform`,
 * which the blobs' drift animation already owns — the two compose instead of
 * one overwriting the other.
 */
export default function ScrollFx() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const blobs = Array.from(document.querySelectorAll<HTMLElement>('.aurora-blob[data-speed]'));
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

      // Drift upward with the content, just slower — the backdrop reads as
      // further away. (Moving it against the scroll fights the content.)
      for (const blob of blobs) {
        const speed = Number(blob.dataset.speed ?? 0);
        blob.style.setProperty('translate', `0 ${(-scrolled * speed).toFixed(1)}px`);
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
