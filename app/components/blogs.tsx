'use client';

import { format } from 'date-fns';
import { motion } from 'motion/react';
import Link from 'next/link';
import { BlogPost } from '../articles/utils';
import { beVietnamPro, boringSans, merryWeather } from '../fonts';


export function Blogs({ posts }: { posts: BlogPost[] }) {
  return (
    <div className={`max-w-4xl mx-auto ${boringSans.className}`}>
      {posts.map((post, index) => {
        return (
          <div key={post.slug}>
            <motion.article
              className="mb-6"
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: index / 10 }}
            >
              <div className="space-y-0">
                <Link href={`/articles/${post.slug}`}>
                  <h2 className={`text-2xl md:text-3xl font-semibold text-black dark:text-white leading-tight cursor-pointer ${boringSans.className}`}>
                    {post.metadata.title}
                  </h2>
                </Link>
                
                <p className={`text-gray-600 dark:text-gray-400 text-base leading-relaxed ${beVietnamPro.className}`}>
                  {post.metadata.summary}
                </p>
                
                <div className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                  <time className="select-none font-serif italic border-b border-gray-400 dark:border-gray-500">
                    {format(new Date(post.metadata.publishedAt), 'EEEE, MMMM dd, yyyy')}
                  </time>
                </div>
              </div>
            </motion.article>
            {index < posts.length - 1 && (
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}