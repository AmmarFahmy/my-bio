import Image from 'next/image';
import { CSSProperties, ReactNode } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

export interface VentureLink {
  label: string;
  url: string;
  icon: ReactNode;
  /** Brand colour for the icon chip */
  color: string;
}

export interface Venture {
  name: string;
  logo: string;
  role: string;
  links: VentureLink[];
}

export default function VentureCard({ venture }: { venture: Venture }) {
  return (
    <article className="glass spotlight w-full rounded-[28px] p-4 sm:p-5">
      <header className="flex items-center gap-3.5">
        {/* Light chip: the logos are dark marks drawn for a light page, and
            vanish straight onto the night glass */}
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-white to-cream-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.08),0_8px_20px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.25)]">
          <Image src={venture.logo} alt="" width={30} height={30} className="h-[30px] w-[30px]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-tight text-cream-50 sm:text-xl">
            {venture.name}
          </h3>
          <p className="mt-0.5 text-sm text-gold-200/80">{venture.role}</p>
        </div>
      </header>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {venture.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="venture-link"
              aria-label={`${venture.name} ${link.label}`}
            >
              <span className="icon-chip" style={{ '--c': link.color } as CSSProperties} aria-hidden="true">
                {link.icon}
              </span>
              <span className="truncate">{link.label}</span>
              <FiArrowUpRight className="ml-auto hidden h-3.5 w-3.5 flex-shrink-0 text-cream-50/35 sm:block" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
