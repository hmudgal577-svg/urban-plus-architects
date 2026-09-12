import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminEnquiriesTable from '../AdminEnquiriesTable';
import { Download, MessageSquare, Filter } from 'lucide-react';

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
            Lead Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
            Project Enquiries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-studio-400 font-light mt-1">
            Review and track incoming client requests from Gwalior and surrounding regions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/api/enquiries?format=csv"
            download
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <Download className="w-4 h-4 text-accent" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Enquiries CRM Table */}
      <AdminEnquiriesTable initialEnquiries={enquiries} />
    </div>
  );
}
