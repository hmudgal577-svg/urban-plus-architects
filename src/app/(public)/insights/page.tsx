import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import FinalCTA from '@/components/home/FinalCTA';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Architectural Insights & Design Journal',
  description:
    'Essays, climate design strategies, material guides, and planning insights from the architects at Urban Plus Architects & Associates, Gwalior.',
};

export default async function InsightsPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="pt-28 pb-16 bg-[#fbfbf9] text-neutral-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Studio Journal & Research
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-neutral-950 leading-tight">
            Architectural <br />
            <span className="italic font-normal text-accent">Insights.</span>
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Explorations into passive climate architecture, materiality, spatial proportion, and contemporary living patterns across Central India.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-neutral-200 p-12">
            <p className="text-neutral-500 font-light">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col justify-between border border-neutral-200 bg-white hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/insights/${post.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-white/90 backdrop-blur-md text-accent border border-neutral-200 font-medium">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-xs font-mono text-neutral-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-heading font-light tracking-tight text-neutral-950 group-hover:text-accent transition-colors leading-snug">
                      <Link href={`/insights/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-neutral-600 group-hover:text-accent transition-colors">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <FinalCTA />
    </div>
  );
}
