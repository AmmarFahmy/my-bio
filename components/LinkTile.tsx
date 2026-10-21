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
      className="group glass-solid glass-sheen glass-interactive shine flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex min-w-0 items-center gap-3">
        {icon && (
          <span
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-lg ring-1 ring-inset ring-white/10 transition-transform duration-300 ease-glass group-hover:scale-110"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span className="truncate text-sm font-medium text-slate-100 sm:text-[0.95rem]">
          {children}
        </span>
      </span>
      <FiExternalLink
        className="h-4 w-4 flex-shrink-0 text-slate-500 transition-all duration-300 ease-glass group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        aria-hidden="true"
      />
    </Link>
  );
}
