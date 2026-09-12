import React from 'react';
import InsightForm from '@/components/admin/InsightForm';

export default function NewInsightPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
          Editorial CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
          Write New Architectural Article
        </h1>
      </div>

      <InsightForm />
    </div>
  );
}
