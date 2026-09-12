import React from 'react';
import Image from 'next/image';

export default function Philosophy() {
  const pillars = [
    {
      number: '01',
      title: 'CONTEXT',
      subtitle: 'Architecture that responds to its surroundings.',
      description:
        'Every site possesses a unique microclimate, solar trajectory, and cultural memory. We design structures that do not impose upon their landscape, but rather grow naturally from local geology and climate patterns in Central India.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '02',
      title: 'FUNCTION',
      subtitle: 'Spaces designed around how people actually live and work.',
      description:
        'Aesthetics without functional clarity quickly loses its soul. We optimize circulation, acoustic comfort, thermal buffering, and storage so that daily rituals flow seamlessly and without friction.',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '03',
      title: 'EXPRESSION',
      subtitle: 'A modern visual identity created through form, material, light and detail.',
      description:
        'Modern Indian architecture thrives in the dialogue between honest materials and dramatic natural light. We sculpt monolithic forms using exposed concrete, local sandstone, steel, and warm timber.',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#f7f6f2] border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            03 / Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
            Ideas. Space. <span className="italic font-normal text-accent">Purpose.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Three enduring architectural principles guide every commission we undertake at Urban Plus Architects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group flex flex-col justify-between border border-neutral-200 bg-white p-8 sm:p-10 space-y-8 hover:border-accent/80 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent tracking-ultra font-semibold">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                    Pillar
                  </span>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-sand-100">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-light tracking-tight text-neutral-900">
                  {pillar.title}
                </h3>

                <h4 className="text-xs uppercase tracking-widest text-accent font-semibold leading-relaxed">
                  {pillar.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium">
                  Urban Plus Studio Axiom
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
