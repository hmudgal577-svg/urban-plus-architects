'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Save, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export default function InsightForm({ initialData, isEdit = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    coverImage: initialData?.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Ar. Shailendra Bhadoria',
    category: initialData?.category || 'Architecture',
    tags: initialData?.tags || 'Architecture, Climate Design, Gwalior',
    isPublished: initialData?.isPublished ?? true,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isEdit ? `/api/insights/${initialData.id}` : '/api/insights';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save article');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/insights');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link
          href="/admin/insights"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-studio-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
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
              <span>{isEdit ? 'Update Article' : 'Publish Article'}</span>
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
          <span>Article saved successfully! Redirecting...</span>
        </div>
      )}

      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Article Title *
          </label>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Designing for Climate: Passive Solar in Central India"
            className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="Architecture">Architecture</option>
              <option value="Interiors">Interiors</option>
              <option value="Planning">Planning</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Materials">Materials</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Publish Status
            </label>
            <select
              name="isPublished"
              value={formData.isPublished ? 'true' : 'false'}
              onChange={(e) =>
                setFormData({ ...formData, isPublished: e.target.value === 'true' })
              }
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Cover Image URL
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
            {formData.coverImage && (
              <div className="relative w-12 h-10 border border-white/20 overflow-hidden flex-shrink-0 bg-black">
                <Image src={formData.coverImage} alt="Cover" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Summary *
          </label>
          <textarea
            rows={2}
            required
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief preview sentence..."
            className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Article Content (Markdown / Text) *
          </label>
          <textarea
            rows={12}
            required
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write full article body..."
            className="w-full px-4 py-3 bg-studio-950 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Passive Architecture, Climate Design, Gwalior"
            className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
          />
        </div>
      </div>
    </form>
  );
}
