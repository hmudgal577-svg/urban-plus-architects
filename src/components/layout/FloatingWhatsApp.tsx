'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  number?: string;
  message?: string;
}

export default function FloatingWhatsApp({
  number = '919826200000',
  message = 'Hello Urban Plus Architects, I would like to discuss a new architecture/design project.',
}: FloatingWhatsAppProps) {
  // If no number configured or explicitly blank, do not render
  if (!number || number.trim() === '') return null;

  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  return (
    <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Urban Plus Architects on WhatsApp"
        className="flex items-center space-x-3 p-3.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/30"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-medium tracking-wider uppercase pr-1">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
