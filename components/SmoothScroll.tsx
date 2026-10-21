'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Weighted scrolling for mouse and trackpad only.
 *
 * lerp 0.12 rather than 1ClickLesson's 0.085: each frame the page closes
 * that fraction of the remaining distance, and at 0.085 it visibly trails
 * the wheel — which read as lag. 0.12 keeps the glide but answers sooner.
 *
 * Lenis is never created on touch devices — syncTouch: false is not enough.
 * Lenis registers touchstart/touchmove/touchend on window with
 * { passive: false } regardless of syncTouch, and only decides to ignore the
 * event inside the handler. A non-passive touch listener makes every touch
 * scroll wait on the main thread before it can begin, and explicitly opts out
 * of the browser's safeguard that treats window touch listeners as passive.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const pointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!pointerDevice || reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      // Lenis owns scroll position, so in-page anchors go through it
      anchors: { offset: -24 },
      stopInertiaOnNavigate: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
