import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminSettingsForm from './AdminSettingsForm';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
          Global Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
          Studio Site Settings
        </h1>
        <p className="text-xs sm:text-sm text-studio-400 font-light mt-1">
          Update studio address, telephone, WhatsApp lead triggers, Google Map coordinates, and hero visuals without code modifications.
        </p>
      </div>

      <AdminSettingsForm initialSettings={settings} />
    </div>
  );
}
