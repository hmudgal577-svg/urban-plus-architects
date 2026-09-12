import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import FinalCTA from '@/components/home/FinalCTA';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Our Architectural Design Process | 8-Step Framework',
  description:
    'Discover Urban Plus Architects’ systematic 8-stage architectural workflow from initial consultation to turnkey construction supervision.',
};

export default async function ProcessPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  const deepPhases = [
    {
      num: '01',
      title: 'Consultation & Vision Calibration',
      subtitle: 'Listening, lifestyle mapping and program definition',
      content:
        'Every visionary building begins with empathetic listening. During this inaugural phase, we engage in structured dialogues with you to uncover not just your aesthetic desires, but your daily routines, long-term spatial aspirations, family dynamics, and budgetary priorities.',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '02',
      title: 'Site Analysis & Climatic Assessment',
      subtitle: 'Topography, solar angles, wind vectors, and local bylaws',
      content:
        'We conduct intensive site studies across Gwalior or your project location. We analyze solar azimuth and elevation across all four seasons, evaluate seasonal wind flows for cross-ventilation, examine soil geotechnical reports, and navigate municipal setback and FAR guidelines.',
      image:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '03',
      title: 'Concept Development & Volumetric Massing',
      subtitle: 'Translating requirements into architectural form',
      content:
        'Our design team sketches, models, and tests multiple massing typologies. We explore how courtyards, overhangs, double-height volumes, and light-wells can elevate the spatial experience, presenting conceptual layouts and mood boards for your critique.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '04',
      title: 'Planning & Layout Engineering',
      subtitle: 'Scientific spatial ergonomics and circulation logic',
      content:
        'Here, concepts are refined into precision 2D floor plans. We eliminate awkward dead zones, configure seamless movement between public entertaining zones and intimate private suites, optimize daylight penetration, and harmonize layouts with traditional Vastu principles.',
      image:
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '05',
      title: 'Photorealistic 3D Visualization',
      subtitle: 'Seeing the built reality before a brick is laid',
      content:
        'Using advanced 3D ray-tracing rendering engines, we construct a hyper-realistic digital twin of your future building. You examine genuine material textures, travertine stone veining, sun shadow movements at 10 AM versus 4 PM, and bespoke interior illumination.',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '06',
      title: 'Design Development & Technical Blueprints',
      subtitle: 'Structural engineering, MEP coordination, and BOQ',
      content:
        'With architectural geometry finalized, we engineer complete working drawings: RCC framing, reinforcement schedules, electrical and lighting plans, plumbing risers, HVAC ducting, and detailed Bill of Quantities (BOQ) for accurate contractor tender.',
      image:
        'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '07',
      title: 'Construction Supervision & Quality Stewardship',
      subtitle: 'Millimeter-precise on-site stewardship',
      content:
        'Drawing accuracy is only half the battle. Our architects conduct scheduled site inspections to audit formwork, inspect concrete pours, verify joinery tolerances, coordinate with specialized fabricators, and resolve unforeseen on-site challenges swiftly.',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '08',
      title: 'Final Handover & Spatial Commissioning',
      subtitle: 'Delivering an enduring, transcendent sanctuary',
      content:
        'We oversee final snag-list rectifications, calibrate architectural lighting, approve joinery finishes, and turn over all maintenance and as-built documentation—delivering an enduring work of architectural art that enriches your life for generations.',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <div className="pt-28 pb-16 bg-[#fbfbf9] text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Methodology & Workflow
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
            The Architectural <br />
            <span className="italic font-normal text-accent">Journey.</span>
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            A disciplined, transparent, and proven 8-stage roadmap ensuring complete harmony between creative vision, budget reality, and structural precision.
          </p>
        </div>
      </div>

      {/* Deep Dive Breakdown */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 space-y-20">
        {deepPhases.map((phase, idx) => {
          const isReversed = idx % 2 !== 0;

          return (
            <div
              key={phase.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center p-8 sm:p-12 border border-neutral-200 bg-white shadow-sm"
            >
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-sand-100 group">
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-mono text-accent font-medium">
                    {phase.num}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Phase Execution
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-900 tracking-tight">
                  {phase.title}
                </h2>

                <p className="text-xs uppercase font-mono tracking-wider text-accent font-semibold">
                  {phase.subtitle}
                </p>

                <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                  {phase.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <FinalCTA
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />
    </div>
  );
}
