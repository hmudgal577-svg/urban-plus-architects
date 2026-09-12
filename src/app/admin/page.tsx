import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import {
  Layers,
  Sparkles,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import AdminEnquiriesTable from './AdminEnquiriesTable';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalEnquiries,
    newEnquiries,
    servicesCount,
    blogCount,
    mediaCount,
    recentEnquiries,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'PUBLISHED' } }),
    prisma.project.count({ where: { status: 'DRAFT' } }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.service.count(),
    prisma.blogPost.count(),
    prisma.media.count(),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      subtext: `${publishedProjects} Published / ${draftProjects} Drafts`,
      icon: Layers,
      href: '/admin/projects',
      color: 'text-accent',
    },
    {
      title: 'New Enquiries',
      value: newEnquiries,
      subtext: `${totalEnquiries} Total Leads recorded`,
      icon: MessageSquare,
      href: '/admin/enquiries',
      color: 'text-amber-400',
    },
    {
      title: 'Active Services',
      value: servicesCount,
      subtext: 'Core architectural disciplines',
      icon: Sparkles,
      href: '/admin/services',
      color: 'text-sky-400',
    },
    {
      title: 'Blog Articles',
      value: blogCount,
      subtext: 'Insights & research papers',
      icon: BookOpen,
      href: '/admin/insights',
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
            Studio Overview
          </h1>
          <p className="text-xs sm:text-sm text-studio-400 font-light mt-1">
            Real-time status of architecture portfolio, prospective leads, and website content.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-studio-950 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="p-6 border border-white/10 bg-studio-900/40 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-studio-400">
                  {stat.title}
                </span>
                <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-heading font-light text-white block">
                  {stat.value}
                </span>
                <span className="text-xs text-studio-400 font-light block mt-1">
                  {stat.subtext}
                </span>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-studio-500 group-hover:text-accent transition-colors">
                <span>Manage</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries CRM Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-normal text-white">
              Recent Project Enquiries
            </h2>
            <p className="text-xs text-studio-400 font-light">
              Prospective client briefs submitted via the website contact portal.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-mono uppercase tracking-wider text-accent hover:underline inline-flex items-center space-x-1"
          >
            <span>View All Enquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <AdminEnquiriesTable initialEnquiries={recentEnquiries} />
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 border border-white/10 bg-studio-900/30 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-accent">
            Media Assets
          </h3>
          <p className="text-xs text-studio-400 font-light leading-relaxed">
            {mediaCount} architectural photographs and renders stored in the local media library.
          </p>
          <Link
            href="/admin/media"
            className="text-xs text-white hover:text-accent font-mono inline-block pt-1"
          >
            Open Media Manager &rarr;
          </Link>
        </div>

        <div className="p-6 border border-white/10 bg-studio-900/30 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-accent">
            Discipline Services
          </h3>
          <p className="text-xs text-studio-400 font-light leading-relaxed">
            All 11 architectural disciplines configured and published on the live website.
          </p>
          <Link
            href="/admin/services"
            className="text-xs text-white hover:text-accent font-mono inline-block pt-1"
          >
            Reorder & Edit Services &rarr;
          </Link>
        </div>

        <div className="p-6 border border-white/10 bg-studio-900/30 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-accent">
            Studio Global Settings
          </h3>
          <p className="text-xs text-studio-400 font-light leading-relaxed">
            Manage office address in Aditya Puram, verified phone, WhatsApp trigger, and hero imagery.
          </p>
          <Link
            href="/admin/settings"
            className="text-xs text-white hover:text-accent font-mono inline-block pt-1"
          >
            Configure Site Settings &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
