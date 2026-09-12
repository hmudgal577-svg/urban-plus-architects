import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';

interface Props {
  params: { id: string };
}

export default async function EditProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
          Portfolio CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
          Edit Project: {project.title}
        </h1>
      </div>

      <ProjectForm initialData={project} isEdit />
    </div>
  );
}
