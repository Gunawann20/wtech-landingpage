import type { BlogPost } from '../types/blog';
import { site } from '../config/site';

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
}

export function absoluteUrl(path = '') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, site.url).href;
}

export function pageTitle(title: string) {
  return title === site.title ? title : `${title} | ${site.name}`;
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

export function blogListingJsonLd(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${site.name} Blog`,
    description: 'Insights on enterprise software, AI automation, and digital engineering.',
    url: absoluteUrl('/blog'),
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: new Date(post.pubDate).toISOString(),
      url: absoluteUrl(`/blog/${post.slug}`),
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };
}

export function articleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.pubDate).toISOString(),
    dateModified: new Date(post.updatedDate ?? post.pubDate).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`),
    },
    image: post.image.startsWith('http') ? post.image : absoluteUrl(post.image),
    keywords: post.tags.join(', '),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
