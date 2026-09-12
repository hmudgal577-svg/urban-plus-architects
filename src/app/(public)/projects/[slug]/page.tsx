import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProjectGallery from '@/components/projects/ProjectGallery';
import { getWhatsAppUrl } from '@/lib/utils';

export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Urban Plus Architects`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Urban Plus Architects Gwalior`,
      description: project.shortDescription,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const [project, settings] = await Promise.all([
    prisma.project.findUnique({
      where: { slug: params.slug },
    }),
    prisma.siteSettings.findUnique({
      where: { id: 'default' },
    }),
  ]);

  if (!project) {
    notFound();
  }

  // Parse JSON data safely
  const galleryImages: string[] = project.gallery ? JSON.parse(project.gallery) : [project.coverImage];
  const floorPlans: { title: string; image: string }[] = project.floorPlans ? JSON.parse(project.floorPlans) : [];
  const elevations: { title: string; image: string }[] = project.elevations ? JSON.parse(project.elevations) : [];
  const interiorImages: string[] = project.interiorImages ? JSON.parse(project.interiorImages) : [];
  const exteriorImages: string[] = project.exteriorImages ? JSON.parse(project.exteriorImages) : [];
  const renders3D: string[] = project.renders3D ? JSON.parse(project.renders3D) : [];
  const beforeAfter: { label: string; before: string; after: string }[] = project.beforeAfter ? JSON.parse(project.beforeAfter) : [];
  const specifications: { label: string; value: string }[] = project.specifications ? JSON.parse(project.specifications) : [];

  const whatsappProjectUrl = getWhatsAppUrl(
    settings?.whatsappNumber,
    `Hello Urban Plus Architects, I would like to discuss a project similar to ${project.title}.`
  );

  return (
    <article className="pt-28 pb-24 bg-[#fbfbf9] text-neutral-900">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Project Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-4 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-accent text-white font-semibold">
            {project.category}
          </span>
          <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-neutral-100 border border-neutral-200 text-neutral-700">
            {project.year}
          </span>
          <span className="inline-flex items-center space-x-1.5 text-xs text-neutral-600 font-mono tracking-wider ml-2">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>{project.location}</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-tighter text-neutral-900 leading-tight max-w-5xl mb-8">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-3xl leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Hero Full-Width Cover Image */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[16/8] max-h-[750px] overflow-hidden border-y border-neutral-200 my-8 shadow-sm">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Project Overview & Metadata Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Narrative, Concept, Challenges & Solution */}
          <div className="lg:col-span-8 space-y-12">
            {/* Full Description */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-ultra text-accent font-semibold">
                01 / Project Overview
              </h2>
              <div className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </div>
            </div>

            {/* Design Concept */}
            {project.designConcept && (
              <div className="space-y-4 pt-6 border-t border-neutral-200">
                <h2 className="text-xs font-mono uppercase tracking-ultra text-accent font-semibold">
                  02 / Design Concept
                </h2>
                <div className="text-base text-neutral-700 font-normal leading-relaxed">
                  {project.designConcept}
                </div>
              </div>
            )}

            {/* Design Challenges & Solution */}
            {(project.challenges || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                {project.challenges && (
                  <div className="space-y-3 bg-white p-6 border border-neutral-200 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                      The Architectural Challenge
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="space-y-3 bg-white p-6 border border-accent/40 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      The Crafted Solution
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Specifications & Project Data Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-neutral-200 bg-white p-8 space-y-6 shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-ultra text-accent font-semibold">
                Project Parameters
              </h3>

              <dl className="space-y-4 text-xs font-mono">
                {project.client && (
                  <div className="flex flex-col border-b border-neutral-100 pb-3">
                    <dt className="text-neutral-500 uppercase">Client Profile</dt>
                    <dd className="text-neutral-900 mt-1 text-sm font-sans font-medium">{project.client}</dd>
                  </div>
                )}
                <div className="flex flex-col border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500 uppercase">Location</dt>
                  <dd className="text-neutral-900 mt-1 text-sm font-sans font-medium">{project.location}</dd>
                </div>
                <div className="flex flex-col border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500 uppercase">Discipline</dt>
                  <dd className="text-neutral-900 mt-1 text-sm font-sans font-medium">{project.category}</dd>
                </div>
                <div className="flex flex-col border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500 uppercase">Year Completed</dt>
                  <dd className="text-neutral-900 mt-1 text-sm font-sans font-medium">{project.year}</dd>
                </div>
                {project.projectSize && (
                  <div className="flex flex-col border-b border-neutral-100 pb-3">
                    <dt className="text-neutral-500 uppercase">Project Scale</dt>
                    <dd className="text-neutral-900 mt-1 text-sm font-sans font-medium">{project.projectSize}</dd>
                  </div>
                )}
                {specifications.map((spec, i) => (
                  <div key={i} className="flex flex-col border-b border-neutral-100 pb-3">
                    <dt className="text-neutral-500 uppercase">{spec.label}</dt>
                    <dd className="text-neutral-900 mt-1 text-sm font-sans font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Direct WhatsApp trigger */}
              <div className="pt-2">
                <a
                  href={whatsappProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Discuss This Space on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Interactive Lightbox Gallery */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-t border-neutral-200">
        <div className="space-y-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Visual Documentation
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-900">
            Editorial Gallery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light">
            Click any frame to view in high-resolution fullscreen lightbox with keyboard navigation.
          </p>
        </div>

        <ProjectGallery images={galleryImages} title={project.title} />
      </div>

      {/* Floor Plans & Architectural Drawings Section */}
      {floorPlans.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-neutral-200">
          <div className="space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              Architectural Drawings
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-900">
              Floor Plans & Technical Layouts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {floorPlans.map((plan, idx) => (
              <div key={idx} className="border border-neutral-200 bg-white p-4 space-y-3 shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2"
                  />
                </div>
                <div className="text-xs font-mono tracking-wider uppercase text-neutral-800 font-medium">
                  {plan.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before / After Transformation Section */}
      {beforeAfter.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-neutral-200">
          <div className="space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              Spatial Evolution
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-900">
              Before & After Transformation
            </h2>
          </div>

          <div className="space-y-8">
            {beforeAfter.map((item, idx) => (
              <div key={idx} className="space-y-3 border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {item.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">
                      Original State (Before)
                    </span>
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-200">
                      <Image src={item.before} alt={`${item.label} before`} fill sizes="50vw" className="object-cover" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-accent block font-medium">
                      Modernized Intervention (After)
                    </span>
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-accent/40">
                      <Image src={item.after} alt={`${item.label} after`} fill sizes="50vw" className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Conversion CTA -> DIRECT WHATSAPP */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mt-20 pt-16 border-t border-neutral-200 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-heading font-light text-neutral-900">
          Have a similar project in mind?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
          From initial zoning and concept feasibility to comprehensive construction monitoring, let’s bring your vision to life.
        </p>
        <div>
          <a
            href={whatsappProjectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-ultra transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Discuss Your Project on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </article>
  );
}
