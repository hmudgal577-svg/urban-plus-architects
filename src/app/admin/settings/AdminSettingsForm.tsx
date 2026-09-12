'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface SettingsData {
  id: string;
  studioName: string;
  principalArchitect: string;
  establishedYear: string;
  tagline: string;
  subheading: string;
  heroImage: string;
  address: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  serviceAreas: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  footerText: string;
}

interface Props {
  initialSettings: SettingsData | null;
}

export default function AdminSettingsForm({ initialSettings }: Props) {
  const [formData, setFormData] = useState<SettingsData>(
    initialSettings || {
      id: 'default',
      studioName: 'Urban Plus Architects & Associates',
      principalArchitect: 'Ar. Shailendra Bhadoria',
      establishedYear: '2012',
      tagline: 'Designing Spaces. Shaping Experiences.',
      subheading:
        'Architecture, interiors and visualization crafted with precision, creativity and a distinctly modern vision.',
      heroImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      address:
        'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar, Gwalior, Madhya Pradesh – 474005',
      email: 'urban.plusgwl@gmail.com',
      phone: '+91 751 245 0000',
      whatsappNumber: '919826200000',
      whatsappMessage:
        'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.',
      serviceAreas: 'Gwalior, Bhind, Dabra, Indore, Jhansi, Shivpuri',
      googleMapsUrl:
        'https://maps.google.com/?q=Aditya+Puram+Deen+Dayal+Nagar+Gwalior',
      googleMapsEmbedUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      linkedinUrl: '',
      youtubeUrl: '',
      footerText:
        'Urban Plus Architects & Associates is a Gwalior-based architecture and building-design studio established in 2012, working across residential and commercial architecture, interiors, planning and visualization.',
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-studio-400">
            Live Website Synchronized
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-studio-950 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
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
          <span>Site settings updated! The public frontend reflects these changes instantly.</span>
        </div>
      )}

      {/* Studio Identity */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Studio Identity & Leadership
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Studio Name
            </label>
            <input
              type="text"
              required
              name="studioName"
              value={formData.studioName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Principal Architect
            </label>
            <input
              type="text"
              required
              name="principalArchitect"
              value={formData.principalArchitect}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Established Year
            </label>
            <input
              type="text"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Service Areas
            </label>
            <input
              type="text"
              name="serviceAreas"
              value={formData.serviceAreas}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Hero Presentation */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Homepage Hero Presentation
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Hero Headline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Hero Supporting Subheading
            </label>
            <textarea
              rows={2}
              name="subheading"
              value={formData.subheading}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Cinematic Hero Image URL
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                name="heroImage"
                value={formData.heroImage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
              />
              {formData.heroImage && (
                <div className="relative w-12 h-10 border border-white/20 overflow-hidden flex-shrink-0 bg-black">
                  <Image src={formData.heroImage} alt="Hero preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Studio Location & Communication */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Contact & Location Details
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Verified Studio Address *
            </label>
            <input
              type="text"
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
                Electronic Mail *
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
                Contact Telephone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
                Floating WhatsApp Number (Digits with country code)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="919826200000"
                className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
                Google Maps Link
              </label>
              <input
                type="text"
                name="googleMapsUrl"
                value={formData.googleMapsUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Google Maps Embed Iframe URL
            </label>
            <input
              type="text"
              name="googleMapsEmbedUrl"
              value={formData.googleMapsEmbedUrl}
              onChange={handleChange}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Default WhatsApp Pre-filled Message
            </label>
            <input
              type="text"
              name="whatsappMessage"
              value={formData.whatsappMessage}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Footer Description Text
            </label>
            <textarea
              rows={2}
              name="footerText"
              value={formData.footerText}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="p-6 sm:p-8 border border-white/10 bg-studio-900/40 space-y-6">
        <h2 className="text-sm font-heading font-medium uppercase tracking-wider text-accent">
          Social Media Profiles (Shown only when configured)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Instagram URL
            </label>
            <input
              type="text"
              name="instagramUrl"
              value={formData.instagramUrl || ''}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedinUrl"
              value={formData.linkedinUrl || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              Facebook URL
            </label>
            <input
              type="text"
              name="facebookUrl"
              value={formData.facebookUrl || ''}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-studio-300 uppercase tracking-wider block">
              YouTube URL
            </label>
            <input
              type="text"
              name="youtubeUrl"
              value={formData.youtubeUrl || ''}
              onChange={handleChange}
              placeholder="https://youtube.com/@..."
              className="w-full px-4 py-2.5 bg-studio-950 border border-white/10 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
