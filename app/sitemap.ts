import { MetadataRoute } from 'next';
import { getPosts } from './articles/utils';

export const baseUrl = 'https://subash-baniya.com.np';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getPosts().map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ['', 'articles'].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
