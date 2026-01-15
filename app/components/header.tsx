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
            <span className={`text-2xl font-bold ${gistesy.className} whitespace-nowrap`}>← HomePage</span>
          </Link>
          <div className="mx-3 w-full border-b border-primary-500" />
        </>
      )}
      {!title && <div className="w-full border-b border-primary-500" />}
      {title && (
        <div className="flex items-center gap-4">
          <span
            className={classNames(
              'text-black dark:text-white text-lg md:text-4xl font-bold',
              boringSans.className,
            )}
          >
            {title}
          </span>
          {title === 'Articles' && (
            <Link 
              href="/archive" 
              className="text-primary-500 hover:underline text-sm md:text-base font-medium"
            >
              Archive
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
