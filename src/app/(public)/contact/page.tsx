import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Mail, Phone, Clock, ArrowUpRight, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import EnquiryForm from '@/components/contact/EnquiryForm';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact Studio & Project Enquiries',
  description:
    'Initiate a consultation with Urban Plus Architects & Associates. Located in Aditya Puram, Deen Dayal Nagar, Gwalior, MP. Email: urban.plusgwl@gmail.com.',
};

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  const whatsappClean = (settings?.whatsappNumber || '919826200000').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    settings?.whatsappMessage ||
      'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.'
  )}`;

  return (
    <div className="pt-28 pb-16 bg-[#fbfbf9] text-neutral-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
            Studio Inquiries & Commissioning
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-light tracking-tight text-neutral-950 leading-tight">
            Let’s Build Something <br />
            <span className="italic font-normal text-accent">Meaningful.</span>
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Whether you are commissioning a private modern villa, commercial headquarters, interior transformation, or master planning, our studio is dedicated to translating your vision into enduring architectural reality.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
                Office & Studio
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-950">
                {settings?.studioName || 'Urban Plus Architects & Associates'}
              </h2>
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                Principal: Ar. Shailendra Bhadoria &bull; Established 2012
              </p>
            </div>

            <div className="space-y-6 text-sm text-neutral-600 font-light">
              {/* Address */}
              <div className="flex items-start space-x-4 p-5 bg-white border border-neutral-200 shadow-sm hover:border-accent hover:shadow-md transition-all">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-medium">
                    Studio Address
                  </h3>
                  <address className="not-italic text-neutral-600 leading-relaxed text-xs sm:text-sm">
                    {settings?.address ||
                      'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar, Gwalior, Madhya Pradesh – 474005'}
                  </address>
                  <div className="pt-2">
                    <a
                      href={settings?.googleMapsUrl || 'https://maps.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-accent hover:underline font-mono"
                    >
                      <span>Get Directions</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-5 bg-white border border-neutral-200 shadow-sm hover:border-accent hover:shadow-md transition-all">
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-medium">
                    Electronic Mail
                  </h3>
                  <a
                    href={`mailto:${settings?.email || 'urban.plusgwl@gmail.com'}`}
                    className="text-neutral-700 hover:text-accent transition-colors block text-xs sm:text-sm"
                  >
                    {settings?.email || 'urban.plusgwl@gmail.com'}
                  </a>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Direct architectural portfolio inquiries & tenders
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="flex items-start space-x-4 p-5 bg-emerald-50/70 border border-emerald-300 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all">
                <MessageCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-900 font-medium">
                    Instant WhatsApp Discussion
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Connect directly with our design desk for quick project inquiries and consultation scheduling.
                  </p>
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-emerald-700 font-semibold hover:underline font-mono"
                    >
                      <span>Initiate WhatsApp Conversation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4 p-5 bg-white border border-neutral-200 shadow-sm hover:border-accent hover:shadow-md transition-all">
                <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-medium">
                    Studio Timings
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700">
                    Monday — Saturday: 10:00 AM – 7:00 PM
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Prior appointment recommended for principal architect consultations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Lead Capture Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
                Project Inquiry
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral-950">
                Submit Your Project Brief
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light">
                Provide preliminary details regarding your site, vision, or renovation requirements.
              </p>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <section className="border-t border-neutral-200 bg-[#f4f3ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
                Geographic Presence
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-light text-neutral-950">
                Studio Location — Deen Dayal Nagar, Gwalior
              </h3>
            </div>
            <a
              href={settings?.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-mono uppercase tracking-widest bg-white hover:bg-accent text-neutral-900 hover:text-white border border-neutral-300 hover:border-accent transition-colors self-start shadow-sm"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[400px] sm:h-[480px] border border-neutral-200 overflow-hidden bg-neutral-100 shadow-inner">
            <iframe
              title="Urban Plus Architects Gwalior Office Map"
              src={
                settings?.googleMapsEmbedUrl ||
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14316.326260814983!2d78.205282!3d26.237248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6bbd8bca61f%3A0x6b07da29b2ffbf00!2sDeen%20Dayal%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
