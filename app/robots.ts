import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://subash-baniya.com.np/sitemap.xml`,
    host: `https://subash-baniya.com.np`,
  };
}
