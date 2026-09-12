import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function ServiceAreas() {
  const regions = [
    {
      city: 'Gwalior',
      tag: 'Headquarters & Studio',
      description:
        'Full architectural design, luxury villas, commercial towers, interior architecture and construction supervision across Aditya Puram, City Center, Morar, and Deen Dayal Nagar.',
    },
    {
      city: 'Indore',
      tag: 'Commercial & High-End Residential',
      description:
        'Modern corporate offices, high-density commercial facades, and bespoke modern residences with climate-optimized passive envelopes.',
    },
    {
      city: 'Jhansi',
      tag: 'Regional Architecture & Estates',
      description:
        'Sprawling rural estates, institutional layouts, and contemporary residential projects across the Bundelkhand corridor.',
    },
    {
      city: 'Bhind',
      tag: 'Bungalow Architecture & Remodelling',
      description:
        'Contemporary multi-generational bungalows, structural remodelling, and high-efficiency brick jaali facade interventions.',
    },
    {
      city: 'Dabra',
      tag: 'Residential & Commercial Planning',
      description:
        'Efficient spatial floor planning, modern facade overhauls, and commercial shopping complexes.',
    },
    {
      city: 'Shivpuri',
      tag: 'Eco-Residences & Nature Retreats',
      description:
        'Biophilic architecture, stone-masonry country homes, and resort layouts attuned to native geography.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#ffffff] border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            06 / Geographic Reach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
            Service <span className="italic font-normal text-accent">Areas.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Headquartered in Gwalior, Urban Plus Architects & Associates provides comprehensive architectural, interior, and site supervision services across major hubs in Central India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((item) => (
            <div
              key={item.city}
              className="p-8 bg-[#fbfbf9] border border-neutral-200 shadow-sm hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <h3 className="text-2xl font-heading font-normal tracking-tight text-neutral-900 group-hover:text-accent transition-colors">
                      {item.city}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium">
                    MP / Central IN
                  </span>
                </div>

                <span className="text-[11px] font-mono tracking-wider uppercase text-accent font-semibold block">
                  {item.tag}
                </span>

                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-800 hover:text-accent font-semibold transition-colors"
                >
                  <span>Inquire in {item.city}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
