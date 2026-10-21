'use client';
import Image from 'next/image';
import { CSSProperties, useEffect, useRef } from 'react';
import { FaAward, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const award = {
  title: 'Merit Award for LawMate.lk',
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

// Burst positions, fired once when the card scrolls into view
const sparkles = [
  { top: '12%', left: '8%', delay: 520 },
  { top: '26%', left: '52%', delay: 900 },
  { top: '64%', left: '38%', delay: 700 },
  { top: '18%', left: '88%', delay: 1120 },
  { top: '78%', left: '72%', delay: 1000 },
  { top: '46%', left: '94%', delay: 1280 },
];

const MAX_TILT = 5;

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
      className="glass-solid award-ring tilt relative w-full overflow-hidden rounded-3xl p-4 sm:p-6"
    >
      {/* Warm wash behind the glass, so this card reads as the hero moment */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      {sparkles.map((spark, index) => (
        <span
          key={index}
          className="sparkle"
          style={{ top: spark.top, left: spark.left, '--sd': `${spark.delay}ms` } as CSSProperties}
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-accent-soft ring-1 ring-inset ring-accent/30">
            <FaAward className="animate-float text-xs" aria-hidden="true" />
            Recognition
          </span>

          <h3 className="award-shine text-xl font-bold leading-tight sm:text-2xl">
            {award.title}
          </h3>

          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            {award.event}
          </p>

          {/* The category is the headline fact — glow it */}
          <p className="category-chip text-sm font-semibold leading-snug text-accent sm:text-base">
            {award.category}
          </p>

          <p className="mt-0.5 text-sm leading-relaxed text-slate-300/90">{award.body}</p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a
              href={award.announcement}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors duration-300 hover:text-accent-soft"
            >
              Official announcement
              <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <span className="flex items-center gap-3 text-slate-400">
              <span className="text-xs">Our post:</span>
              <a
                href={award.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
                aria-label="Our LinkedIn post about the award"
              >
                <FaLinkedinIn className="text-sm" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={award.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
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
