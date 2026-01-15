import classNames from 'classnames';
import Link from 'next/link';
import { beVietnamPro, boringSans, gistesy } from '../fonts';

export default function Header({ title }: { title: string }) {
  return (
    <div
      className={classNames(
        'flex gap-4 items-center mb-12',
        beVietnamPro.className,
      )}
    >
      <div className="w-full border-b border-primary-500" />
      {title && (
        <>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={classNames(
                'text-black dark:text-white text-lg md:text-4xl font-bold whitespace-nowrap',
                boringSans.className,
              )}
            >
              {title}
            </span>
          </div>
          <div className="w-full border-b border-primary-500" />
        </>
      )}
    </div>
  );
}
