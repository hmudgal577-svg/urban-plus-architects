'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  category: string;
  isPublished: boolean;
  publishedAt: Date | string;
}

interface Props {
  initialPosts: Post[];
}

export default function InsightsListActions({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleTogglePublish = async (post: Post) => {
    try {
      const res = await fetch(`/api/insights/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, isPublished: !p.isPublished } : p))
        );
      }
    } catch (e) {
      console.error('Toggle error', e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/insights/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error('Delete error', e);
    }
  };

  return (
    <div className="border border-white/10 overflow-x-auto bg-studio-900/40">
      <table className="w-full text-left text-xs font-sans">
        <thead className="bg-studio-950 text-studio-400 font-mono uppercase tracking-wider text-[10px] border-b border-white/10">
          <tr>
            <th className="p-4">Cover</th>
            <th className="p-4">Article Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Author</th>
            <th className="p-4">Published Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {posts.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-studio-500 font-light">
                No articles found. Click &quot;Write New Article&quot; to publish your first post.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 w-16">
                  <div className="relative w-12 h-10 border border-white/10 overflow-hidden bg-black">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium text-white">
                  <Link
                    href={`/admin/insights/${post.id}`}
                    className="hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="block text-[10px] text-studio-500 font-mono">
                    /insights/{post.slug}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-accent uppercase">
                    {post.category}
                  </span>
                </td>
                <td className="p-4 text-studio-300">{post.author}</td>
                <td className="p-4 font-mono text-[11px] text-studio-400">
                  {formatDate(post.publishedAt)}
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(post)}
                    className={`px-2.5 py-0.5 border text-[10px] font-mono uppercase ${
                      post.isPublished
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-700/50'
                        : 'bg-studio-800 text-studio-500 border-white/10'
                    }`}
                  >
                    {post.isPublished ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    href={`/insights/${post.slug}`}
                    target="_blank"
                    className="inline-block p-1.5 bg-white/5 hover:bg-white/10 text-studio-300 hover:text-white"
                    title="View Article"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/admin/insights/${post.id}`}
                    className="inline-block p-1.5 bg-white/5 hover:bg-accent text-studio-300 hover:text-studio-950"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 bg-white/5 hover:bg-red-500 text-studio-300 hover:text-white transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
