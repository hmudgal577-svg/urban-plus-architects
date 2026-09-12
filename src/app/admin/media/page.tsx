'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Search, Trash2, Copy, Check, Eye, X, Loader2 } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  fileSize: number;
  altText: string | null;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch(`/api/media?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.media) setMediaList(data.media);
    } catch (e) {
      console.error('Failed to load media', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [search]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.media) {
        setMediaList((prev) => [...data.media, ...prev]);
      }
    } catch (e) {
      console.error('Upload failed', e);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this media file?')) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    } catch (e) {
      console.error('Delete error', e);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-ultra text-accent block">
            Digital Asset Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-studio-400 font-light mt-1">
            Store, preview, and organize high-resolution architectural photography, floor plans, and CGI renders.
          </p>
        </div>

        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 text-studio-950 text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Upload Images</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-white/15 hover:border-accent/60 bg-studio-900/30 p-8 sm:p-12 text-center cursor-pointer transition-colors space-y-3 group"
      >
        <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-accent/10 border border-white/10 group-hover:border-accent/40 flex items-center justify-center mx-auto text-studio-400 group-hover:text-accent transition-colors">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">
            Drag & drop images here, or <span className="text-accent underline">browse</span>
          </p>
          <p className="text-xs text-studio-500 font-mono mt-1">
            Supported formats: WebP, AVIF, JPEG, PNG, SVG up to 20MB
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name or alt..."
            className="w-full px-4 py-2.5 pl-10 bg-studio-900 border border-white/10 focus:border-accent focus:outline-none text-xs text-white placeholder-studio-500"
          />
          <Search className="w-4 h-4 text-studio-500 absolute left-3 top-3" />
        </div>
        <div className="text-xs font-mono text-studio-400">
          {mediaList.length} total assets
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-accent" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="py-16 text-center border border-white/10 bg-studio-900/20 p-8">
          <p className="text-sm text-studio-400 font-light">
            No media assets found. Upload images to populate your library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="group relative border border-white/10 bg-studio-900 overflow-hidden flex flex-col justify-between"
            >
              <div
                className="relative aspect-square w-full cursor-pointer overflow-hidden bg-black/40"
                onClick={() => setSelectedItem(item)}
              >
                <Image
                  src={item.url}
                  alt={item.altText || item.filename}
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <span className="p-2 bg-studio-950/80 rounded-full text-white hover:text-accent">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-studio-950/80 border-t border-white/5 space-y-1">
                <p className="text-[11px] text-white truncate font-medium" title={item.filename}>
                  {item.filename}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-studio-500">
                  <span>{formatFileSize(item.fileSize)}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item.url, item.id)}
                      className="hover:text-accent p-0.5"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="hover:text-red-400 p-0.5"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Preview Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-3xl w-full bg-studio-900 border border-white/15 p-6 space-y-6 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-accent truncate max-w-md">
                {selectedItem.filename}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-studio-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full max-h-[50vh] bg-black/60 overflow-hidden border border-white/10">
              <Image
                src={selectedItem.url}
                alt={selectedItem.altText || selectedItem.filename}
                fill
                sizes="800px"
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-studio-500 uppercase text-[10px] block">Size</span>
                <span className="text-white">{formatFileSize(selectedItem.fileSize)}</span>
              </div>
              <div>
                <span className="text-studio-500 uppercase text-[10px] block">MIME Type</span>
                <span className="text-white">{selectedItem.mimeType}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-studio-500 uppercase text-[10px] block">URL Endpoint</span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <input
                    type="text"
                    readOnly
                    value={selectedItem.url}
                    className="w-full px-2 py-1 bg-studio-950 border border-white/10 text-[11px] text-studio-300 font-mono select-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(selectedItem.url, selectedItem.id)}
                    className="px-2.5 py-1 bg-accent text-studio-950 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
