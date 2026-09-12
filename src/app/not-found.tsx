import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-800 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10 p-8 sm:p-12 border border-neutral-200 bg-white shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#f4f3ee] border border-neutral-200 text-[10px] font-mono uppercase tracking-ultra text-accent font-medium">
          Error 404 &bull; Unbuilt Coordinate
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-heading font-light text-neutral-950 tracking-tight leading-snug">
            This space hasn’t been <br />
            <span className="italic font-normal text-accent">designed yet.</span>
          </h1>
          <p className="text-sm text-neutral-600 font-light leading-relaxed">
            The architectural blueprint or page you are attempting to locate does not exist or has been relocated to another wing of the studio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 text-xs font-medium uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Projects</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          Urban Plus Architects & Associates &bull; Gwalior
        </div>
      </div>
    </div>
  );
}
