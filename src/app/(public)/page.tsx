import React from 'react';
import Hero from '@/components/home/Hero';
import StudioIntro from '@/components/home/StudioIntro';
import AnimatedStats from '@/components/home/AnimatedStats';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import Philosophy from '@/components/home/Philosophy';
import ServicesGrid from '@/components/home/ServicesGrid';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import ServiceAreas from '@/components/home/ServiceAreas';
import FinalCTA from '@/components/home/FinalCTA';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Fresh content on update

export default async function HomePage() {
  // Fetch dynamic content from Prisma
  const [settings, projects, services] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 'default' } }),
    prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
      take: 6,
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
    }),
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        tagline: true,
        shortDescription: true,
        coverImage: true,
        icon: true,
      },
    }),
  ]);

  return (
    <>
      {/* 1. Cinematic Full-Screen Hero */}
      <Hero
        heading={settings?.tagline}
        subheading={settings?.subheading}
        heroImage={settings?.heroImage}
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />

      {/* 2. Studio Introduction */}
      <StudioIntro />

      {/* 3. Stats Section */}
      <AnimatedStats />

      {/* 4. Selected Works / Featured Projects */}
      <FeaturedWorks projects={projects} />

      {/* 5. Design Philosophy */}
      <Philosophy />

      {/* 6. Core Services Grid */}
      <ServicesGrid services={services} />

      {/* 7. Design Process Timeline */}
      <ProcessTimeline />

      {/* 8. Service Areas in Central India */}
      <ServiceAreas />

      {/* 9. Final Call to Action */}
      <FinalCTA
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />
    </>
  );
}
