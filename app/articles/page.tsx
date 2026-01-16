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
      <Blogs posts={posts} />
      <div className="mt-12 pt-8 border-t border-primary-500 flex flex-col gap-8">
        <Link href="/" className="underline-magical bg-black/10 dark:bg-white/10 px-1 rounded-none w-fit">Return to homepage</Link>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all group w-fit"
          aria-label="Back to home"
        >
          <BsArrowLeftCircleFill size={32} className="transition-transform group-hover:scale-125 duration-200" />
        </Link>
      </div>
    </PageContainer>
  );
}
