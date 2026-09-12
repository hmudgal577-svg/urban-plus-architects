import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import FeaturedWorks from '@/components/home/FeaturedWorks';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Selected Architectural Works & Portfolio',
  description:
    'Explore modern residential villas, commercial landmarks, luxury interior architecture, and landscape design by Urban Plus Architects & Associates, Gwalior.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
      category: true,
      year: true,
      shortDescription: true,
      coverImage: true,
      projectSize: true,
    },
  });

  return (
    <div className="pt-28 pb-16 bg-[#fbfbf9] text-neutral-900">
      {/* Portfolio Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Portfolio / Selected Works
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
            Enduring Spaces. <br />
            <span className="italic font-normal text-accent">Thoughtfully Crafted.</span>
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Every project represents a tailored dialogue between site context, architectural geometry, climate mitigation, and fine craftsmanship across Gwalior, Indore, and Central India.
          </p>
        </div>
      </div>

      {/* Filterable Works Grid */}
      <FeaturedWorks projects={projects} />
    </div>
  );
}
