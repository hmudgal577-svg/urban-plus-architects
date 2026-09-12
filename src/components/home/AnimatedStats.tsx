'use client';

import React from 'react';

export default function AnimatedStats() {
  const stats = [
    {
      value: '2012',
      label: 'Studio Established',
      detail: 'Over a decade of architectural innovation in Gwalior',
    },
    {
      value: 'Resi + Comm',
      label: 'Project Expertise',
      detail: 'Villas, corporate offices, master plans & interiors',
    },
    {
      value: '6+',
      label: 'Cities Served',
      detail: 'Gwalior, Bhind, Dabra, Indore, Jhansi & Shivpuri',
    },
    {
      value: '360°',
      label: 'Design Approach',
      detail: 'Concept, 3D visualization, engineering to execution',
    },
  ];

  return (
    <section className="py-20 bg-[#f7f6f2] border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-300">
          {stats.map((item, idx) => (
            <div
              key={item.label}
              className={`pt-6 sm:pt-0 ${
                idx > 0 ? 'sm:pl-8' : ''
              } flex flex-col justify-between space-y-3`}
            >
              <div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900 block">
                  {item.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-accent mt-2 block font-semibold">
                  {item.label}
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
