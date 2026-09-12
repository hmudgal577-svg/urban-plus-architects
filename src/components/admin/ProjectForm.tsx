'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Save, ArrowLeft, Plus, Trash2, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    location: initialData?.location || 'Gwalior, Madhya Pradesh',
    category: initialData?.category || 'Residential',
    year: initialData?.year || new Date().getFullYear().toString(),
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    designConcept: initialData?.designConcept || '',
    challenges: initialData?.challenges || '',
    solution: initialData?.solution || '',
    status: initialData?.status || 'PUBLISHED',
    isFeatured: initialData?.isFeatured ?? true,
    coverImage: initialData?.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    client: initialData?.client || '',
    projectSize: initialData?.projectSize || '',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    altText: initialData?.altText || '',
    order: initialData?.order ?? 0,
  });

  // Gallery Array
  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    if (!initialData?.gallery) return [];
    try {
      return typeof initialData.gallery === 'string' ? JSON.parse(initialData.gallery) : initialData.gallery;
    } catch {
      return [];
    }
  });
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Specifications Array
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(() => {
    if (!initialData?.specifications) return [];
    try {
      return typeof initialData.specifications === 'string'
        ? JSON.parse(initialData.specifications)
        : initialData.specifications;
    } catch {
      return [];
    }
  });
  const [newSpecLabel, setNewSpecLabel] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages((prev) => [...prev, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSpec = () => {
    if (newSpecLabel.trim() && newSpecValue.trim()) {
      setSpecs((prev) => [...prev, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
      setNewSpecLabel('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      ...formData,
      gallery: galleryImages,
      specifications: specs,
    };

    try {
      const endpoint = isEdit ? `/api/projects/${initialData.id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-studio-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-studio-950 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Save Changes' : 'Publish Project'}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800/50 text-red-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/50 border border-emerald-800/50 text-emerald-200 text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Project saved successfully! Redirecting...</span>
        </div>
      )}

      {/* Primary Attributes */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Core Project Identification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Project Title *
            </label>
            <input
              type="text"
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Glass Courtyard Villa"
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="auto-generated-from-title"
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Discipline / Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Interior">Interior</option>
              <option value="Landscape">Landscape</option>
              <option value="3D Visualization">3D Visualization</option>
              <option value="Renovation">Renovation</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Location *
            </label>
            <input
              type="text"
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Aditya Puram, Gwalior"
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Completion Year
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="2024"
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Project Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="PUBLISHED">PUBLISHED (Visible to Public)</option>
              <option value="DRAFT">DRAFT (Internal only)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Client Profile
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="e.g. Private Residence / Corporate HQ"
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Project Scale / Size
            </label>
            <input
              type="text"
              name="projectSize"
              value={formData.projectSize}
              onChange={handleChange}
              placeholder="e.g. 7,500 sq. ft."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Cover Image & Media */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Cover Image & Visual Assets
        </h2>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Cover Image URL *
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              required
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="Paste image URL or /uploads/..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
            {formData.coverImage && (
              <div className="relative w-12 h-10 border border-white/20 overflow-hidden flex-shrink-0 bg-black">
                <Image src={formData.coverImage} alt="Cover preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Gallery Image Manager */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Additional Gallery Frames ({galleryImages.length})
          </label>

          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              placeholder="Paste image URL to append to gallery..."
              className="w-full px-4 py-2 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={handleAddGalleryImage}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors flex-shrink-0"
            >
              Add Frame
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {galleryImages.map((url, i) => (
              <div key={i} className="relative group aspect-video border border-white/10 bg-black">
                <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(i)}
                  className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative & Architectural Concept */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Architectural Narrative & Concept
        </h2>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Short Description (Card Subtitle) *
          </label>
          <textarea
            rows={2}
            required
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Brief 1-2 sentence overview for cards..."
            className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Full Architectural Narrative
          </label>
          <textarea
            rows={5}
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Comprehensive description of the space, materials, and living experience..."
            className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Design Concept
          </label>
          <textarea
            rows={3}
            name="designConcept"
            value={formData.designConcept}
            onChange={handleChange}
            placeholder="Spatial layout, thermal massing, courtyard logic..."
            className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Architectural Challenges
            </label>
            <textarea
              rows={3}
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              placeholder="Site constraints, summer heat mitigation..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Crafted Solution
            </label>
            <textarea
              rows={3}
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Cantilevers, jaali screens, passive cooling..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Specifications Key-Value Manager */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Technical Specifications Table
        </h2>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newSpecLabel}
            onChange={(e) => setNewSpecLabel(e.target.value)}
            placeholder="Label (e.g. Structural System)"
            className="w-1/3 px-4 py-2 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            value={newSpecValue}
            onChange={(e) => setNewSpecValue(e.target.value)}
            placeholder="Value (e.g. RCC Monolithic Frame)"
            className="w-2/3 px-4 py-2 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={handleAddSpec}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors flex-shrink-0"
          >
            Add Spec
          </button>
        </div>

        <div className="space-y-2 pt-2">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-studio-950 border border-white/5 text-xs font-mono"
            >
              <span className="text-studio-400 w-1/3">{spec.label}</span>
              <span className="text-white w-2/3">{spec.value}</span>
              <button
                type="button"
                onClick={() => handleRemoveSpec(idx)}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO & Meta */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Search Engine Optimization (SEO)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Custom SEO Title
            </label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              placeholder="e.g. Modern Villa Architecture in Gwalior | Urban Plus"
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Image Alt Description
            </label>
            <input
              type="text"
              name="altText"
              value={formData.altText}
              onChange={handleChange}
              placeholder="Descriptive alt text for Google Image search..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
