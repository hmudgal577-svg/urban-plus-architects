import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProcessTimeline() {
  const steps = [
    {
      step: '01',
      title: 'Consultation & Vision',
      desc: 'In-depth listening session to map your lifestyle, operational needs, architectural preferences, and target budget parameters.',
    },
    {
      step: '02',
      title: 'Site Understanding',
      desc: 'Topographical appraisal, solar trajectory calculation, wind orientation, zoning bylaws, and soil conditions in Central India.',
    },
    {
      step: '03',
      title: 'Concept Development',
      desc: 'Preliminary spatial zoning, volumetric massing, and architectural mood boards defining the fundamental aesthetic identity.',
    },
    {
      step: '04',
      title: 'Planning & Layouts',
      desc: 'Scientific floor planning optimizing daylighting, natural cross-ventilation, functional circulation, and Vastu alignment.',
    },
    {
      step: '05',
      title: '3D Visualization',
      desc: 'Photorealistic CGI imagery, materiality calibration, and lighting simulations empowering you to experience the space before construction.',
    },
    {
      step: '06',
      title: 'Design Development',
      desc: 'Comprehensive structural coordination, MEP (mechanical, electrical, plumbing) engineering blueprints, and Bill of Quantities (BOQ).',
    },
    {
      step: '07',
      title: 'Execution & Supervision',
      desc: 'Rigorous on-site stewardship, periodic quality inspections, and joinery tolerance audits to ensure millimeter fidelity to drawings.',
    },
    {
      step: '08',
      title: 'Final Handover',
      desc: 'Punch-list rectification, finishing touch approvals, and turning over an enduring, thoughtfully sculpted environment.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#f7f6f2] border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              05 / Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
              Design <span className="italic font-normal text-accent">Process.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Our 8-phase architectural framework guarantees seamless translation from embryonic concept to completed edifice.
            </p>
          </div>

          <Link
            href="/process"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-ultra text-neutral-900 hover:text-accent font-semibold transition-colors group"
          >
            <span>Read Process Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 8-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-8 border border-neutral-200 bg-white hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <span className="text-2xl sm:text-3xl font-mono text-accent font-medium block group-hover:scale-105 transition-transform origin-left">
                  {item.step}
                </span>
                <h3 className="text-lg font-heading font-medium tracking-tight text-neutral-900 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-[10px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-neutral-600 transition-colors">
                Phase {item.step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
