import React from 'react';
import Link from 'next/link';
import {
  Building,
  Home,
  Briefcase,
  Armchair,
  Trees,
  Shield,
  Layout,
  Eye,
  Calendar,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  tagline?: string | null;
  shortDescription: string;
  coverImage?: string | null;
  icon?: string | null;
}

interface ServicesGridProps {
  services: ServiceItem[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const getIcon = (name?: string | null) => {
    switch (name) {
      case 'Building':
        return <Building className="w-5 h-5" />;
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5" />;
      case 'Trees':
        return <Trees className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#ffffff] border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
              04 / Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-tight text-neutral-900 leading-tight">
              Architectural <span className="italic font-normal text-accent">Services.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              From high-concept master planning and bespoke residential design to millimeter-accurate construction supervision.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-ultra text-neutral-900 hover:text-accent font-semibold transition-colors group"
          >
            <span>Explore All 11 Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group bg-white p-8 border border-neutral-200 shadow-sm hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-sand-100 text-accent rounded-none border border-neutral-200 group-hover:bg-accent group-hover:text-white transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-normal tracking-tight text-neutral-900 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-neutral-500 group-hover:text-neutral-900 transition-colors">
                <span>View Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
