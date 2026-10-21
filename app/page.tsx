'use client';
import Image from 'next/image';
import AwardCard from '@/components/AwardCard';
import VentureCard, { Venture } from '@/components/VentureCard';
import { CSSProperties, Fragment, ReactNode, useEffect, useState } from 'react';
import {
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaShare,
  FaCheck,
  FaYoutube
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Type for personal social links
interface PersonalLink {
  platform: string;
  url: string;
  icon: ReactNode;
}

// Type for achievement badges
interface Badge {
  id: string;
  name: string;
  description: string;
}

// Brand colours for venture link chips, lifted a little so they hold up on
// the dark glass
const BRAND = {
  whatsapp: '#34d877',
  web: '#f5b418',
  facebook: '#4d8ef7',
  instagram: '#f0568b',
  linkedin: '#3b8ede',
  x: '#fffbf3',
  email: '#ff7a6b',
  youtube: '#ff5252',
};

// Hero choreography, in ms from load. Everything comes into focus in reading
// order on overlapping beats, so the opening reads as one gesture rather
// than a queue of separate animations.
const T = { avatar: 0, name: 120, roles: 320, tagline: 560, swoosh: 1050, share: 900, social: 980 };

// Start an .enter animation at a given moment
const enterAt = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

// Position within a .reveal-group cascade
const stagger = (index: number) => ({ '--i': index }) as CSSProperties;

// Splits a line into words so each can come into focus on its own beat.
// Spaces stay outside the spans so the line still wraps normally.
function Words({
  text,
  start = 0,
  step = 80,
  className = '',
}: {
  text: string;
  start?: number;
  step?: number;
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={`word ${className}`} style={enterAt(start + index * step)}>
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

// Small label with a breathing gold dot
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow__dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export default function HomePage() {
  const [copySuccess, setCopySuccess] = useState(false);

  // Reveal sections as they scroll into view.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .reveal-group'));
    if (!nodes.length) return;

    // No IntersectionObserver (old Safari, some in-app browsers): show it all.
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Moves the glow inside whichever .spotlight card the pointer is over.
  // Pointer devices only — on touch there's no hover for it to follow.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>('.spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', onPointerMove);
  }, []);

  // Current roles, shown under the name
  const roles = [
    'Founder & CEO of NeuroniumAI & LawMate.lk',
    'Co-Founder & CAiO of QurraAI',
    'AI Engineer @ TheVenture & Innodata',
    'Head of IT @ ESHIFT Campus',
  ];

  // Achievement badges data
  const badges: Badge[] = [
    { id: 'badge0', name: 'Professional Data Scientist', description: 'Professional' },
    { id: 'badge1', name: 'Data Engineering and Machine Learning using Apache Spark', description: 'Skilled' },
    { id: 'badge2', name: 'Deep Learning and Reinforcement Learning', description: 'Skilled' },
    { id: 'badge3', name: 'Machine Learning with Apache Spark', description: 'Skilled' },
    { id: 'badge4', name: 'Professional Data Analyst', description: 'Professional' },
    { id: 'badge5', name: 'Professional Data Scientist', description: 'Professional' },
    { id: 'badge6', name: 'Google Prompting Essentials', description: 'Certified' },
    { id: 'badge7', name: 'Deep Learning with TensorFlow', description: 'Skilled' },
    { id: 'badge8', name: 'Quantum Enigmas', description: 'Certified' }
  ];

  // Copy profile URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Share profile with Web Share API (fallback to clipboard)
  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Ammar Fahmy',
          text: 'Co-Creating the Future of Business with AI',
          url: window.location.href,
        });
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
      }
    } catch (e) {
      // ignore user cancel and fallback
    }
    await copyToClipboard();
  };

  // Personal social media links for grid display
  const personalLinks: PersonalLink[] = [
    { platform: 'WhatsApp', url: 'https://wa.me/+94766062424', icon: <FaWhatsapp /> },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ammar-fahmy/', icon: <FaLinkedin /> },
    { platform: 'X', url: 'https://x.com/_ammar_fahmy_', icon: <FaXTwitter /> },
    { platform: 'Facebook', url: 'https://www.facebook.com/mfahmy.ammar/', icon: <FaFacebook /> },
    { platform: 'GitHub', url: 'https://github.com/AmmarFahmy', icon: <FaGithub /> },
    { platform: 'Email', url: 'mailto:ammar.mfahmy@gmail.com', icon: <FaEnvelope /> }
  ];

  // Organisations, each with its own channels. The role line comes from the
  // roles list above.
  const ventures: Venture[] = [
    {
      name: 'LawMate.lk',
      logo: '/lawmate.svg',
      role: 'Founder & CEO',
      links: [
        { label: 'WhatsApp', url: 'https://wa.me/+94777357075', icon: <FaWhatsapp />, color: BRAND.whatsapp },
        { label: 'Website', url: 'https://lawmate.lk/', icon: <FaGlobe />, color: BRAND.web },
        { label: 'Facebook', url: 'https://www.facebook.com/lawmate.lk', icon: <FaFacebook />, color: BRAND.facebook },
        { label: 'Instagram', url: 'https://www.instagram.com/lawmate.lk', icon: <FaInstagram />, color: BRAND.instagram },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/company/lawmate-srilanka/', icon: <FaLinkedin />, color: BRAND.linkedin },
        { label: 'X', url: 'https://x.com/lawmate_lk', icon: <FaXTwitter />, color: BRAND.x },
        { label: 'E-Mail', url: 'mailto:hi@lawmate.lk', icon: <FaEnvelope />, color: BRAND.email },
      ]
    },
    {
      name: 'NeuroniumAI',
      logo: '/neuroniumai.svg',
      role: 'Founder & CEO',
      links: [
        { label: 'WhatsApp', url: 'https://wa.me/+94777357075', icon: <FaWhatsapp />, color: BRAND.whatsapp },
        { label: 'Website', url: 'https://www.neuroniumai.com/', icon: <FaGlobe />, color: BRAND.web },
        { label: 'Facebook', url: 'https://www.facebook.com/neuroniumai', icon: <FaFacebook />, color: BRAND.facebook },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/company/neuroniumai/', icon: <FaLinkedin />, color: BRAND.linkedin },
        { label: 'E-Mail', url: 'mailto:hi@neuroniumai.com', icon: <FaEnvelope />, color: BRAND.email }
      ]
    },
    {
      name: 'ESHIFT Campus of Higher Studies',
      logo: '/eshift.svg',
      role: 'Head of IT',
      links: [
        { label: 'WhatsApp', url: 'https://wa.me/+94766062424', icon: <FaWhatsapp />, color: BRAND.whatsapp },
        { label: 'Website', url: 'https://eshiftcampus.edu.lk/', icon: <FaGlobe />, color: BRAND.web },
        { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61571169418944', icon: <FaFacebook />, color: BRAND.facebook },
        { label: 'YouTube', url: 'https://www.youtube.com/@Eshift-Campus', icon: <FaYoutube />, color: BRAND.youtube },
        { label: 'E-Mail', url: 'mailto:ammar.mfahmy@gmail.com', icon: <FaEnvelope />, color: BRAND.email }
      ]
    }
  ];

  return (
    <main className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-7 pb-10">
      {/* Profile */}
      <div className="enter enter-scale" style={enterAt(T.avatar)}>
        <div className="avatar-ring glow-border">
          <Image
            src="/avatar.png"
            alt="Photo of Ammar Fahmy"
            width={140}
            height={140}
            priority
            sizes="(max-width: 640px) 112px, 140px"
            className="block h-28 w-28 rounded-full object-cover sm:h-[140px] sm:w-[140px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center font-display text-[2.6rem] font-extrabold leading-none tracking-tight text-cream-50 [text-shadow:0_0_40px_rgba(245,180,24,0.22)] sm:text-6xl">
          <Words text="Ammar Fahmy" start={T.name} step={80} />
        </h1>

        <div className="max-w-md space-y-1 text-center text-[0.95rem] leading-relaxed text-cream-50/65">
          {roles.map((role, index) => (
            <p key={role} className="enter" style={enterAt(T.roles + index * 60)}>
              {role}
            </p>
          ))}
        </div>

        <p className="mt-1 max-w-md text-center font-display text-lg font-semibold tracking-tight text-cream-50 sm:text-xl">
          <Words text="Co-Creating the Future of Business" start={T.tagline} step={40} />{' '}
          <span className="relative inline-block whitespace-nowrap">
            <Words text="with AI" start={T.tagline + 200} step={40} className="text-gold-gradient" />
            <svg
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
              className="swoosh"
              style={enterAt(T.swoosh)}
              aria-hidden="true"
            >
              <path
                d="M2 8C30 3 62 2 90 5S112 9 118 4"
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* Share */}
      <div className="enter mt-1" style={enterAt(T.share)}>
        <button onClick={shareProfile} className="btn-gold shine">
          {copySuccess ? (
            <>
              <FaCheck className="text-sm" aria-hidden="true" />
              Link copied
            </>
          ) : (
            <>
              <FaShare className="text-sm" aria-hidden="true" />
              Share Profile
            </>
          )}
          <span className="sr-only" aria-live="polite">{copySuccess ? 'Profile link copied' : ''}</span>
        </button>
      </div>

      {/* Personal social links */}
      <section className="w-full">
        {/* A 6-column grid rather than a wrapping flex row: the cells scale with
            the viewport, so all six stay on one line even at 320px instead of
            breaking to an awkward 5 + 1. */}
        <div className="mx-auto grid w-full max-w-[20rem] grid-cols-6 gap-2 sm:max-w-[23rem] sm:gap-3">
          {personalLinks.map((link, index) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="glass icon-btn enter enter-scale flex aspect-square w-full items-center justify-center rounded-full"
              style={enterAt(T.social + index * 50)}
              title={link.platform}
              aria-label={link.platform}
            >
              <span className="text-xl" aria-hidden="true">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Award */}
      <section className="reveal mt-4 w-full" aria-labelledby="recognition-heading">
        <h2 id="recognition-heading" className="sr-only">
          Recognition
        </h2>
        <AwardCard />
      </section>

      {/* Skills & badges */}
      <section className="reveal-group mt-6 w-full">
        <div className="mb-6 flex flex-col items-center gap-3" data-stagger style={stagger(0)}>
          <Eyebrow>Credentials</Eyebrow>
          <h2 className="text-center font-display text-2xl font-bold tracking-tight text-cream-50 [text-shadow:0_0_40px_rgba(245,180,24,0.22)] sm:text-3xl">
            Skills, eBadges &amp; Recognitions
          </h2>
        </div>
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              className="badge group relative"
              data-stagger="pop"
              style={stagger(index + 1)}
              tabIndex={0}
              aria-describedby={`${badge.id}-tip`}
            >
              {/* Fixed square keeps the grid even despite mixed badge aspect ratios */}
              <div className="glass spotlight flex aspect-square items-center justify-center rounded-2xl p-2.5">
                <Image
                  src={`/webp/${badge.id}.webp`}
                  alt={badge.name}
                  width={80}
                  height={80}
                  sizes="(max-width: 640px) 25vw, 96px"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Tooltip — opens on hover and on tap, since the wrapper is focusable */}
              <div
                id={`${badge.id}-tip`}
                role="tooltip"
                className="badge-tip pointer-events-none absolute bottom-full z-20 mb-2 w-44 rounded-xl border border-white/10 bg-ink-900/95 px-3 py-2 text-center text-xs opacity-0 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                <div className="font-medium text-cream-50">{badge.name}</div>
                <div className="text-gold-200/70">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organisations */}
      <section className="reveal-group mt-6 flex w-full flex-col items-center gap-4" aria-labelledby="ventures-heading">
        <div data-stagger style={stagger(0)}>
          <h2 id="ventures-heading" className="sr-only">
            Organisations
          </h2>
          <Eyebrow>Organisations</Eyebrow>
        </div>
        {ventures.map((venture, index) => (
          <div key={venture.name} className="w-full" data-stagger style={stagger(index + 1)}>
            <VentureCard venture={venture} />
          </div>
        ))}
      </section>

      <footer className="mt-4 flex items-center gap-2 text-xs text-cream-50/40">
        <span
          className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_10px_2px_rgba(245,180,24,0.6)]"
          aria-hidden="true"
        />
        <span suppressHydrationWarning>© {new Date().getFullYear()} Ammar Fahmy</span>
      </footer>
    </main>
  );
}
