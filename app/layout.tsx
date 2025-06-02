import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ammar Fahmy',
  description: 'Co-Creating the Future of Business with AI',
  keywords: 'Ammar Fahmy, AI Engineer, Machine Learning, Data Scientist, NLP, Artificial Intelligence, NeuroniumAI, LawMate, AI Consultant, ML Engineer, Deep Learning',
  authors: [{ name: 'Ammar Fahmy' }],
  creator: 'Ammar Fahmy',
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://ammarfahmy.info',
    title: 'Ammar Fahmy',
    description: 'Co-Creating the Future of Business with AI',
    siteName: 'Ammar Fahmy Bio',
    images: [
      {
        url: 'https://ammarfahmy.info/avatar.png',
        width: 1200,
        height: 1200,
        alt: 'Ammar Fahmy Profile Picture',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ammar Fahmy',
    description: 'Co-Creating the Future of Business with AI',
    images: ['https://ammarfahmy.info/avatar.png'],
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
    icon: '/avatar.png',
    shortcut: '/avatar.png',
    apple: '/avatar.png',
  },
  verification: {
    // DNS Verification is completed .. no need to add any verification codes
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