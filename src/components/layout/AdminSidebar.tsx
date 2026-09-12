'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  BookOpen,
  Settings,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  user?: {
    name?: string;
    email?: string;
  };
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ user, mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Projects CMS', href: '/admin/projects', icon: Layers },
    { name: 'Services CMS', href: '/admin/services', icon: Sparkles },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Enquiries CRM', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Insights / Blog', href: '/admin/insights', icon: BookOpen },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-studio-950 border-r border-white/10 text-studio-200 w-64 select-none">
      {/* Brand */}
      <div>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="block">
            <span className="font-heading text-sm font-semibold tracking-ultra uppercase text-white block">
              URBAN PLUS
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-accent">
              CMS Portal &bull; Gwalior
            </span>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-studio-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5 text-xs font-mono">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-none transition-colors duration-200 ${
                  isActive
                    ? 'bg-accent text-studio-950 font-semibold'
                    : 'text-studio-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-mono text-studio-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
            <span>View Public Site</span>
          </span>
        </Link>

        <div className="px-3 py-2 bg-white/5 border border-white/5 space-y-1">
          <div className="text-xs text-white font-medium truncate">
            {user?.name || 'Ar. Shailendra Bhadoria'}
          </div>
          <div className="text-[10px] font-mono text-studio-400 truncate">
            {user?.email || 'admin@urbanplus.com'}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 min-h-screen sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
