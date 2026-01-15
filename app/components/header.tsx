import classNames from 'classnames';
import Link from 'next/link';
import { beVietnamPro, boringSans, gistesy } from '../fonts';

export default function Header({ title }: { title: string }) {
  return (
    <div
      className={classNames(
        'flex gap-2 items-center mb-12',
        beVietnamPro.className,
      )}
    >
      {title && (
        <>
          <Link
            href="/"
            className="flex items-center text-primary-500 outline-0 hover:translate-x-[-4px] transition-transform duration-200 group"
          >
            <span className={`text-2xl font-bold ${gistesy.className} whitespace-nowrap`}>← </span>
          </Link>
          <div className="mx-3 w-full border-b border-primary-500" />
        </>
      )}
      {!title && <div className="w-full border-b border-primary-500" />}
      {title && (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span
            className={classNames(
              'text-black dark:text-white text-lg md:text-4xl font-bold truncate',
              boringSans.className,
            )}
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
