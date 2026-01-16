import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Blogs } from '../components/blogs';
import Link from 'next/link';
import { getPosts } from './utils';
import { BsArrowLeftCircleFill } from "react-icons/bs";

export const metadata = {
  title: 'Articles',
  description: 'Latest Posts - Subash',
};

export default function ThoughtsPage() {
  const posts = getPosts();

  return (
    <PageContainer>
      <Header title="" />
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group"
          aria-label="Back to home"
        >
          <BsArrowLeftCircleFill size={32} className="transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
      <Blogs posts={posts} />
    </PageContainer>
  );
}
