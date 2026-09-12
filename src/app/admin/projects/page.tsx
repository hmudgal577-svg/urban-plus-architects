import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Plus, Edit2, ExternalLink } from 'lucide-react';
import ProjectListActions from './ProjectListActions';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
            Portfolio Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
            Architectural Projects CMS
          </h1>
          <p className="text-xs sm:text-sm text-studio-400 font-light mt-1">
            Create, edit, draft, and publish works featured on the public website.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-studio-950 text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Projects Table */}
      <ProjectListActions initialProjects={projects} />
    </div>
  );
}
