import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ammar Fahmy',
  description: 'A beautiful bio link page built with Next.js 14 and Tailwind CSS.',
  icons: {
    icon: '/avatar.svg',
    shortcut: '/avatar.svg',
    apple: '/avatar.svg',
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