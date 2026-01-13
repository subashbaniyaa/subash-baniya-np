import BackNavigation from '../../components/layouts/back-navigation';
import Link from 'next/link';
import { formatDate, getPostFromSlug } from '../utils';
import PageTitle from './page-title';
import { beVietnamPro, boringSans, mukta } from '../../fonts';

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
      <BackNavigation />
      <div className="md:max-w-5xl">
        <PageTitle>{metadata.title}</PageTitle>
        <div className="flex justify-between items-center mt-4 mb-12 text-sm">
          <p className={`text-sm text-neutral-600 dark:text-neutral-400 border-b border-gray-400 dark:border-gray-500 font-serif italic`}>
            {formatDate(metadata.publishedAt)}
          </p>
        </div>
        <article>{content}</article>
        <div className="mt-12 pt-8 border-t border-primary-500">
          <Link href="/articles" className="underline-magical bg-black/10 dark:bg-white/10 px-1 rounded-none">
            Return to articles
          </Link>
        </div>
      </div>
    </section>
  );
}
