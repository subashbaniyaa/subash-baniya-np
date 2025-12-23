'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { copse } from '../../fonts';
import { navigationLinks } from './constants';
import MobileNav from './mobile-nav';
import SectionContainer from './section-container';
import ThemeSwitch from './theme-switch/theme-switch';
import { ArrowDownIcon } from './icons/arrow-down-icon';

export default function Header() {
  const pathName = usePathname();

  return (
    <SectionContainer>
      <header className="z-40 bg-transparent py-5 md:py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <Link
              href="/"
              className={classNames(
                'hidden text-2xl font-extrabold sm:block',
                copse.className,
              )}
            >
              🌞
            </Link>
          </div>
          <div className="flex items-center space-x-3 text-base leading-5">
            <div className="hidden space-x-5 sm:flex mr-2">
              {navigationLinks.map(({ title, href }) => {
                const active = pathName?.includes(href);
                return (
                  <Link
                    prefetch
                    key={title}
                    href={href}
                    aria-label={title}
                  >
                    <span className={classNames('text-base font-semibold tracking-wide text-gray-900 dark:text-gray-100 flex items-center gap-1', {
                      'border-b border-primary-500': active,
                    })}>
                      {title}
                      <ArrowDownIcon className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-1">
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </SectionContainer>
  );
}
