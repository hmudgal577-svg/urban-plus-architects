'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, ShieldCheck, Thermometer, MapPin, Sparkles } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  regionalName: string;
  category: string;
  origin: string;
  thermalBenefit: string;
  image: string;
  description: string;
  architecturalUse: string;
  durability: string;
}

const materials: Material[] = [
  {
    id: 'gwalior-stone',
    name: 'Gwalior Mint Sandstone',
    regionalName: 'ग्वालियर मिंट सैंडस्टोन',
    category: 'Natural Regional Stone',
    origin: 'Quarried locally in Gwalior District, Madhya Pradesh',
    thermalBenefit: 'High thermal mass delays solar heat penetration by 6–8 hours in extreme summer.',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
    description: 'Fine-grained quartz sandstone with a natural creamy-buff hue and soft fossil imprints. Honed or bush-hammered for contemporary cladding and courtyard paving.',
    architecturalUse: 'Exterior Ventilated Facades, Sunscreen Jali, Courtyard Paving, Plinth Cladding',
    durability: '100+ Years • Weather-resistant',
  },
  {
    id: 'concrete',
    name: 'Board-Formed Concrete',
    regionalName: 'बोर्ड-फॉर्म्ड आर्किटेक्चरल कंक्रीट',
    category: 'Monolithic Structure',
    origin: 'In-situ engineered cast concrete with custom timber shuttering',
    thermalBenefit: 'Structural mass stabilizes internal temperatures during diurnal shifts.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1000&q=80',
    description: 'Exposed concrete bearing the fine tactile grain of natural pine boards, celebrating raw structural honesty without artificial surface plaster.',
    architecturalUse: 'Cantilevered Porticos, Feature Shear Walls, Retaining Boundaries, Sculptural Columns',
    durability: 'Permanent Structural Integrity',
  },
  {
    id: 'solar-glass',
    name: 'Low-E Thermal Glazing',
    regionalName: 'सोलर इंसुलेटेड डबल-ग्लेजिंग',
    category: 'Advanced Building Envelope',
    origin: 'Engineered Double-Glazed Units (DGU) with Argon filling',
    thermalBenefit: 'Blocks 74% of infrared solar radiation while transmitting 68% natural daylight.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Floor-to-ceiling glass expanses treated with microscopic metallic oxide coatings that dissolve the barrier between indoor sanctuaries and private gardens.',
    architecturalUse: 'Double-Height Living Panoramas, Courtyard Enclosures, Skylight Monitors',
    durability: 'U-Value: 1.4 W/m²K • Acoustic STC 38dB',
  },
  {
    id: 'teak-louvers',
    name: 'Thermally Seasoned Teak',
    regionalName: 'सीजन्ड सागौन लकड़ी के लूवर्स',
    category: 'Organic Timber Architecture',
    origin: 'Sustainably harvested Central Indian Teakwood',
    thermalBenefit: 'Movable aerodynamic louvers create dynamic solar shading and induced ventilation.',
    image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80',
    description: 'Deep warm timber fins treated with natural penetrating oils that silver gracefully over decades, filtering intense sunlight into poetic interior shadows.',
    architecturalUse: 'Operable Facade Louvers, Pergola Ribs, Main Portals, Concealed Paneling',
    durability: 'Kiln-Dried • Termite Protected',
  },
  {
    id: 'microcement',
    name: 'Seamless Micro-Cement',
    regionalName: 'सीमलेस माइक्रो-सीमेंट फ्लोर्स',
    category: 'Interior Continuity',
    origin: 'Polymer-modified mineral paste over monolithic screed',
    thermalBenefit: 'Cool underfoot in summer and compatible with radiant underfloor systems.',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
    description: 'Joint-free mineral flooring running unbroken through living pavilions, verandas, and wet zones, creating fluid spatial transitions with zero grout lines.',
    architecturalUse: 'Continuous Pavilion Floors, Integrated Bath Vanities, Interior Plinths',
    durability: 'Scratch Resistant • Hydrophobic',
  },
];

export default function MaterialityShowcase() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);

  return (
    <section className="py-24 sm:py-32 bg-[#f7f6f2] text-neutral-900 border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-ultra text-accent font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Tactile Architecture & Materiality</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-light tracking-tight text-neutral-950 leading-tight">
            Crafted for the Climate <br />
            <span className="italic font-normal text-accent">of Central India.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Every architectural gesture at Urban Plus is anchored in material honesty. We unite historic regional Gwalior sandstone with advanced low-E glazing and monolithic concrete to build spaces that endure intense summers and age with dignity.
          </p>
        </div>

        {/* Material Selector & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Material Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {materials.map((mat) => {
              const isSelected = selectedMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left p-5 transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-accent shadow-md translate-x-1.5'
                      : 'bg-white/60 hover:bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-medium block">
                      {mat.category}
                    </span>
                    <h3 className="text-base font-heading font-medium text-neutral-900">
                      {mat.name}
                    </h3>
                    <span className="text-xs text-neutral-500 font-light">
                      {mat.regionalName}
                    </span>
                  </div>

                  <div className="relative w-12 h-12 rounded-none overflow-hidden border border-neutral-200 flex-shrink-0 ml-4">
                    <Image
                      src={mat.image}
                      alt={mat.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Material Deep-Dive */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-lg p-6 sm:p-10 space-y-8 animate-fade-in">
            {/* Visual Frame */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-accent-light block">
                    {selectedMaterial.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-light">
                    {selectedMaterial.name}
                  </h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-neutral-950/80 backdrop-blur-md border border-white/20">
                  {selectedMaterial.durability}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              {selectedMaterial.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-xs">
              <div className="p-4 bg-[#fbfbf9] border border-neutral-200 space-y-1">
                <div className="flex items-center space-x-2 text-accent font-medium font-mono uppercase tracking-wider text-[11px]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Provenance & Source</span>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  {selectedMaterial.origin}
                </p>
              </div>

              <div className="p-4 bg-[#fbfbf9] border border-neutral-200 space-y-1">
                <div className="flex items-center space-x-2 text-accent font-medium font-mono uppercase tracking-wider text-[11px]">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Central India Climate Benefit</span>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  {selectedMaterial.thermalBenefit}
                </p>
              </div>
            </div>

            {/* Application Scope */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                Signature Applications in Urban Plus Projects:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedMaterial.architecturalUse.split(',').map((use) => (
                  <span
                    key={use}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-mono"
                  >
                    {use.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
