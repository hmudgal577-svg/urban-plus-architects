'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, Clock, FileText, MapPin, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

const typologies = [
  { id: 'villa', name: 'Luxury Villa / Bungalow', icon: '🏛️', baseWeeks: 4 },
  { id: 'corporate', name: 'Corporate Office / Headquarters', icon: '🏢', baseWeeks: 6 },
  { id: 'interior', name: 'Bespoke Interior Architecture', icon: '🛋️', baseWeeks: 3 },
  { id: 'farmhouse', name: 'Heritage Farmhouse / Estate', icon: '🌳', baseWeeks: 5 },
  { id: 'commercial', name: 'Commercial Plaza / Retail Hub', icon: '🏬', baseWeeks: 6 },
  { id: 'renovation', name: 'Comprehensive Renovation', icon: '🔨', baseWeeks: 4 },
];

const scopes = [
  {
    id: 'turnkey',
    name: 'Full Architectural & Design Commission',
    desc: 'Concept + Working Drawings + Structural + MEP + 3D CGI + Site Supervision',
    drawingsFactor: 1.0,
  },
  {
    id: 'architecture-only',
    name: 'Architectural & Elevation Design',
    desc: 'Floor Planning + Facade Architecture + Working CAD Drawings + Structural Scheme',
    drawingsFactor: 0.7,
  },
  {
    id: 'interior-only',
    name: 'Interior Architecture & Millwork',
    desc: 'Spatial Planning + Lighting Layouts + Material Schedules + Custom Millwork Detailing',
    drawingsFactor: 0.6,
  },
  {
    id: 'renovation',
    name: 'Spatial Transformation & Facade Overhaul',
    desc: 'Structural Assessment + Modern Facade Treatment + Interior Reconfiguration',
    drawingsFactor: 0.5,
  },
];

const locations = ['Gwalior', 'Indore', 'Bhind', 'Dabra', 'Jhansi', 'Shivpuri', 'Other Central India'];

export default function ProjectEstimator() {
  const [typology, setTypology] = useState<string>('villa');
  const [area, setArea] = useState<number>(5000);
  const [scope, setScope] = useState<string>('turnkey');
  const [location, setLocation] = useState<string>('Gwalior');

  // Dynamic calculations based on scale
  const selectedTypo = typologies.find((t) => t.id === typology) || typologies[0];
  const selectedScope = scopes.find((s) => s.id === scope) || scopes[0];

  const estimatedDrawings = Math.round((25 + area / 250) * selectedScope.drawingsFactor);
  const estimatedWeeks = Math.max(3, Math.round(selectedTypo.baseWeeks + area / 5000));
  const estimated3DRenders = Math.max(4, Math.round(area / 1200) * 2);

  const formattedArea = area.toLocaleString('en-IN');

  const whatsappMessage = `Hello Ar. Shailendra Bhadoria, I configured a project estimate on the Urban Plus Architects website:

• Project Typology: ${selectedTypo.name}
• Built-Up Area: ${formattedArea} sq. ft.
• Scope of Work: ${selectedScope.name}
• Project Location: ${location}
• Estimated Deliverables: ~${estimatedDrawings} Working Drawings, ${estimated3DRenders} 3D Visuals

I would like to schedule an architectural consultation to discuss this project.`;

  const whatsappUrl = getWhatsAppUrl('919826200000', whatsappMessage);

  return (
    <section id="project-estimator" className="py-24 sm:py-32 bg-[#fbfbf9] text-neutral-900 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-ultra text-accent font-medium">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Planner</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-light tracking-tight text-neutral-950 leading-tight">
            Scope & Architectural <br />
            <span className="italic font-normal text-accent">Timeline Estimator.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Select your typology, approximate area, and scope of engagement to calculate design phases, technical drawing requirements, and transmit your preliminary brief directly to Ar. Shailendra Bhadoria.
          </p>
        </div>

        {/* Two-Column Interactive Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Step 1: Typology */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-800 font-semibold block">
                01 / Project Typology
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {typologies.map((t) => {
                  const active = typology === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypology(t.id)}
                      className={`p-3.5 text-left border transition-all flex items-center space-x-3 ${
                        active
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                          : 'bg-[#fcfbfa] hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                      }`}
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span className="text-xs font-medium">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Built-Up Area Range Slider */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-800 font-semibold block">
                  02 / Approximate Built-Up Area
                </label>
                <div className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-xs font-mono font-semibold text-neutral-900">
                  {formattedArea} SQ. FT.
                </div>
              </div>

              <input
                type="range"
                min={1500}
                max={25000}
                step={500}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-none accent-accent cursor-pointer"
              />

              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="text-neutral-400 self-center mr-1">Quick Select:</span>
                {[2500, 5000, 8000, 12000, 18000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setArea(preset)}
                    className={`px-2.5 py-1 border text-[11px] transition-colors ${
                      area === preset
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {preset.toLocaleString('en-IN')} sq.ft
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Scope of Engagement */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-800 font-semibold block">
                03 / Scope of Commission
              </label>
              <div className="space-y-2">
                {scopes.map((s) => {
                  const active = scope === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setScope(s.id)}
                      className={`w-full p-3.5 text-left border transition-all block ${
                        active
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                          : 'bg-[#fcfbfa] hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-medium">{s.name}</div>
                      <div className={`text-[11px] font-light mt-0.5 ${active ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {s.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Location */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-800 font-semibold block">
                04 / Site Location
              </label>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => {
                  const active = location === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                        active
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Deliverables & Live Brief Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-white text-neutral-900 border border-neutral-300 shadow-lg space-y-8">
              <div className="space-y-1 pb-4 border-b border-neutral-200">
                <span className="text-[10px] font-mono tracking-ultra uppercase text-accent block font-semibold">
                  Preliminary Architectural Charter
                </span>
                <h3 className="text-2xl font-heading font-light text-neutral-950">
                  {selectedTypo.name}
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  {formattedArea} SQ. FT. &bull; {location}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#f7f6f2] border border-neutral-200 space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-600 text-xs font-mono">
                    <FileText className="w-3.5 h-3.5 text-accent" />
                    <span>Working Drawings</span>
                  </div>
                  <div className="text-2xl font-heading font-medium text-neutral-950">
                    ~{estimatedDrawings}+
                  </div>
                  <div className="text-[10px] text-neutral-500">Architectural & MEP sheets</div>
                </div>

                <div className="p-4 bg-[#f7f6f2] border border-neutral-200 space-y-1">
                  <div className="flex items-center space-x-1.5 text-neutral-600 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>Design Phase</span>
                  </div>
                  <div className="text-2xl font-heading font-medium text-neutral-950">
                    {estimatedWeeks} Weeks
                  </div>
                  <div className="text-[10px] text-neutral-500">Concept to working drawings</div>
                </div>
              </div>

              {/* Included Architectural Package */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block">
                  Key Deliverables Included:
                </span>
                <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Site solar orientation & passive cross-ventilation analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Detailed structural framing & Gwalior Municipal sanction coordination</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{estimated3DRenders}+ Photorealistic 3D exterior & interior CGI views</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Comprehensive bill of quantities (BOQ) & material specifications</span>
                  </li>
                </ul>
              </div>

              {/* Direct WhatsApp Action with Pre-Filled Brief */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-3 py-4 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-ultra transition-all shadow-xl group"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Estimate on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="text-[10px] font-mono text-neutral-500 text-center uppercase tracking-wider mt-3 font-medium">
                  Transmits this exact brief directly to Ar. Shailendra Bhadoria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
