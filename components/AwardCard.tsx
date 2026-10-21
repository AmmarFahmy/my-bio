'use client';
import Image from 'next/image';
import { CSSProperties, useEffect, useRef } from 'react';
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const award = {
  title: 'Merit Award for',
  product: 'LawMate.lk',
  event: 'National AI Awards 2026',
  category: 'Best AI Startup / MSME Innovation',
  body:
    'Presented at the National AI Expo during Sri Lanka AI Week 2026, pioneered by the Ministry of Digital Economy with SLT-MOBITEL.',
  photo: '/awards/national-ai-awards-2026.jpg',
  photoAlt:
    'The LawMate team receiving the Merit Award on stage at the National AI Awards 2026',
  announcement:
    'https://www.facebook.com/61579373747532/posts/ai-amplified-sri-lanka-ai-week-2026-a-night-of-innovation-recognition-and-celebr/122173491428979124/',
  linkedIn: 'https://www.linkedin.com/feed/update/urn:li:activity:7512471402407464960',
  facebook: 'https://www.facebook.com/share/p/1C5GDcj3kU/',
};

// Gold glints. The first lands 300ms after the card scrolls in, then roughly
// one a second for as long as it's on screen. Varied sizes give depth, and
// slightly different cycle lengths stop the pattern from visibly repeating.
const sparkles = [
  { top: '14%', left: '86%', size: 16, delay: 300, cycle: 7 },
  { top: '66%', left: '28%', size: 11, delay: 1300, cycle: 7.6 },
  { top: '34%', left: '60%', size: 13, delay: 2350, cycle: 8.1 },
  { top: '82%', left: '70%', size: 10, delay: 3250, cycle: 7.3 },
  { top: '20%', left: '42%', size: 14, delay: 4300, cycle: 8.6 },
  { top: '52%', left: '92%', size: 12, delay: 5200, cycle: 7.9 },
  { top: '42%', left: '12%', size: 15, delay: 6250, cycle: 8.3 },
];

const MAX_TILT = 3;

export default function AwardCard() {
  const cardRef = useRef<HTMLElement>(null);

  // Cursor-follow tilt. Pointer-fine only: on touch there is no hover state
  // to drive it, and the card would just stick at whatever angle was tapped.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rect: DOMRect | null = null;
    let ticking = false;
    let offsetX = 0;
    let offsetY = 0;

    const apply = () => {
      ticking = false;
      card.style.setProperty('--rx', `${(-offsetY * MAX_TILT).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(offsetX * MAX_TILT).toFixed(2)}deg`);
    };

    // Rect is cached on enter so pointermove never forces a sync layout
    const onEnter = () => {
      rect = card.getBoundingClientRect();
      card.classList.add('is-tilting');
    };

    const onMove = (event: PointerEvent) => {
      if (!rect) rect = card.getBoundingClientRect();
      offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const onLeave = () => {
      rect = null;
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);

    return () => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="glass glow-border spotlight tilt relative w-full overflow-hidden rounded-[28px] p-4 sm:p-6"
    >
      {/* Warm wash inside the glass, so this card reads as the hero moment */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl"
        aria-hidden="true"
      />

      {sparkles.map((spark, index) => (
        <span
          key={index}
          className="sparkle"
          style={
            {
              top: spark.top,
              left: spark.left,
              '--size': `${spark.size}px`,
              '--sd': `${spark.delay}ms`,
              '--cycle': `${spark.cycle}s`,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      ))}

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
        <div className="group relative w-full flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 md:w-[44%]">
          <Image
            src={award.photo}
            alt={award.photoAlt}
            width={1600}
            height={938}
            sizes="(max-width: 767px) calc(100vw - 3rem), 300px"
            className="h-auto w-full object-cover transition-transform duration-700 ease-glass group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-2.5">
          <span className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            Recognition
          </span>

          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-cream-50 sm:text-[1.75rem]">
            {award.title}{' '}
            <span className="text-gold-gradient drop-shadow-[0_0_24px_rgba(245,180,24,0.35)]">
              {award.product}
            </span>
          </h3>

          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream-50/50">
            {award.event}
          </p>

          {/* The category is the headline fact — glow it */}
          <p className="category-chip text-sm font-semibold leading-snug text-gold-300 sm:text-base">
            {award.category}
          </p>

          <p className="mt-0.5 text-sm leading-relaxed text-cream-50/75">{award.body}</p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a
              href={award.announcement}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-gold-300 underline-offset-4 transition-colors duration-300 hover:text-gold-200 hover:underline"
            >
              Official announcement
              <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <span className="flex items-center gap-3 text-cream-50/55">
              <span className="text-xs">Our post:</span>
              <a
                href={award.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-cream-50"
                aria-label="Our LinkedIn post about the award"
              >
                <FaLinkedinIn className="text-sm" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={award.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-cream-50"
                aria-label="Our Facebook post about the award"
              >
                <FaFacebookF className="text-sm" aria-hidden="true" />
                Facebook
              </a>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
