import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import FinalCTA from '@/components/home/FinalCTA';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Architectural & Interior Services',
  description:
    'Comprehensive architecture, interior design, structural coordination, 3D visualization, and site supervision services by Urban Plus Architects & Associates, Gwalior.',
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    }),
    prisma.siteSettings.findUnique({
      where: { id: 'default' },
    }),
  ]);

  return (
    <div className="pt-28 pb-16 bg-[#fbfbf9] text-neutral-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Studio Disciplines & Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
            Integrated Design. <br />
            <span className="italic font-normal text-accent">Rigorous Execution.</span>
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            From initial site zoning and daylight optimization to turnkey interior styling and on-site construction supervision, Urban Plus provides comprehensive architectural stewardship.
          </p>
        </div>
      </div>

      {/* Services List with Rich Cards */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="space-y-16">
          {services.map((service, idx) => {
            const isReversed = idx % 2 !== 0;
            const features: string[] = service.features ? JSON.parse(service.features) : [];

            return (
              <article
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 border border-neutral-200 bg-white shadow-sm hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                {/* Image Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-sand-100 group">
                    <Image
                      src={service.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-accent tracking-ultra font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                      Discipline
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-900 tracking-tight">
                    {service.title}
                  </h2>

                  {service.tagline && (
                    <p className="text-xs uppercase font-mono tracking-wider text-accent font-semibold">
                      {service.tagline}
                    </p>
                  )}

                  <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Feature Highlights */}
                  {features.length > 0 && (
                    <div className="pt-2 border-t border-neutral-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-normal text-neutral-600">
                        {features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center space-x-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-ultra text-neutral-900 hover:text-accent font-semibold transition-colors"
                    >
                      <span>Explore Service Details</span>
                      <ArrowUpRight className="w-4 h-4 text-accent" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <FinalCTA
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />
    </div>
  );
}
