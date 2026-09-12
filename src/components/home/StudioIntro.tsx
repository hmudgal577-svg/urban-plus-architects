import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function StudioIntro() {
  const capabilities = [
    'Architectural Design',
    'Planning & Master Layouts',
    'Interior Architecture',
    'Landscape Architecture',
    '3D Visualization & CGI',
    'Project Planning & BOQ',
    'Construction Supervision',
    'Renovation & Remodelling',
  ];

  return (
    <section id="studio-intro" className="py-24 sm:py-32 bg-[#ffffff] relative border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Architectural Imagery with Caption */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full overflow-hidden border border-neutral-200 bg-sand-100 group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                alt="Urban Plus Architects Studio Philosophy and Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono tracking-widest uppercase text-accent-light block font-medium">
                  Studio Practice
                </span>
                <span className="text-sm font-light text-white tracking-wide">
                  Gwalior &bull; Established 2012
                </span>
              </div>
            </div>
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-32 h-32 border border-accent/30 -z-0 pointer-events-none" />
          </div>

          {/* Right: Studio Narrative & CTA */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
                01 / Studio Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
                Architecture with <span className="italic font-normal text-accent">Purpose.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              Urban Plus Architects & Associates is a Gwalior-based architecture and building-design studio established in 2012 by Principal Architect Ar. Shailendra Bhadoria. We craft forward-thinking environments where structural rigor meets refined tactile luxury.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Our multidisciplinary approach synthesizes architectural design, residential and commercial planning, bespoke interiors, landscape integration, and photorealistic 3D visualization. We champion timeless materiality, climatic responsiveness, and millimeter-level construction supervision across Central India.
            </p>

            {/* Disciplines tags */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-neutral-800 block mb-4 font-semibold">
                Integrated Capabilities:
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-neutral-700 font-normal">
                {capabilities.map((cap) => (
                  <div key={cap} className="flex items-center space-x-2 py-1">
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-ultra text-neutral-900 hover:text-accent font-semibold transition-colors group"
              >
                <span>Discover Our Studio</span>
                <span className="p-2 rounded-full border border-neutral-300 group-hover:border-accent transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
