'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Editorial Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-12">
        {images.map((img, idx) => {
          // Asymmetrical layout: image 0 is full 12-cols or 8-cols, others alternating
          const isFeatured = idx === 0 || idx === 3;
          const colSpan = isFeatured ? 'md:col-span-8' : 'md:col-span-4';
          const aspect = isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]';

          return (
            <div
              key={idx}
              onClick={() => handleOpen(idx)}
              className={`${colSpan} group relative overflow-hidden border border-white/10 bg-studio-900 cursor-pointer`}
            >
              <div className={`relative ${aspect} w-full`}>
                <Image
                  src={img}
                  alt={`${title} - Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-studio-950/20 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute top-4 right-4 p-2 bg-studio-950/70 backdrop-blur-md rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest uppercase text-white/70 bg-studio-950/60 px-2 py-1 backdrop-blur-sm">
                  View Frame 0{idx + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-studio-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 w-full">
            <div className="text-xs font-mono tracking-wider uppercase text-studio-400">
              <span className="text-accent">{title}</span> &bull; Frame {selectedIndex + 1} of {images.length}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-studio-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image with Prev/Next Controls */}
          <div className="relative flex-grow flex items-center justify-center my-4 w-full h-[70vh]">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 bg-studio-950/70 hover:bg-accent text-white hover:text-studio-950 rounded-full backdrop-blur-md border border-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
              <Image
                src={images[selectedIndex]}
                alt={`${title} fullscreen view ${selectedIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 bg-studio-950/70 hover:bg-accent text-white hover:text-studio-950 rounded-full backdrop-blur-md border border-white/10 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 z-10">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-12 h-12 flex-shrink-0 border transition-all ${
                  selectedIndex === idx ? 'border-accent scale-105' : 'border-white/10 opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
