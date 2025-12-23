import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { boringSans } from '../fonts';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ol'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

export const components = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1
      className={`text-3xl md:text-5xl font-bold py-3 mt-8 mb-4 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2
      className={`text-2xl md:text-4xl font-bold py-3 mt-8 mb-4 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3
      className={`text-xl md:text-3xl font-bold py-3 mt-6 mb-3 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <h4
      className={`text-lg md:text-2xl font-bold py-3 mt-6 mb-3 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: HeadingProps) => (
    <h5
      className={`text-xs md:text-lg font-bold py-2 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: HeadingProps) => (
    <h6
      className={`text-xs md:text-base font-bold py-2 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    >
      {children}
    </h6>
  ),
  ol: (props: ListProps) => (
    <ol
      className={`list-decimal pl-5 mb-4 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className={`list-disc pl-5 mb-4 text-gray-900 dark:text-gray-100 ${boringSans.className}`}
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li className={`text-gray-900 dark:text-gray-100 mb-2 ${boringSans.className}`} {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className={`font-medium ${boringSans.className}`} {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className={`font-bold text-gray-900 dark:text-gray-100 ${boringSans.className}`} {...props} />
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <p
      className={`leading-relaxed text-lg text-gray-900 dark:text-gray-100 py-4 ${boringSans.className}`}
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = `text-gray-900 dark:text-gray-100 no-underline cursor-pointer bg-no-repeat bg-linear-to-r  from-primary-500 to-primary-500 [background-position:0_100%] [background-size:100%_0.2em] hover:[background-size:100%_100%] hover:text-white focus:[background-size:100%_100%] motion-safe:transition-all motion-safe:duration-300 dark:from-primary-500 dark:to-primary-500`;

    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    return (
      <code
        className="bg-transparent before:content-none after:content-none text-green-500 text-sm"
        {...props}
      />
    );
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm"
      {...props}
    />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
