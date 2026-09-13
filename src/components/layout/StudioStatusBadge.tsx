'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Clock } from 'lucide-react';

export default function StudioStatusBadge({ className = '' }: { className?: string }) {
  const [time, setTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      // Format current Indian Standard Time (IST)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const istString = new Intl.DateTimeFormat('en-IN', options).format(now);
      setTime(istString);

      // Studio hours: Mon-Sat 10:00 to 19:00 IST
      const istHour = parseInt(
        new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }).format(now),
        10
      );
      const istDay = now.getDay(); // 0 is Sunday
      setIsOpen(istDay !== 0 && istHour >= 10 && istHour < 19);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 px-3.5 py-1.5 bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-xs text-xs font-mono tracking-wider ${className}`}
    >
      <div className="flex items-center space-x-1.5 text-neutral-800 font-medium">
        <Compass className="w-3.5 h-3.5 text-accent animate-spin-slow" />
        <span>GWL &bull; 26.2372° N, 78.2053° E</span>
      </div>

      <span className="hidden sm:inline text-neutral-300">|</span>

      <div className="flex items-center space-x-1.5 text-neutral-600">
        <Clock className="w-3 h-3 text-neutral-400" />
        <span>{time || '10:00:00 AM'} IST</span>
      </div>

      <span className="hidden sm:inline text-neutral-300">|</span>

      <div className="flex items-center space-x-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
          }`}
        />
        <span className={isOpen ? 'text-emerald-700 font-medium text-[11px]' : 'text-neutral-500 text-[11px]'}>
          {isOpen ? 'Studio Open' : 'Desk On Call'}
        </span>
      </div>
    </div>
  );
}
