'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Loader2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  tagline: string | null;
  shortDescription: string;
  fullDescription: string;
  coverImage: string | null;
  icon: string | null;
  order: number;
  isPublished: boolean;
}

interface Props {
  initialServices: Service[];
}

export default function AdminServicesManager({ initialServices }: Props) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    icon: 'Building',
    order: 0,
    isPublished: true,
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingService(null);
    setFormState({
      title: '',
      slug: '',
      tagline: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      icon: 'Building',
      order: services.length + 1,
      isPublished: true,
    });
  };

  const handleStartEdit = (service: Service) => {
    setIsCreating(false);
    setEditingService(service);
    setFormState({
      title: service.title,
      slug: service.slug,
      tagline: service.tagline || '',
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      coverImage: service.coverImage || '',
      icon: service.icon || 'Building',
      order: service.order,
      isPublished: service.isPublished,
    });
  };

  const handleTogglePublish = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !service.isPublished }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, isPublished: !s.isPublished } : s))
        );
      }
    } catch (e) {
      console.error('Toggle error', e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this discipline?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error('Delete error', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreating) {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        const data = await res.json();
        if (res.ok && data.service) {
          setServices((prev) => [...prev, data.service]);
          setIsCreating(false);
        }
      } else if (editingService) {
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        const data = await res.json();
        if (res.ok && data.service) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? data.service : s))
          );
          setEditingService(null);
        }
      }
    } catch (e) {
      console.error('Save service error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-normal text-white">
            Configured Architectural Disciplines ({services.length})
          </h2>
          <p className="text-xs text-studio-400 font-light">
            All services displayed on the public site and individual landing pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent-hover text-studio-950 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Discipline</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="border border-white/10 overflow-x-auto bg-studio-900/40">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-studio-950 text-studio-400 font-mono uppercase tracking-wider text-[10px] border-b border-white/10">
            <tr>
              <th className="p-4 w-12">#</th>
              <th className="p-4">Cover</th>
              <th className="p-4">Discipline Title</th>
              <th className="p-4">Icon</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {services.map((svc, idx) => (
              <tr key={svc.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-studio-500">{idx + 1}</td>
                <td className="p-4 w-16">
                  {svc.coverImage && (
                    <div className="relative w-12 h-10 border border-white/10 overflow-hidden bg-black">
                      <Image src={svc.coverImage} alt={svc.title} fill className="object-cover" />
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className="font-medium text-white block">{svc.title}</span>
                  <span className="text-[10px] text-studio-500 font-mono">
                    /services/{svc.slug}
                  </span>
                </td>
                <td className="p-4 font-mono text-accent text-[11px]">{svc.icon || 'Building'}</td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(svc)}
                    className={`px-2.5 py-0.5 border text-[10px] font-mono uppercase ${
                      svc.isPublished
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-700/50'
                        : 'bg-studio-800 text-studio-500 border-white/10'
                    }`}
                  >
                    {svc.isPublished ? 'Published' : 'Hidden'}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(svc)}
                    className="p-1.5 bg-white/5 hover:bg-accent text-studio-300 hover:text-studio-950 transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(svc.id)}
                    className="p-1.5 bg-white/5 hover:bg-red-500 text-studio-300 hover:text-white transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingService) && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={handleSave}
            className="max-w-xl w-full bg-studio-900 border border-white/15 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-heading font-light text-white">
                {isCreating ? 'Add New Discipline' : `Edit: ${editingService?.title}`}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingService(null);
                }}
                className="p-1.5 text-studio-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-studio-300 uppercase block">Discipline Title *</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Architectural Design"
                  className="w-full p-2.5 bg-studio-950 border border-white/10 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-studio-300 uppercase block">Tagline</label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  placeholder="e.g. Visionary architecture rooted in context"
                  className="w-full p-2.5 bg-studio-950 border border-white/10 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-studio-300 uppercase block">Cover Image URL</label>
                <input
                  type="text"
                  value={formState.coverImage}
                  onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-studio-950 border border-white/10 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-studio-300 uppercase block">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formState.shortDescription}
                  onChange={(e) => setFormState({ ...formState, shortDescription: e.target.value })}
                  placeholder="Brief 1-2 sentence overview for cards..."
                  className="w-full p-2.5 bg-studio-950 border border-white/10 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-studio-300 uppercase block">Detailed Scope & Methodology</label>
                <textarea
                  rows={4}
                  value={formState.fullDescription}
                  onChange={(e) => setFormState({ ...formState, fullDescription: e.target.value })}
                  placeholder="In-depth methodology..."
                  className="w-full p-2.5 bg-studio-950 border border-white/10 text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingService(null);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-mono text-studio-400 uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-accent hover:bg-accent-hover text-studio-950 text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Discipline'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
