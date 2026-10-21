import './globals.css';
import { ReactNode } from 'react';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import Script from 'next/script';
import Constellation from '@/components/Constellation';
import Embers from '@/components/Embers';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollFx from '@/components/ScrollFx';

// Same pairing as the 1ClickLesson landing page: Bricolage for display,
// Figtree for everything else.
const display = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', variable: '--font-display' });
const sans = Figtree({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

const CLARITY_PROJECT_ID = 'z19bxvwp3t';

export const metadata = {
  metadataBase: new URL('https://ammarfahmy.info'),
  title: 'Ammar Fahmy',
  description: 'Co-Creating the Future of Business with AI',
  keywords: 'Ammar Fahmy, AI Engineer, Machine Learning, Data Scientist, NLP, Artificial Intelligence, NeuroniumAI, LawMate, AI Consultant, ML Engineer, Deep Learning, National AI Awards 2026',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
  themeColor: '#0b080c',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Scroll-reveal starts hidden in CSS. With JS off nothing would ever
            reveal it, so un-hide everything in that case. */}
        <noscript>
          <style>
            {'.reveal,.reveal-group [data-stagger]{opacity:1 !important;translate:none !important;scale:none !important}'}
          </style>
        </noscript>
      </head>
      <body
        className="grain flex min-h-screen justify-center overflow-x-hidden bg-ink-950 px-4 py-10 font-sans text-cream-50 antialiased sm:py-14"
      >
        {/* The night sky the glass frosts against. data-speed is each blob's
            parallax rate; ScrollFx applies it on the `translate` property,
            which composes with the drift running on `transform`. */}
        <div className="aurora" aria-hidden="true">
          <div className="aurora-blob aurora-blob--one" data-speed="0.06" />
          <div className="aurora-blob aurora-blob--two" data-speed="0.03" />
          <div className="aurora-blob aurora-blob--three" data-speed="0.1" />
          <div className="aurora-blob aurora-blob--four" data-speed="0.05" />
          <div className="stars" />
          <div className="stars stars--twinkle" />
          <Constellation />
          <Embers layer="back" />
        </div>

        <SmoothScroll />
        <ScrollFx />

        {children}

        <Embers layer="front" />

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>
      </body>
    </html>
  );
}
