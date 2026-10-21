'use client';
import Image from 'next/image';
import LinkTile from '@/components/LinkTile';
import AwardCard from '@/components/AwardCard';
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

// Type for tile groups
interface TileGroup {
  heading: string;
  headingLogo?: string;
  links: {
    label: string;
    url: string;
    icon: ReactNode;
  }[];
}

// Type for personal social links
interface PersonalLink {
  platform: string;
  url: string;
  icon: ReactNode;
  hoverColor: string;
}

// Type for achievement badges
interface Badge {
  id: string;
  name: string;
  description: string;
}

// Lets a stagger delay ride along in the style prop
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

// Splits a line into words so each can rise out of focus on its own beat.
// Spaces stay outside the spans so the line still wraps normally.
function Words({ text, start = 0, step = 80 }: { text: string; start?: number; step?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="word" style={{ '--w': `${start + index * step}ms` } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

export default function HomePage() {
  const [copySuccess, setCopySuccess] = useState(false);

  // Reveal sections as they scroll into view.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
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
    { platform: 'WhatsApp', url: 'https://wa.me/+94766062424', icon: <FaWhatsapp />, hoverColor: 'hover:bg-green-500' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ammar-fahmy/', icon: <FaLinkedin />, hoverColor: 'hover:bg-blue-600' },
    { platform: 'X', url: 'https://x.com/_ammar_fahmy_', icon: <FaXTwitter />, hoverColor: 'hover:bg-white' },
    { platform: 'Facebook', url: 'https://www.facebook.com/mfahmy.ammar/', icon: <FaFacebook />, hoverColor: 'hover:bg-blue-700' },
    { platform: 'GitHub', url: 'https://github.com/AmmarFahmy', icon: <FaGithub />, hoverColor: 'hover:bg-slate-200' },
    { platform: 'Email', url: 'mailto:ammar.mfahmy@gmail.com', icon: <FaEnvelope />, hoverColor: 'hover:bg-red-500' }
  ];

  // Business/company links for tile display
  const businessTiles: TileGroup[] = [
    {
      heading: 'LawMate.lk',
      headingLogo: '/lawmate.svg',
      links: [
        { label: 'LawMate.lk | WhatsApp', url: 'https://wa.me/+94777357075', icon: <FaWhatsapp className="text-green-400" /> },
        { label: 'LawMate.lk | Website', url: 'https://lawmate.lk/', icon: <FaGlobe className="text-amber-400" /> },
        { label: 'LawMate.lk | Facebook', url: 'https://www.facebook.com/lawmate.lk', icon: <FaFacebook className="text-blue-500" /> },
        { label: 'LawMate.lk | Instagram', url: 'https://www.instagram.com/lawmate.lk', icon: <FaInstagram className="text-pink-500" /> },
        { label: 'LawMate.lk | LinkedIn', url: 'https://www.linkedin.com/company/lawmate-srilanka/', icon: <FaLinkedin className="text-blue-400" /> },
        { label: 'LawMate.lk | X', url: 'https://x.com/lawmate_lk', icon: <FaXTwitter className="text-white" /> },
        { label: 'LawMate.lk | E-Mail', url: 'mailto:hi@lawmate.lk', icon: <FaEnvelope className="text-red-400" /> },
      ]
    },
    {
      heading: 'NeuroniumAI',
      headingLogo: '/neuroniumai.svg',
      links: [
        { label: 'NeuroniumAI | WhatsApp', url: 'https://wa.me/+94777357075', icon: <FaWhatsapp className="text-green-400" /> },
        { label: 'NeuroniumAI | Website', url: 'https://www.neuroniumai.com/', icon: <FaGlobe className="text-amber-400" /> },
        { label: 'NeuroniumAI | Facebook', url: 'https://www.facebook.com/neuroniumai', icon: <FaFacebook className="text-blue-500" /> },
        { label: 'NeuroniumAI | LinkedIn', url: 'https://www.linkedin.com/company/neuroniumai/', icon: <FaLinkedin className="text-blue-400" /> },
        { label: 'NeuroniumAI | E-Mail', url: 'mailto:hi@neuroniumai.com', icon: <FaEnvelope className="text-red-400" /> }
      ]
    },
    {
      heading: 'ESHIFT Campus of Higher Studies',
      headingLogo: '/eshift.svg',
      links: [
        { label: 'ESHIFT | WhatsApp', url: 'https://wa.me/+94766062424', icon: <FaWhatsapp className="text-green-400" /> },
        { label: 'ESHIFT | Website', url: 'https://eshiftcampus.edu.lk/', icon: <FaGlobe className="text-amber-400" /> },
        { label: 'ESHIFT | Facebook', url: 'https://www.facebook.com/profile.php?id=61571169418944', icon: <FaFacebook className="text-blue-500" /> },
        { label: 'ESHIFT | YouTube', url: 'https://www.youtube.com/@Eshift-Campus', icon: <FaYoutube className="text-red-500" /> },
        { label: 'ESHIFT | E-Mail', url: 'mailto:ammar.mfahmy@gmail.com', icon: <FaEnvelope className="text-red-400" /> }
      ]
    }
  ];

  return (
    <main className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-7 pb-16">
      {/* Profile */}
      <div className="animate-fadeInUp">
        <div className="avatar-ring">
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
        <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <Words text="Ammar Fahmy" start={150} step={110} />
        </h1>

        <div className="animate-fadeInUp animation-delay-400 max-w-md space-y-1 text-center text-sm leading-relaxed text-slate-400">
          <p>Founder &amp; CEO of NeuroniumAI &amp; LawMate.lk</p>
          <p>Co-Founder &amp; CAiO of QurraAI</p>
          <p>AI Engineer @ TheVenture &amp; Innodata</p>
          <p>Head of IT @ ESHIFT Campus</p>
        </div>

        <p className="max-w-md text-center text-base font-medium text-slate-100 sm:text-lg">
          <Words text="Co-Creating the Future of Business with AI" start={620} step={60} />
        </p>
      </div>

      {/* Share */}
      <div className="animate-fadeInUp animation-delay-800">
        <button
          onClick={shareProfile}
          className={`glass glass-sheen glass-interactive flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${
            copySuccess ? 'text-green-300' : 'text-slate-200'
          }`}
        >
          {copySuccess ? (
            <>
              <FaCheck className="text-sm" aria-hidden="true" />
              Profile Copied!
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
      <section className="animate-fadeInUp animation-delay-800 w-full">
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
              className={`glass glass-sheen glass-interactive group flex aspect-square w-full items-center justify-center rounded-full hover:text-ink-950 ${link.hoverColor} animate-scaleIn`}
              style={{ animationDelay: `${950 + index * 80}ms` }}
              title={link.platform}
              aria-label={link.platform}
            >
              <span
                className="text-xl text-slate-300 transition-colors duration-300 group-hover:text-ink-950"
                aria-hidden="true"
              >
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Award */}
      <section className="reveal mt-4 w-full" style={delay(0)} aria-labelledby="recognition-heading">
        <h2 id="recognition-heading" className="sr-only">
          Recognition
        </h2>
        <AwardCard />
      </section>

      {/* Skills & badges */}
      <section className="reveal mt-4 w-full" style={delay(80)}>
        <h2 className="mb-6 text-center text-base font-semibold tracking-tight text-slate-200 sm:text-lg">
          Skills, eBadges &amp; Recognitions
        </h2>
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="badge group relative"
              tabIndex={0}
              aria-describedby={`${badge.id}-tip`}
            >
              {/* Fixed square keeps the grid even despite mixed badge aspect ratios */}
              <div className="glass-solid glass-sheen glass-interactive flex aspect-square items-center justify-center rounded-2xl p-2.5">
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
                className="badge-tip glass-solid pointer-events-none absolute bottom-full z-20 mb-2 w-44 rounded-xl px-3 py-2 text-center text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                <div className="font-medium text-slate-100">{badge.name}</div>
                <div className="text-slate-400">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Business links */}
      <section className="mt-4 flex w-full flex-col items-center gap-9">
        {businessTiles.map((group, groupIndex) => (
          <div
            key={group.heading}
            className="reveal cv-auto flex w-full flex-col items-center gap-4"
            style={delay(groupIndex * 60)}
          >
            {(group.heading || group.headingLogo) && (
              <h2 className="flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {group.headingLogo && (
                  <Image
                    src={group.headingLogo}
                    alt=""
                    width={24}
                    height={24}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                )}
                {group.heading}
              </h2>
            )}
            <div className="flex w-full flex-col items-center gap-2.5">
              {group.links.map((link) => (
                <LinkTile key={link.label} href={link.url} icon={link.icon}>
                  {link.label}
                </LinkTile>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
