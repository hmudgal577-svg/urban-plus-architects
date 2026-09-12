import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Engagement',
  description: 'Terms of engagement and architectural services for Urban Plus Architects & Associates.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#fbfbf9] text-neutral-800">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 space-y-8">
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
          Professional Standard
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-light text-neutral-950">
          Terms of Engagement
        </h1>
        <div className="space-y-6 text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          <p>
            Welcome to the official portfolio and website of Urban Plus Architects & Associates, Gwalior.
          </p>
          <h2 className="text-lg font-heading text-neutral-900 font-medium pt-4">1. Architectural Copyright & Intellectual Property</h2>
          <p>
            All architectural drawings, floor plans, 3D photorealistic renderings, photographic documentation, and design concepts presented on this website are the intellectual property of Urban Plus Architects & Associates and Ar. Shailendra Bhadoria. Reproduction, imitation, or unauthorized digital distribution without written consent is strictly prohibited.
          </p>
          <h2 className="text-lg font-heading text-neutral-900 font-medium pt-4">2. Professional Consultations</h2>
          <p>
            Inquiries submitted through this website constitute preliminary interest and do not establish a formal architectural retainer until a bilateral agreement and project charter are signed.
          </p>
          <h2 className="text-lg font-heading text-neutral-900 font-medium pt-4">3. Governing Jurisdiction</h2>
          <p>
            All engagements and legal notices are subject to the jurisdiction of the courts of Gwalior, Madhya Pradesh, India.
          </p>
        </div>
      </div>
    </div>
  );
}
