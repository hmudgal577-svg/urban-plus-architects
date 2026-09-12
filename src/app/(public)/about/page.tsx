import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Philosophy from '@/components/home/Philosophy';
import FinalCTA from '@/components/home/FinalCTA';
import { prisma } from '@/lib/prisma';
import { getWhatsAppUrl } from '@/lib/utils';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About Studio & Ar. Shailendra Bhadoria',
  description:
    'Discover the philosophy, legacy, and architectural ethos of Urban Plus Architects & Associates – founded in 2012 by Principal Architect Ar. Shailendra Bhadoria in Gwalior.',
};

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  const whatsappConnectUrl = getWhatsAppUrl(
    settings?.whatsappNumber,
    'Hello Ar. Shailendra Bhadoria, I would like to discuss a new architectural commission with Urban Plus Architects.'
  );

  return (
    <div className="pt-28 pb-16 bg-[#fbfbf9] text-neutral-900">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Studio Background & Identity
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
            Ideas. Space. <br />
            <span className="italic font-normal text-accent">Purpose.</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            {settings?.studioName || 'Urban Plus Architects & Associates'} is a Gwalior-based architecture and building-design studio established in 2012, working across residential and commercial architecture, interiors, planning and visualization.
          </p>
        </div>
      </div>

      {/* Studio Overview Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-200 bg-sand-100 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Urban Plus Architects Studio Philosophy"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-32 h-32 border border-accent/30 -z-0 pointer-events-none" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              Our Ethos Since 2012
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-neutral-900 leading-snug">
              Creating Spaces of Enduring Value & Serenity
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
              Founded in Gwalior over a decade ago, our practice has grown around a single unifying conviction: architecture should feel effortless, harmonious with regional climate, and sculpted around the authentic rituals of those who inhabit it.
            </p>

            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Rather than copying fleeting international trends, we engage deeply with Central India’s microclimate, daylight conditions, and local materials—such as Gwalior sandstone, exposed concrete, and engineered brick jaalis—to craft architecture of quiet authority.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-200 text-xs font-mono">
              <div>
                <span className="text-accent text-3xl font-heading block font-normal">2012</span>
                <span className="text-neutral-500 uppercase tracking-wider">Inception Year</span>
              </div>
              <div>
                <span className="text-neutral-900 text-3xl font-heading block font-normal">6+ Regions</span>
                <span className="text-neutral-500 uppercase tracking-wider">Active Practice</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principal Architect Profile */}
      <section className="py-20 bg-[#f4f3ee] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-neutral-200 bg-sand-100 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
                  alt="Principal Architect Ar. Shailendra Bhadoria"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-light block font-semibold">
                    Leadership
                  </span>
                  <span className="text-xl font-heading font-normal text-white">
                    {settings?.principalArchitect || 'Ar. Shailendra Bhadoria'}
                  </span>
                  <span className="text-xs text-neutral-300 font-light block mt-1">
                    Principal Architect & Founder
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
                Principal Architect
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-light text-neutral-900 tracking-tight">
                {settings?.principalArchitect || 'Ar. Shailendra Bhadoria'}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                <p>
                  As the founding principal of Urban Plus Architects & Associates, Ar. Shailendra Bhadoria has steered the studio’s design vision since its establishment in 2012. His practice encompasses bespoke residential commissions, high-performance commercial landmarks, and sensitive urban renovations.
                </p>
                <p>
                  With an insistence on spatial discipline and material authenticity, Ar. Bhadoria believes that great architecture is measured not merely by dramatic elevation photos, but by the quiet comfort and thermal serenity felt when living inside the space day after day.
                </p>
              </div>

              {/* Approach Pillars */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-neutral-200 shadow-sm space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                    Design Philosophy
                  </h3>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                    Context-driven minimalism that respects regional geography, solar orientation, and spatial proportions.
                  </p>
                </div>
                <div className="p-5 bg-white border border-neutral-200 shadow-sm space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                    Technical Expertise
                  </h3>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                    Comprehensive command of reinforced concrete, long-span steel structures, daylight engineering, and millimeter-accurate site execution.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={whatsappConnectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-ultra text-neutral-900 hover:text-accent font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-accent fill-current" />
                  <span>Connect with Ar. Shailendra Bhadoria on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Philosophy: Context, Function, Expression */}
      <Philosophy />

      <FinalCTA
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />
    </div>
  );
}
