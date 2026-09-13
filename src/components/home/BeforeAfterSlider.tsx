'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, MoveHorizontal, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface TransformationCase {
  id: string;
  title: string;
  category: string;
  location: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const cases: TransformationCase[] = [
  {
    id: 'villa',
    title: 'The Glass Courtyard Villa',
    category: 'Residential Architecture',
    location: 'Aditya Puram, Gwalior',
    beforeLabel: 'Phase 02: Structural Framing & CAD Skeleton',
    afterLabel: 'Phase 08: Completed Luxury Residence',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'Transforming an open residential plot into a 6,800 sq.ft. climate-responsive private sanctuary with central rainwater courtyard and low-E cantilevered glass.',
  },
  {
    id: 'corporate',
    title: 'Zenith Corporate Headquarters',
    category: 'Commercial Architecture',
    location: 'City Centre, Gwalior',
    beforeLabel: 'Phase 03: 3D Visualization & Solar Study',
    afterLabel: 'Phase 08: Executed Commercial Building',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    description: 'High-density commercial planning with monolithic concrete columns and passive solar ceramic louvers reducing cooling loads by 28%.',
  },
  {
    id: 'interior',
    title: 'Oasis Minimalist Penthouse',
    category: 'Interior Architecture',
    location: 'Indore, MP',
    beforeLabel: 'Raw Bare-Shell Concrete Space',
    afterLabel: 'Handover: Fluted Stone & Teak Interior',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    description: 'Bespoke custom millwork, concealed ambient coves, and uninterrupted Italian micro-cement flooring tailored for contemporary luxury living.',
  },
];

export default function BeforeAfterSlider() {
  const [activeCase, setActiveCase] = useState<TransformationCase>(cases[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const whatsappUrl = getWhatsAppUrl(
    '919826200000',
    `Hello Urban Plus Architects, I viewed the "${activeCase.title}" transformation on your website and would like to discuss a similar project.`
  );

  return (
    <section className="py-24 sm:py-32 bg-[#fbfbf9] text-neutral-900 border-b border-neutral-200/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-ultra text-accent font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transformation & Precision</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-light tracking-tight text-neutral-950 leading-tight">
              From Blueprint to <br />
              <span className="italic font-normal text-accent">Built Reality.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Drag the interactive slider to inspect our meticulous translation from structural engineering and 3D visualization into enduring, physical architecture.
            </p>
          </div>

          {/* Case Tabs */}
          <div className="flex flex-wrap gap-2">
            {cases.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCase(c);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                  activeCase.id === c.id
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="space-y-6">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[620px] overflow-hidden rounded-none border border-neutral-300 shadow-xl cursor-ew-resize touch-none bg-neutral-900"
          >
            {/* After Image (Full background layer) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={activeCase.afterImage}
                alt={activeCase.afterLabel}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute top-5 right-5 px-3 py-1.5 bg-neutral-950/80 backdrop-blur-md text-white text-[11px] font-mono tracking-widest uppercase border border-white/20">
                {activeCase.afterLabel}
              </div>
            </div>

            {/* Before Image (Clipped layer) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full min-w-full">
                <Image
                  src={activeCase.beforeImage}
                  alt={activeCase.beforeLabel}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-left"
                />
                <div className="absolute top-5 left-5 px-3 py-1.5 bg-neutral-950/80 backdrop-blur-md text-accent text-[11px] font-mono tracking-widest uppercase border border-white/20 whitespace-nowrap">
                  {activeCase.beforeLabel}
                </div>
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-neutral-950 shadow-2xl flex items-center justify-center border-2 border-accent transition-transform hover:scale-110">
                <MoveHorizontal className="w-5 h-5 text-accent" />
              </div>
            </div>

            {/* Bottom Interaction Cue */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neutral-950/80 backdrop-blur-md rounded-full text-white/90 text-[10px] font-mono uppercase tracking-widest pointer-events-none border border-white/10 hidden sm:flex items-center space-x-2">
              <span>Drag to Reveal Transformation</span>
              <span className="text-accent">&bull;</span>
              <span>{Math.round(sliderPosition)}%</span>
            </div>
          </div>

          {/* Transformation Narrative & Action */}
          <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center space-x-3 text-xs font-mono text-accent uppercase tracking-wider">
                <span>{activeCase.category}</span>
                <span>&bull;</span>
                <span className="text-neutral-500">{activeCase.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {activeCase.description}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-medium uppercase tracking-wider shadow-sm transition-all flex-shrink-0 group"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Discuss Your Transformation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
