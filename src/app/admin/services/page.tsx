import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminServicesManager from './AdminServicesManager';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
          Studio Offerings
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
          Services CMS
        </h1>
        <p className="text-xs sm:text-sm text-studio-400 font-light mt-1">
          Manage architectural capabilities, scopes, deliverables, and service landing page content.
        </p>
      </div>

      <AdminServicesManager initialServices={services} />
    </div>
  );
}
