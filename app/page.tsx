import Image from 'next/image';
import LinkTile from '@/components/LinkTile';
import { ReactNode } from 'react';
import {
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaInstagram
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

export default function HomePage() {
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
      <Image
        src="/avatar.svg"
        alt="Profile avatar"
        width={140}
        height={140}
        priority
        className="rounded-full shadow-xl ring-4 ring-white"
      />
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">Ammar Fahmy</h1>
      <p className="text-center text-gray-600 text-sm md:text-base max-w-md">
        Senior AI/ML Engineer | Lead Data Scientist | NLP Specialist | Certified AI Expert | Founder & CEO of NeuroniumAI, LawMate.lk | Head of IT @ ESHIFT | Co-Creating the Future of Business with AI
      </p>

      {/* Personal Social Links Grid */}
      <section className="w-full mt-4">
        <div className="grid grid-cols-6 gap-4 justify-items-center max-w-sm mx-auto">
          {personalLinks.map((link) => (
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
                group
              `}
              title={link.platform}
            >
              <span className="text-xl text-gray-700 group-hover:text-white transition-colors duration-300">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Business Links Section */}
      <section className="flex flex-col items-center w-full gap-8 mt-8">
        {businessTiles.map((group) => (
          <div key={group.heading} className="flex flex-col items-center w-full gap-4">
            {(group.heading || group.headingLogo) && (
              <h2 className="flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-700/80 text-center">
                {group.headingLogo && (
                  <Image src={group.headingLogo} alt={group.heading} width={24} height={24} className="h-6 w-6" />
                )}
                {group.heading}
              </h2>
            )}
            <div className="flex flex-col items-center w-full gap-3">
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