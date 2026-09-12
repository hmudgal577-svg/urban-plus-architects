import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import InsightForm from '@/components/admin/InsightForm';

interface Props {
  params: { id: string };
}

export default async function EditInsightPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
          Editorial CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
          Edit Article: {post.title}
        </h1>
      </div>

      <InsightForm initialData={post} isEdit />
    </div>
  );
}
