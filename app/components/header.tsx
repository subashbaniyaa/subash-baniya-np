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
      <div className="w-full border-b border-primary-500" />
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
