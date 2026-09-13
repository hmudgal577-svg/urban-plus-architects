'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import CommandPalette from '@/components/layout/CommandPalette';

interface HeaderProps {
  settings?: {
    studioName?: string;
    phone?: string;
    whatsappNumber?: string;
    whatsappMessage?: string;
  };
}

export default function Header({ settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Process', href: '/process' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ];

  const whatsappLink = getWhatsAppUrl(settings?.whatsappNumber, settings?.whatsappMessage);

  // Header appearance is always light architectural luxury
  const headerBgClass = scrolled
    ? 'py-3.5 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-neutral-200/90 text-neutral-900 shadow-sm'
    : 'py-5 bg-[#fbfbf9]/90 backdrop-blur-md border-b border-neutral-200/60 text-neutral-900';

  const logoTitleClass = 'text-neutral-950 group-hover:text-accent';
  const logoSubClass = 'text-neutral-500';

  const linkTextClass = (isActive: boolean) => {
    if (isActive) return 'text-accent font-semibold';
    return 'text-neutral-700 hover:text-neutral-950 font-medium';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Studio Brand Logo */}
          <Link href="/" className="group flex flex-col focus:outline-none">
            <span className={`font-heading text-lg sm:text-xl font-medium tracking-ultra uppercase transition-colors duration-300 ${logoTitleClass}`}>
              URBAN PLUS
            </span>
            <span className={`text-[9px] tracking-widest uppercase font-light -mt-1 transition-colors duration-300 ${logoSubClass}`}>
              Architects & Associates
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${linkTextClass(isActive)}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="px-3 py-2 transition-colors duration-200 focus:outline-none flex items-center space-x-2 text-xs font-mono uppercase text-neutral-700 hover:text-neutral-950 bg-white hover:bg-neutral-100 border border-neutral-300/80 shadow-2xs"
              aria-label="Search studio or quick jump"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-accent" />
              <span className="hidden xl:inline text-[10px] text-neutral-400">Ctrl K</span>
            </button>

            {/* Discuss Your Project -> Direct WhatsApp Link */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-widest bg-accent hover:bg-accent-hover text-white shadow-sm hover:shadow transition-all duration-300 group"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 focus:outline-none text-neutral-900 hover:text-accent transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#fbfbf9]/98 backdrop-blur-2xl text-neutral-900 flex flex-col justify-between px-8 py-24 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="space-y-6 pt-6">
          <p className="text-[10px] tracking-widest uppercase text-accent font-semibold">
            Navigation Menu
          </p>
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-heading tracking-tight flex items-center justify-between py-2 border-b border-neutral-200 ${
                    isActive ? 'text-accent font-medium pl-2' : 'text-neutral-800 hover:text-accent'
                  }`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-neutral-200">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-4 bg-accent text-white text-xs font-semibold uppercase tracking-widest shadow-md"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="text-center text-xs text-neutral-500 font-light">
            Gwalior, Madhya Pradesh — Since 2012
          </div>
        </div>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
