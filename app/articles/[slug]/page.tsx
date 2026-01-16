import BackNavigation from '../../components/layouts/back-navigation';
import Link from 'next/link';
import { formatDate, getPostFromSlug } from '../utils';
import PageTitle from './page-title';
import { beVietnamPro, boringSans, mukta } from '../../fonts';
import { BsArrowLeftCircleFill } from "react-icons/bs";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { metadata } = await getPostFromSlug(params.slug);

  return {
    title: metadata.title,
    description: metadata.summary,
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { metadata, content } = await getPostFromSlug(params.slug);

  return (
    <section>
      <div className="mb-8">
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group"
          aria-label="Back to articles"
        >
          <BsArrowLeftCircleFill size={32} className="transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
      <div className="md:max-w-5xl">
        <PageTitle>{metadata.title}</PageTitle>
        <div className="flex justify-between items-center mt-4 mb-12 text-sm">
          <p className={`text-sm text-neutral-600 dark:text-neutral-400 border-b border-gray-400 dark:border-gray-500 font-serif italic`}>
            {formatDate(metadata.publishedAt)}
          </p>
        </div>
        <article>{content}</article>
      </div>
    </section>
  );
}
