import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Blogs } from '../components/blogs';
import Link from 'next/link';
import { getPosts } from './utils';

export const metadata = {
  title: 'Articles',
  description: 'Latest Posts - Subash',
};

export default function ThoughtsPage() {
  const posts = getPosts();

  return (
    <PageContainer>
      <Header title="" />
      <Blogs posts={posts} />
      <div className="mt-12 pt-8 border-t border-primary-500">
        <Link href="/" className="underline-magical bg-black/10 dark:bg-white/10 px-1 rounded">Return to homepage</Link>
      </div>
    </PageContainer>
  );
}
