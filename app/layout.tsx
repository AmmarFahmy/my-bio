import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Constellation from '@/components/Constellation';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollFx from '@/components/ScrollFx';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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
  themeColor: '#05060b',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Scroll-reveal starts hidden in CSS. With JS off nothing would ever
            reveal it, so un-hide everything in that case. */}
        <noscript>
          <style>{'.reveal{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body
        className={`${inter.className} min-h-screen bg-ink-950 text-slate-100 antialiased flex justify-center overflow-x-hidden px-4 py-10 sm:py-14`}
      >
        {/* Fixed backdrop the glass panes sit against. Each blob gets a
            wrapper layer so parallax can move it without disturbing the
            blob's own drift animation. */}
        <div className="aurora" aria-hidden="true">
          <div className="aurora-layer" data-speed="0.14">
            <div className="aurora-blob aurora-blob--one" />
          </div>
          <div className="aurora-layer" data-speed="0.07">
            <div className="aurora-blob aurora-blob--two" />
          </div>
          <div className="aurora-layer" data-speed="0.2">
            <div className="aurora-blob aurora-blob--three" />
          </div>
          <Constellation />
        </div>

        <SmoothScroll />
        <ScrollFx />

        {children}

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
