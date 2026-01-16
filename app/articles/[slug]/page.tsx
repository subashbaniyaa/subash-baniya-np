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
      <div className="md:max-w-5xl">
        <PageTitle>{metadata.title}</PageTitle>
        <div className="flex justify-between items-center mt-4 mb-4 text-sm">
          <p className={`text-sm text-neutral-600 dark:text-neutral-400 font-serif italic`}>
            {formatDate(metadata.publishedAt)}
          </p>
        </div>
        <div className="h-px w-full bg-blue-500 mb-12" />
        <article>{content}</article>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-500 flex flex-col gap-8">
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all group w-fit"
          aria-label="Back to articles"
        >
          <BsArrowLeftCircleFill size={32} className="transition-transform group-hover:scale-125 duration-200" />
        </Link>
      </div>
    </section>
  );
}
