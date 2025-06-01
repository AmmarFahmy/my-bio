import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ammar Fahmy - Senior AI/ML Engineer & Data Scientist',
  description: 'Senior AI/ML Engineer, Lead Data Scientist, NLP Specialist & Certified AI Expert. Founder & CEO of NeuroniumAI, LawMate.lk. Transforming businesses with AI innovation.',
  keywords: 'Ammar Fahmy, AI Engineer, Machine Learning, Data Scientist, NLP, Artificial Intelligence, NeuroniumAI, LawMate, AI Consultant, ML Engineer, Deep Learning',
  authors: [{ name: 'Ammar Fahmy' }],
  creator: 'Ammar Fahmy',
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://your-domain.com', // Replace with your actual domain
    title: 'Ammar Fahmy - Senior AI/ML Engineer & Data Scientist',
    description: 'Senior AI/ML Engineer, Lead Data Scientist, NLP Specialist & Certified AI Expert. Founder & CEO of NeuroniumAI, LawMate.lk. Transforming businesses with AI innovation.',
    siteName: 'Ammar Fahmy Bio',
    images: [
      {
        url: '/avatar.svg',
        width: 400,
        height: 400,
        alt: 'Ammar Fahmy Profile Picture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ammar Fahmy - Senior AI/ML Engineer & Data Scientist',
    description: 'Senior AI/ML Engineer, Lead Data Scientist, NLP Specialist & Certified AI Expert. Founder & CEO of NeuroniumAI, LawMate.lk.',
    images: ['/avatar.svg'],
    creator: '@__sharling__',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/avatar.svg',
    shortcut: '/avatar.svg',
    apple: '/avatar.svg',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-tl from-techblue-light via-techblue to-white flex items-center justify-center p-4`}
      >
        {children}
      </body>
    </html>
  );
} 