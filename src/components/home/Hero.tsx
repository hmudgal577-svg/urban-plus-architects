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
  heroImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#fbfbf9] text-neutral-900">
      {/* Background Architectural Imagery with Soft Luminous Ambient Veil */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none">
        <Image
          src={heroImage}
          alt="Urban Plus Architects Luxury Architectural Design"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-scale-subtle opacity-70"
        />
        {/* Soft, Light Luminous Architectural Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbf9]/95 via-[#fbfbf9]/80 to-[#fbfbf9]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(251,251,249,0.7)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-32 pb-20 flex flex-col items-center">
        {/* Subtle Badge & Studio Origin */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-none bg-white/95 border border-neutral-300/80 backdrop-blur-md shadow-xs mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span className="text-[11px] font-mono tracking-ultra uppercase text-neutral-700 font-medium">
            Urban Plus Architects & Associates &bull; Gwalior &bull; Since 2012
          </span>
        </div>

        {/* Cinematic Headline in Deep Charcoal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-light tracking-tighter text-neutral-950 leading-[1.08] max-w-4xl mb-6 animate-fade-in">
          Designing Spaces.{' '}
          <span className="font-normal italic text-accent">Shaping Experiences.</span>
        </h1>

        {/* Refined Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in">
          {subheading}
        </p>

        {/* Dual Call-to-Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md animate-fade-in">
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold text-xs uppercase tracking-ultra transition-all duration-300 group shadow-md hover:shadow-lg"
          >
            <span>Explore Our Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-neutral-400 font-semibold text-xs uppercase tracking-ultra transition-all duration-300 shadow-xs hover:shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current text-[#25D366]" />
            <span>Start on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Subtle Animated Scroll Cue */}
      <button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group focus:outline-none"
        aria-label="Scroll to studio introduction"
      >
        <span className="text-[9px] font-mono tracking-ultra uppercase text-neutral-500 group-hover:text-accent font-medium">
          Scroll
        </span>
        <div className="w-5 h-9 border border-neutral-300/90 rounded-full bg-white/70 backdrop-blur-sm flex items-start justify-center p-1 shadow-2xs">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
