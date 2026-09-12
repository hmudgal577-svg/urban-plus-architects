import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import FinalCTA from '@/components/home/FinalCTA';
import { getWhatsAppUrl } from '@/lib/utils';

export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | Urban Plus Architects Gwalior`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const [service, settings, relatedProjects] = await Promise.all([
    prisma.service.findUnique({
      where: { slug: params.slug },
    }),
    prisma.siteSettings.findUnique({
      where: { id: 'default' },
    }),
    prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      take: 3,
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        location: true,
        category: true,
        coverImage: true,
        shortDescription: true,
      },
    }),
  ]);

  if (!service) {
    notFound();
  }

  const features: string[] = service.features ? JSON.parse(service.features) : [];
  const whatsappUrl = getWhatsAppUrl(
    settings?.whatsappNumber,
    `Hello Urban Plus Architects, I would like to consult on ${service.title}.`
  );

  return (
    <div className="pt-28 pb-24 bg-[#fbfbf9] text-neutral-900">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-4 pb-12">
        <span className="text-xs font-mono uppercase tracking-ultra text-accent font-semibold block mb-4">
          Architectural Discipline
        </span>
        <h1 className="text-4xl sm:text-6xl font-heading font-light text-neutral-900 tracking-tight leading-tight max-w-4xl mb-6">
          {service.title}
        </h1>
        {service.tagline && (
          <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-3xl leading-relaxed">
            {service.tagline}
          </p>
        )}
      </div>

      {/* Full-width Cover */}
      {service.coverImage && (
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] max-h-[600px] overflow-hidden border-y border-neutral-200 my-8 shadow-sm">
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Deep Dive Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-ultra text-accent font-semibold">
                Scope & Methodology
              </h2>
              <div className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed whitespace-pre-line">
                {service.fullDescription}
              </div>
            </div>

            {features.length > 0 && (
              <div className="space-y-6 pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-heading font-medium text-neutral-900">
                  Key Deliverables & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-5 bg-white border border-neutral-200 shadow-sm flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700 font-normal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 border border-neutral-200 bg-white shadow-sm space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-ultra text-accent font-semibold">
                Consult with our studio
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Whether you require complete architectural blueprints, turnkey interior execution, or precision 3D visualization in Gwalior or nearby regions, our studio is ready to collaborate.
              </p>
              {/* DIRECT WHATSAPP CONSULTATION */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-4 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Discuss on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects Showcase */}
      {relatedProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-neutral-200">
          <div className="space-y-2 mb-10">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-900">
              Related Selected Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="group flex flex-col space-y-3 bg-white p-4 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-100 bg-sand-100">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-1">
                  <span>{p.location}</span>
                  <span className="text-accent font-semibold">{p.category}</span>
                </div>
                <h3 className="text-lg font-heading font-medium text-neutral-900 group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      <FinalCTA
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />
    </div>
  );
}
