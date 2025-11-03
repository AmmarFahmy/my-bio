import Link from 'next/link';
import { ReactNode } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface LinkTileProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function LinkTile({ href, icon, children }: LinkTileProps) {
  return (
    <Link
      href={href}
      className="group w-full max-w-md backdrop-blur bg-white/60 hover:bg-white/70 transition transform shadow-md flex items-center justify-between px-5 py-4 rounded-xl border border-white/80 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg hover:ring-2 hover:ring-techblue-dark/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-techblue-dark/50 focus-visible:ring-offset-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl flex-shrink-0" aria-hidden="true">{icon}</span>}
        <span className="font-medium text-gray-800 text-sm md:text-base">{children}</span>
      </div>
      <FiExternalLink className="w-5 h-5 text-gray-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </Link>
  );
} 