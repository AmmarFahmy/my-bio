'use client';
import Image from 'next/image';
import LinkTile from '@/components/LinkTile';
import { ReactNode, useState } from 'react';
import {
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaShare,
  FaCheck
} from 'react-icons/fa';

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

export default function HomePage() {
  const [copySuccess, setCopySuccess] = useState(false);

  // Achievement badges data
  const badges: Badge[] = [
    { id: 'badge0', name: 'Professional Data Scientist', description: 'Professional' },
    { id: 'badge1', name: 'Data Engineering and Machine Learning using Spark', description: 'Skilled' },
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

  // Personal social media links for grid display
  const personalLinks: PersonalLink[] = [
    { platform: 'WhatsApp', url: 'https://wa.me/+94766062424', icon: <FaWhatsapp />, hoverColor: 'hover:bg-green-500' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ammar-fahmy/', icon: <FaLinkedin />, hoverColor: 'hover:bg-blue-600' },
    { platform: 'X', url: 'https://x.com/__sharling__', icon: <FaTwitter />, hoverColor: 'hover:bg-black' },
    { platform: 'Facebook', url: 'https://www.facebook.com/mfahmy.ammar/', icon: <FaFacebook />, hoverColor: 'hover:bg-blue-700' },
    { platform: 'GitHub', url: 'https://github.com/AmmarFahmy', icon: <FaGithub />, hoverColor: 'hover:bg-gray-800' },
    { platform: 'Email', url: 'mailto:ammar.mfahmy@gmail.com', icon: <FaEnvelope />, hoverColor: 'hover:bg-red-500' }
  ];

  // Business/company links for tile display
  const businessTiles: TileGroup[] = [
    {
      heading: 'LawMate.lk',
      headingLogo: '/lawmate.svg',
      links: [
        { label: 'LawMate.lk | WhatsApp', url: 'https://wa.me/+94777357075', icon: <FaWhatsapp className="text-green-500" /> },
        { label: 'LawMate.lk | Website', url: 'https://lawmate.lk/', icon: <FaGlobe className="text-amber-600" /> },
        { label: 'LawMate.lk | Facebook', url: 'https://www.facebook.com/lawmate.lk', icon: <FaFacebook className="text-blue-700" /> },
        { label: 'LawMate.lk | Instagram', url: 'https://www.instagram.com/lawmate.lk', icon: <FaInstagram className="text-pink-600" /> },
        { label: 'LawMate.lk | LinkedIn', url: 'https://www.linkedin.com/company/lawmate-srilanka/', icon: <FaLinkedin className="text-blue-600" /> },
        { label: 'LawMate.lk | X', url: 'https://x.com/lawmate_lk', icon: <FaTwitter className="text-black" /> },
        { label: 'LawMate.lk | E-Mail', url: 'mailto:hi@lawmate.lk', icon: <FaEnvelope className="text-red-500" /> },
      ]
    },
    {
      heading: 'NeuroniumAI',
      headingLogo: '/neuroniumai.svg',
      links: [
        { label: 'NeuroniumAI | WhatsApp', url: 'https://wa.me/+94777357075', icon: <FaWhatsapp className="text-green-500" /> },
        { label: 'NeuroniumAI | Website', url: 'https://www.neuroniumai.com/', icon: <FaGlobe className="text-amber-600" /> },
        { label: 'NeuroniumAI | Facebook', url: 'https://www.facebook.com/neuroniumai', icon: <FaFacebook className="text-blue-700" /> },
        { label: 'NeuroniumAI | LinkedIn', url: 'https://www.linkedin.com/company/neuroniumai/', icon: <FaLinkedin className="text-blue-600" /> },
        { label: 'NeuroniumAI | E-Mail', url: 'mailto:hi@neuroniumai.com', icon: <FaEnvelope className="text-red-500" /> }
      ]
    }
  ];

  return (
    <main className="flex flex-col items-center w-full max-w-2xl gap-6 pb-12">
      {/* Profile Section with Animation */}
      <div className="animate-fadeInUp">
        <Image
          src="/avatar.svg"
          alt="Profile avatar"
          width={140}
          height={140}
          priority
          className="rounded-full shadow-xl ring-4 ring-white"
        />
      </div>
      
      <div className="animate-fadeInUp animation-delay-200">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">Ammar Fahmy</h1>
      </div>
      
      <div className="animate-fadeInUp animation-delay-400">
        <p className="text-center text-gray-600 text-sm md:text-base max-w-md">
          Senior AI/ML Engineer | Lead Data Scientist | NLP Specialist | Certified AI Expert | Founder & CEO of NeuroniumAI, LawMate.lk | Head of IT @ ESHIFT | Co-Creating the Future of Business with AI
        </p>
      </div>

      {/* Copy Profile Link Button */}
      <div className="animate-fadeInUp animation-delay-600">
        <button
          onClick={copyToClipboard}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-300 ease-out
            ${copySuccess 
              ? 'bg-green-500 text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg'
            }
            backdrop-blur-sm shadow-md border border-gray-200
          `}
        >
          {copySuccess ? (
            <>
              <FaCheck className="text-sm" />
              Profile Copied!
            </>
          ) : (
            <>
              <FaShare className="text-sm" />
              Share Profile
            </>
          )}
        </button>
      </div>

      {/* Personal Social Links Grid */}
      <section className="w-full mt-4 animate-fadeInUp animation-delay-800">
        <div className="grid grid-cols-6 gap-4 justify-items-center max-w-sm mx-auto">
          {personalLinks.map((link, index) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center w-14 h-14 rounded-full 
                bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200
                transition-all duration-300 ease-out
                hover:scale-110 hover:shadow-xl hover:text-white
                ${link.hoverColor}
                group animate-scaleIn
              `}
              style={{ animationDelay: `${1000 + index * 100}ms` }}
              title={link.platform}
            >
              <span className="text-xl text-gray-700 group-hover:text-white transition-colors duration-300">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Skills & Achievement Badges Section */}
      <section className="w-full mt-8 animate-fadeInUp animation-delay-1200">
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
          Skills & Achievements
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center max-w-lg mx-auto">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              className="group relative animate-scaleIn"
              style={{ animationDelay: `${1400 + index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg p-2 transition-all duration-300 hover:scale-110 hover:shadow-xl">
                <Image
                  src={`/${badge.id}.png`}
                  alt={badge.name}
                  width={80}
                  height={80}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                <div className="font-medium">{badge.name}</div>
                <div className="text-gray-300">{badge.description}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Business Links Section */}
      <section className="flex flex-col items-center w-full gap-8 mt-8 animate-fadeInUp animation-delay-1600">
        {businessTiles.map((group, groupIndex) => (
          <div 
            key={group.heading} 
            className="flex flex-col items-center w-full gap-4 animate-slideInLeft"
            style={{ animationDelay: `${1800 + groupIndex * 300}ms` }}
          >
            {(group.heading || group.headingLogo) && (
              <h2 className="flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-700/80 text-center">
                {group.headingLogo && (
                  <Image src={group.headingLogo} alt={group.heading} width={24} height={24} className="h-6 w-6" />
                )}
                {group.heading}
              </h2>
            )}
            <div className="flex flex-col items-center w-full gap-3">
              {group.links.map((link, linkIndex) => (
                <div
                  key={link.label}
                  className="animate-slideInRight w-full flex justify-center"
                  style={{ animationDelay: `${2000 + groupIndex * 300 + linkIndex * 100}ms` }}
                >
                  <LinkTile href={link.url} icon={link.icon}>
                    {link.label}
                  </LinkTile>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
} 