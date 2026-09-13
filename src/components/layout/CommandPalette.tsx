'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, MessageCircle, MapPin, Calculator, Compass, Sparkles, Building2 } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Projects' | 'Disciplines' | 'Studio Navigation' | 'Quick Actions';
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const whatsappUrl = getWhatsAppUrl(
    '919826200000',
    'Hello Urban Plus Architects, I would like to schedule a consultation with Ar. Shailendra Bhadoria.'
  );

  const items: CommandItem[] = [
    // Quick Actions
    {
      id: 'discuss-wa',
      title: 'Discuss Your Project on WhatsApp',
      subtitle: 'Instant direct chat with Ar. Shailendra Bhadoria',
      category: 'Quick Actions',
      icon: <MessageCircle className="w-4 h-4 text-emerald-600" />,
      action: () => {
        window.open(whatsappUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'calc-estimate',
      title: 'Open Project Scope & Timeline Estimator',
      subtitle: 'Calculate working drawings, design phases & built-up area parameters',
      category: 'Quick Actions',
      icon: <Calculator className="w-4 h-4 text-accent" />,
      action: () => {
        router.push('/#project-estimator');
        onClose();
      },
    },
    {
      id: 'studio-directions',
      title: 'Studio Location & Directions',
      subtitle: 'A-81, Aditya Puram, Deen Dayal Nagar, Gwalior – 474005',
      category: 'Quick Actions',
      icon: <MapPin className="w-4 h-4 text-accent" />,
      action: () => {
        router.push('/contact');
        onClose();
      },
    },
    // Projects
    {
      id: 'p-villa',
      title: 'The Glass Courtyard Villa',
      subtitle: 'Luxury Residential Architecture • Aditya Puram, Gwalior',
      category: 'Projects',
      href: '/projects/the-glass-courtyard-villa',
      icon: <Building2 className="w-4 h-4 text-neutral-500" />,
    },
    {
      id: 'p-corp',
      title: 'Zenith Corporate Headquarters',
      subtitle: 'Commercial Building Design • City Centre, Gwalior',
      category: 'Projects',
      href: '/projects/zenith-corporate-headquarters',
      icon: <Building2 className="w-4 h-4 text-neutral-500" />,
    },
    {
      id: 'p-penthouse',
      title: 'Oasis Minimalist Penthouse',
      subtitle: 'Bespoke Interior Architecture • Indore, MP',
      category: 'Projects',
      href: '/projects/oasis-minimalist-penthouse',
      icon: <Building2 className="w-4 h-4 text-neutral-500" />,
    },
    {
      id: 'p-pavilion',
      title: 'Heritage Horizon Pavilion & Grounds',
      subtitle: 'Landscape Architecture & Planning • Jhansi Region',
      category: 'Projects',
      href: '/projects/heritage-horizon-pavilion-and-grounds',
      icon: <Building2 className="w-4 h-4 text-neutral-500" />,
    },
    // Disciplines
    {
      id: 'd-arch',
      title: 'Architectural Design & Planning',
      subtitle: 'Concept design, zoning analysis & master planning',
      category: 'Disciplines',
      href: '/services/architectural-design',
      icon: <Compass className="w-4 h-4 text-accent" />,
    },
    {
      id: 'd-res',
      title: 'Residential Architecture',
      subtitle: 'Custom modern villas, duplexes & private residences',
      category: 'Disciplines',
      href: '/services/residential-building-design',
      icon: <Compass className="w-4 h-4 text-accent" />,
    },
    {
      id: 'd-interior',
      title: 'Interior Architecture & Design',
      subtitle: 'Spatial luxury, custom millwork & lighting detailing',
      category: 'Disciplines',
      href: '/services/interior-design',
      icon: <Compass className="w-4 h-4 text-accent" />,
    },
    {
      id: 'd-landscape',
      title: 'Landscape Architecture',
      subtitle: 'Native microclimate planting & architectural hardscapes',
      category: 'Disciplines',
      href: '/services/landscape-design',
      icon: <Compass className="w-4 h-4 text-accent" />,
    },
    {
      id: 'd-3d',
      title: '3D Architectural Visualization & CGI',
      subtitle: 'Photorealistic daylight & twilight render studies',
      category: 'Disciplines',
      href: '/services/3d-visualization',
      icon: <Compass className="w-4 h-4 text-accent" />,
    },
    // Navigation
    {
      id: 'nav-about',
      title: 'About Studio & Ar. Shailendra Bhadoria',
      subtitle: 'Founded in 2012 • Central India Architectural Practice',
      category: 'Studio Navigation',
      href: '/about',
      icon: <Sparkles className="w-4 h-4 text-neutral-400" />,
    },
    {
      id: 'nav-process',
      title: 'The 8-Phase Architectural Process',
      subtitle: 'From consultation to handover',
      category: 'Studio Navigation',
      href: '/process',
      icon: <Sparkles className="w-4 h-4 text-neutral-400" />,
    },
    {
      id: 'nav-insights',
      title: 'Architectural Insights & Journal',
      subtitle: 'Essays on climate design & passive solar dynamics',
      category: 'Studio Navigation',
      href: '/insights',
      icon: <Sparkles className="w-4 h-4 text-neutral-400" />,
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (item: CommandItem) => {
      if (item.action) {
        item.action();
      } else if (item.href) {
        router.push(item.href);
        onClose();
      }
    },
    [router, onClose]
  );

  // Keyboard navigation inside palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, handleSelect]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-neutral-950/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-neutral-300 shadow-2xl overflow-hidden animate-scale-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center px-5 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, disciplines, estimator, or Ar. Shailendra..."
            className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 ml-2 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-neutral-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500 font-mono">
              No architectural matches found for &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-[#f4f3ee] text-neutral-950' : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2 bg-white border border-neutral-200 flex-shrink-0 shadow-2xs">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate flex items-center space-x-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-neutral-200/60 text-neutral-600">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate font-light">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 text-accent transition-transform ml-2 flex-shrink-0 ${
                      isSelected ? 'translate-x-1' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="px-4 py-2.5 bg-[#fbfbf9] border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Navigate with &uarr; &darr; &bull; Select with Enter</span>
          <span className="hidden sm:inline">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
