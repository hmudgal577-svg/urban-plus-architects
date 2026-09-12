'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential',
    location: '',
    approxBudget: '',
    projectSize: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic client validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, contact phone number, and project brief.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        projectType: 'Residential',
        location: '',
        approxBudget: '',
        projectSize: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 border border-emerald-300 bg-white text-center space-y-6 shadow-md animate-fade-in">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-heading font-light text-neutral-950">
            Enquiry Received
          </h3>
          <p className="text-sm text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to Urban Plus Architects & Associates. Ar. Shailendra Bhadoria and our studio team will review your project requirements and connect with you shortly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="inline-block px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-neutral-800 border border-neutral-300 hover:bg-neutral-100 transition-colors font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 sm:p-12 border border-neutral-200 bg-white shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Your Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Vikramaditya Sharma"
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98000 00000"
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <label htmlFor="projectType" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Project Type <span className="text-accent">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 transition-colors"
          >
            <option value="Residential">Residential (Villa / Bungalow / Apartment)</option>
            <option value="Commercial">Commercial (Office / Retail / Mixed-Use)</option>
            <option value="Interior">Interior Architecture</option>
            <option value="Renovation">Renovation & Remodelling</option>
            <option value="Landscape">Landscape Architecture</option>
            <option value="Other">Other Architectural Commission</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Project Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Gwalior / Indore"
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>

        {/* Approximate Budget */}
        <div className="space-y-2">
          <label htmlFor="approxBudget" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Approx. Budget
          </label>
          <input
            type="text"
            id="approxBudget"
            name="approxBudget"
            value={formData.approxBudget}
            onChange={handleChange}
            placeholder="e.g. ₹1 Cr - ₹2 Cr"
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>

        {/* Project Size */}
        <div className="space-y-2">
          <label htmlFor="projectSize" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
            Project Scale / Size
          </label>
          <input
            type="text"
            id="projectSize"
            name="projectSize"
            value={formData.projectSize}
            onChange={handleChange}
            placeholder="e.g. 5,000 sq. ft."
            className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
          Project Brief / Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your site, timeline, architectural vision, or specific requirements..."
          className="w-full px-4 py-3 bg-[#fcfbfa] border border-neutral-300 focus:border-accent focus:bg-white focus:outline-none text-sm text-neutral-900 placeholder-neutral-400 transition-colors resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-3 py-4 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-ultra transition-all shadow-md hover:shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Send Project Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[10px] font-mono text-neutral-500 text-center uppercase tracking-wider">
        Your enquiry is strictly confidential and received directly by Ar. Shailendra Bhadoria.
      </p>
    </form>
  );
}
