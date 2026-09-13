'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  heading?: string;
  subheading?: string;
  heroImage?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export default function Hero({
  heading = 'Designing Spaces. Shaping Experiences.',
  subheading = 'Architecture, interiors and visualization crafted with precision, creativity and a distinctly modern vision.',
  heroImage = '/images/hero-daylight.jpg',
  whatsappNumber = '919826200000',
  whatsappMessage = 'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.',
}: HeroProps) {
  const scrollToNext = () => {
    const introSection = document.getElementById('studio-intro');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppUrl(whatsappNumber, whatsappMessage);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#fbfbf9] text-neutral-900 pt-20">
      {/* Background Architectural Imagery: Crystal-Clear Daylight Villa */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none">
        <Image
          src={heroImage}
          alt="Urban Plus Architects Modern Daylight Villa Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Luminous Center Radial Bloom Mask matching user mockup */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_48%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0.2)_70%,transparent_100%)] pointer-events-none" />
        {/* Soft top gradient under header */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-16 pb-20 flex flex-col items-center">
        {/* Capsule Badge & Studio Origin */}
        <div className="inline-flex items-center space-x-2.5 px-4 sm:px-5 py-1.5 rounded-none bg-white/80 border border-neutral-300/80 backdrop-blur-md shadow-2xs mb-6 sm:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#9e7b4f]" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-700 font-semibold">
            URBAN PLUS ARCHITECTS & ASSOCIATES &bull; GWALIOR &bull; SINCE 2012
          </span>
        </div>

        {/* Headline matching user design: Designing Spaces. Shaping Experiences. */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-normal tracking-tight text-neutral-950 leading-[1.08] max-w-4xl mb-6 animate-fade-in">
          <span className="text-[#1a1d20] font-medium">Designing Spaces.</span>{' '}
          <span className="font-serif italic font-normal text-[#9e7b4f]">
            Shaping Experiences.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-800 font-normal max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 animate-fade-in">
          {subheading}
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md animate-fade-in">
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-[#9e7b4f] hover:bg-[#8a6a42] text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>EXPLORE OUR PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-white/85 hover:bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-400 font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current text-neutral-900" />
            <span>START ON WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* Animated Scroll Cue at bottom */}
      <button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5 text-neutral-700 hover:text-neutral-950 transition-colors focus:outline-none"
        aria-label="Scroll to studio introduction"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase font-semibold text-neutral-700">
          SCROLL
        </span>
        <div className="w-4 h-7 border border-neutral-700/80 rounded-full flex items-start justify-center p-1 bg-white/40 backdrop-blur-2xs shadow-2xs">
          <div className="w-1 h-1.5 bg-neutral-800 rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
