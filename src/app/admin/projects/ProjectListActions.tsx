'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit2, Trash2, ExternalLink, Search } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  category: string;
  year: string;
  status: string;
  coverImage: string;
  isFeatured: boolean;
  order: number;
}

interface Props {
  initialProjects: Project[];
}

export default function ProjectListActions({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      categoryFilter === 'ALL' || p.category.toUpperCase() === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (e) {
      console.error('Error toggling status', e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error('Error deleting project', e);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full px-4 py-2.5 pl-10 bg-studio-900 border border-white/10 focus:border-accent focus:outline-none text-xs text-white placeholder-studio-500"
          />
          <Search className="w-4 h-4 text-studio-500 absolute left-3 top-3" />
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-studio-500">Filter:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-studio-900 border border-white/10 text-white px-3 py-2 text-xs focus:outline-none focus:border-accent"
          >
            <option value="ALL">All Categories</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="INTERIOR">Interior</option>
            <option value="LANDSCAPE">Landscape</option>
            <option value="3D VISUALIZATION">3D Visualization</option>
            <option value="RENOVATION">Renovation</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/10 overflow-x-auto bg-studio-900/40">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-studio-950 text-studio-400 font-mono uppercase tracking-wider text-[10px] border-b border-white/10">
            <tr>
              <th className="p-4">Cover</th>
              <th className="p-4">Project Title</th>
              <th className="p-4">Discipline</th>
              <th className="p-4">Location</th>
              <th className="p-4">Year</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-studio-500 font-light">
                  No projects match your search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 w-16">
                    <div className="relative w-12 h-12 bg-studio-950 border border-white/10 overflow-hidden">
                      <Image
                        src={proj.coverImage}
                        alt={proj.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-white">
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="hover:text-accent transition-colors"
                    >
                      {proj.title}
                    </Link>
                    <span className="block text-[10px] text-studio-500 font-mono">
                      /projects/{proj.slug}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-accent uppercase">
                      {proj.category}
                    </span>
                  </td>
                  <td className="p-4 text-studio-300">{proj.location}</td>
                  <td className="p-4 font-mono text-[11px] text-studio-400">{proj.year}</td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(proj.id, proj.status)}
                      className={`px-2.5 py-1 border text-[10px] font-mono uppercase tracking-wider transition-colors ${
                        proj.status === 'PUBLISHED'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/60'
                          : 'bg-amber-950/60 text-amber-400 border-amber-800/40 hover:bg-amber-900/60'
                      }`}
                    >
                      {proj.status}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="inline-block p-1.5 bg-white/5 hover:bg-white/10 text-studio-300 hover:text-white"
                      title="View on Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="inline-block p-1.5 bg-white/5 hover:bg-accent text-studio-300 hover:text-studio-950"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 bg-white/5 hover:bg-red-500 text-studio-300 hover:text-white transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
