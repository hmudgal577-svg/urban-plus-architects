'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  category: string;
  year: string;
  shortDescription: string;
  coverImage: string;
  projectSize?: string | null;
}

interface FeaturedWorksProps {
  projects: ProjectItem[];
}

export default function FeaturedWorks({ projects }: FeaturedWorksProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = [
    'ALL',
    'RESIDENTIAL',
    'COMMERCIAL',
    'INTERIOR',
    'LANDSCAPE',
    'VISUALIZATION',
    'RENOVATION',
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    return p.category.toUpperCase().includes(activeFilter);
  });

  return (
    <section className="py-24 sm:py-32 bg-[#ffffff] border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              02 / Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900">
              Selected <span className="italic font-normal text-accent">Works.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              A collection of spaces shaped through architecture, material, light and detail across Central India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-[11px] font-mono tracking-wider uppercase transition-all duration-300 border ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 font-medium shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center glass-card p-12">
            <p className="text-sm font-light text-neutral-500">
              No projects found in this discipline. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx % 3 === 0;
              const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';
              const aspectClass = isLarge ? 'aspect-[16/10]' : 'aspect-[4/5]';

              return (
                <article
                  key={project.id}
                  className={`${colSpan} group flex flex-col justify-between space-y-4`}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block relative w-full overflow-hidden border border-neutral-200 bg-sand-100 shadow-sm group-hover:shadow-xl transition-all duration-500"
                  >
                    <div className={`relative ${aspectClass} w-full overflow-hidden`}>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes={isLarge ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                      {/* Floating Meta Badges */}
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-white/90 backdrop-blur-md text-neutral-900 font-semibold border border-neutral-200 shadow-sm">
                          {project.category}
                        </span>
                        <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-white/90 backdrop-blur-md text-neutral-700 border border-neutral-200">
                          {project.year}
                        </span>
                      </div>

                      {/* Micro arrow cue */}
                      <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>

                  {/* Metadata & Narrative */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-mono tracking-wider">
                      <span>{project.location}</span>
                      {project.projectSize && <span>{project.projectSize}</span>}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-normal tracking-tight text-neutral-900 group-hover:text-accent transition-colors duration-300">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* View All Projects CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-neutral-900 hover:bg-accent text-white text-xs font-semibold uppercase tracking-ultra transition-all duration-300 group shadow-md hover:shadow-xl"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
