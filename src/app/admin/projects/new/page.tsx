import React from 'react';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
          Portfolio CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
          Add New Architectural Project
        </h1>
      </div>

      <ProjectForm />
    </div>
  );
}
