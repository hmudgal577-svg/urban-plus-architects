import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import FinalCTA from '@/components/home/FinalCTA';

export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Urban Plus Insights`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()) : [];

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.coverImage],
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Urban Plus Architects & Associates',
      logo: {
        '@type': 'ImageObject',
        url: 'https://urbanplusarchitects.com/images/logo.png',
      },
    },
    description: post.summary,
  };

  return (
    <article className="pt-28 pb-24 bg-[#fbfbf9] text-neutral-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6">
        <Link
          href="/insights"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-4 pb-12 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-accent text-white font-medium">
            {post.category}
          </span>
          <span className="flex items-center space-x-1.5 text-xs text-neutral-500 font-mono">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{formatDate(post.publishedAt)}</span>
          </span>
          <span className="flex items-center space-x-1.5 text-xs text-neutral-500 font-mono ml-2">
            <User className="w-3.5 h-3.5 text-accent" />
            <span>{post.author}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-light tracking-tight text-neutral-950 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
          {post.summary}
        </p>
      </div>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 my-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-neutral-200 bg-neutral-100 shadow-md">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
        <div className="space-y-6 text-base sm:text-lg text-neutral-700 font-light leading-relaxed whitespace-pre-line prose prose-neutral max-w-none">
          {post.content}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="pt-12 mt-12 border-t border-neutral-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-accent mr-1" />
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white border border-neutral-200 text-xs font-mono text-neutral-600 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="mt-12 p-8 border border-neutral-200 bg-white shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt={post.author}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-heading font-medium text-neutral-900">
              {post.author}
            </h4>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Principal Architect at Urban Plus Architects & Associates, Gwalior. Guiding architectural commissions across Central India with a dedication to climate responsiveness and modern spatial purity.
            </p>
          </div>
        </div>
      </div>

      <FinalCTA />
    </article>
  );
}
