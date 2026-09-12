import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Urban Plus Architects & Associates, Gwalior.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 bg-[#fbfbf9] text-neutral-800">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 space-y-8">
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block font-medium">
          Legal & Privacy
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-light text-neutral-950">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          <p>
            Urban Plus Architects & Associates (“we”, “our”, or “studio”) respects your privacy and is committed to protecting any personal information you share with us through our website and digital communications.
          </p>
          <h2 className="text-lg font-heading text-neutral-900 font-medium pt-4">1. Information We Collect</h2>
          <p>
            When you submit a project enquiry or contact us, we collect details such as your name, telephone number, email address, proposed project location, budget parameters, and project description. This information is used strictly to evaluate your architectural requirements and respond to your inquiry.
          </p>
          <h2 className="text-lg font-heading text-neutral-900 font-medium pt-4">2. Non-Disclosure & Confidentiality</h2>
          <p>
            Architectural blueprints, site locations, client identities, and private residence programs entrusted to Urban Plus Architects are held in strict professional confidentiality. We never sell, lease, or distribute client contact details to third-party marketing entities.
          </p>
          <h2 className="text-lg font-heading text-neutral-900 font-medium pt-4">3. Contact Information</h2>
          <p>
            For any queries regarding this policy, please reach out to us at <a href="mailto:urban.plusgwl@gmail.com" className="text-accent underline">urban.plusgwl@gmail.com</a> or visit our studio at A-81, Aditya Puram, Deen Dayal Nagar, Gwalior, MP – 474005.
          </p>
        </div>
      </div>
    </div>
  );
}
