import React from 'react';
import Hero from '@/components/home/Hero';
import StudioIntro from '@/components/home/StudioIntro';
import AnimatedStats from '@/components/home/AnimatedStats';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider';
import Philosophy from '@/components/home/Philosophy';
import MaterialityShowcase from '@/components/home/MaterialityShowcase';
import ServicesGrid from '@/components/home/ServicesGrid';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import ProjectEstimator from '@/components/home/ProjectEstimator';
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

      {/* 2. Studio Introduction & Coordinates */}
      <StudioIntro />

      {/* 3. Stats Section */}
      <AnimatedStats />

      {/* 4. Selected Works / Featured Projects */}
      <FeaturedWorks projects={projects} />

      {/* 5. Interactive Architectural Transformation Slider */}
      <BeforeAfterSlider />

      {/* 6. Design Philosophy */}
      <Philosophy />

      {/* 7. Tactile Materiality & Regional Stone Showcase */}
      <MaterialityShowcase />

      {/* 8. Core Services Grid */}
      <ServicesGrid services={services} />

      {/* 9. Design Process Timeline */}
      <ProcessTimeline />

      {/* 10. Interactive Architectural Scope & Budget Estimator */}
      <ProjectEstimator />

      {/* 11. Service Areas in Central India */}
      <ServiceAreas />

      {/* 12. Final Call to Action */}
      <FinalCTA
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />
    </>
  );
}
