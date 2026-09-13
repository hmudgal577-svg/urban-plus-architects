import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface FinalCTAProps {
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export default function FinalCTA({
  whatsappNumber = '919826200000',
  whatsappMessage = 'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.',
}: FinalCTAProps) {
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, whatsappMessage);

  return (
    <section className="relative py-28 sm:py-36 bg-[#f4f3ee] text-neutral-900 border-b border-neutral-200 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8">
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-semibold">
          07 / Next Steps
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light tracking-tighter text-neutral-950 leading-tight">
          Have a space <span className="italic font-normal text-accent">in mind?</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
          Let’s turn your idea into a thoughtful, functional and visually distinctive space. Connect with our principal architect directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
          {/* Direct WhatsApp Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-ultra transition-all duration-300 group shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Discuss on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 text-xs font-semibold uppercase tracking-ultra transition-all duration-300 shadow-xs"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-8 text-xs font-mono tracking-widest text-neutral-500 uppercase">
          Aditya Puram, Gwalior &bull; urban.plusgwl@gmail.com
        </div>
      </div>
    </section>
  );
}
