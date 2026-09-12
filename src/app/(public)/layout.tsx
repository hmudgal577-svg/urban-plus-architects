import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { prisma } from '@/lib/prisma';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';

export const revalidate = 0;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });
  } catch (error) {
    console.error('Error loading site settings:', error);
  }

  const organizationSchema = generateOrganizationSchema(settings);
  const localBusinessSchema = generateLocalBusinessSchema(settings);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbf9] text-[#1e2025]">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Header
        settings={{
          studioName: settings?.studioName,
          phone: settings?.phone,
          whatsappNumber: settings?.whatsappNumber,
          whatsappMessage: settings?.whatsappMessage,
        }}
      />

      <main className="flex-grow pt-0">{children}</main>

      <FloatingWhatsApp
        number={settings?.whatsappNumber}
        message={settings?.whatsappMessage}
      />

      <Footer
        settings={{
          studioName: settings?.studioName,
          address: settings?.address,
          email: settings?.email,
          phone: settings?.phone,
          whatsappNumber: settings?.whatsappNumber,
          whatsappMessage: settings?.whatsappMessage,
          footerText: settings?.footerText,
        }}
      />
    </div>
  );
}
