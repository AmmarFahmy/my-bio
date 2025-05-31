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

export default function HomePage() {
  const tiles: TileGroup[] = [
    {
      heading: '',
      links: [
        { label: 'Ammar Fahmy | WhatsApp', url: '#', icon: <FaWhatsapp className="text-green-500" /> },
        { label: 'Ammar Fahmy | LinkedIn', url: '#', icon: <FaLinkedin className="text-blue-600" /> },
        { label: 'Ammar Fahmy | X', url: '#', icon: <FaTwitter className="text-black" /> },
        { label: 'Ammar Fahmy | GitHub', url: '#', icon: <FaGithub /> },
        { label: 'Ammar Fahmy | E-Mail', url: '#', icon: <FaEnvelope className="text-red-500" /> }
      ]
    },
    {
      heading: 'LawMate.lk',
      headingLogo: '/lawmate.svg',
      links: [
        { label: 'LawMate.lk | WhatsApp', url: '#', icon: <FaWhatsapp className="text-green-500" /> },
        { label: 'LawMate.lk | Website', url: '#', icon: <FaGlobe className="text-amber-600" /> },
        { label: 'LawMate.lk | Facebook', url: '#', icon: <FaFacebook className="text-blue-700" /> },
        { label: 'LawMate.lk | Instagram', url: '#', icon: <FaInstagram className="text-pink-600" /> },
        { label: 'LawMate.lk | LinkedIn', url: '#', icon: <FaLinkedin className="text-blue-600" /> },
        { label: 'LawMate.lk | E-Mail', url: '#', icon: <FaEnvelope className="text-red-500" /> },
        { label: 'LawMate.lk | X', url: '#', icon: <FaTwitter className="text-black" /> }
      ]
    },
    {
      heading: 'NeuroniumAI',
      headingLogo: '/neuroniumai.svg',
      links: [
        { label: 'NeuroniumAI | WhatsApp', url: '#', icon: <FaWhatsapp className="text-green-500" /> },
        { label: 'NeuroniumAI | Website', url: '#', icon: <FaGlobe className="text-amber-600" /> },
        { label: 'NeuroniumAI | Facebook', url: '#', icon: <FaFacebook className="text-blue-700" /> },
        { label: 'NeuroniumAI | LinkedIn', url: '#', icon: <FaLinkedin className="text-blue-600" /> },
        { label: 'NeuroniumAI | X', url: '#', icon: <FaTwitter className="text-black" /> },
        { label: 'NeuroniumAI | E-Mail', url: '#', icon: <FaEnvelope className="text-red-500" /> }
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
        Senior AI/ML Engineer | Lead Data Scientist | NLP Specialist | Certified AI Expert | Founder & CEO of NeuroniumAI, LawMate.lk | Co-Creating the Future of Business with AI
      </p>

      {/* Links Section */}
      <section className="flex flex-col items-center w-full gap-8 mt-4">
        {tiles.map((group) => (
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