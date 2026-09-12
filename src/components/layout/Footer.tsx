import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface FooterProps {
  settings?: {
    studioName?: string;
    address?: string;
    email?: string;
    phone?: string;
    whatsappNumber?: string;
    whatsappMessage?: string;
    footerText?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(settings?.whatsappNumber, settings?.whatsappMessage);

  const exploreLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Studio', href: '/about' },
    { name: 'Selected Projects', href: '/projects' },
    { name: 'Services & Disciplines', href: '/services' },
    { name: 'Design Process', href: '/process' },
    { name: 'Architectural Insights', href: '/insights' },
    { name: 'Contact & Enquiries', href: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Architectural Design', href: '/services/architectural-design' },
    { name: 'Residential Architecture', href: '/services/residential-building-design' },
    { name: 'Commercial Building Design', href: '/services/commercial-building-design' },
    { name: 'Interior Architecture', href: '/services/interior-design' },
    { name: 'Landscape Design', href: '/services/landscape-design' },
    { name: '3D Visualization & CGI', href: '/services/3d-visualization' },
    { name: 'Renovation & Remodelling', href: '/services/renovation-remodelling' },
  ];

  return (
    <footer className="bg-[#f4f3ee] border-t border-[#e2ded5] text-neutral-600 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Studio Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-medium tracking-ultra uppercase text-neutral-950">
                URBAN PLUS
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-neutral-500 font-light mt-0.5">
                Architects & Associates
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-600 font-light pr-4">
              {settings?.footerText ||
                'Urban Plus Architects & Associates is a Gwalior-based architecture and building-design studio established in 2012, working across residential and commercial architecture, interiors, planning and visualization.'}
            </p>
            <div className="pt-2 text-xs font-mono tracking-wider text-accent uppercase font-medium">
              Principal Architect: Ar. Shailendra Bhadoria
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-900">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-600 hover:text-accent transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-900">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-600 hover:text-accent transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-900">
              Studio Location
            </h4>
            <div className="space-y-3 text-sm text-neutral-600 font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <address className="not-italic leading-relaxed text-neutral-700 text-xs">
                  {settings?.address ||
                    'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar, Gwalior, Madhya Pradesh – 474005'}
                </address>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${settings?.email || 'urban.plusgwl@gmail.com'}`}
                  className="text-neutral-700 hover:text-accent transition-colors text-xs"
                >
                  {settings?.email || 'urban.plusgwl@gmail.com'}
                </a>
              </div>

              {settings?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-neutral-700 hover:text-accent transition-colors text-xs"
                  >
                    {settings.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-medium uppercase tracking-wider transition-all duration-200 group shadow-sm self-start"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Discuss on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-neutral-600 hover:text-accent transition-colors pt-1"
              >
                <span>Request a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e2ded5] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light space-y-4 sm:space-y-0">
          <div>
            © {currentYear} Urban Plus Architects & Associates. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-neutral-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-900 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/admin" className="hover:text-accent transition-colors text-neutral-400">
              CMS Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
