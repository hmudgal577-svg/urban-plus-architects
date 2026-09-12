'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, Shield } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillDemoCredentials = () => {
    setEmail('admin@urbanplus.com');
    setPassword('UrbanPlus@2026!');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 border border-white/10 bg-studio-900/80 backdrop-blur-xl space-y-6 shadow-2xl"
    >
      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800/50 text-red-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-studio-300 block">
            Administrator Email
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@urbanplus.com"
              className="w-full px-4 py-3 pl-10 bg-studio-950 border border-white/15 focus:border-accent focus:outline-none text-sm text-white placeholder-studio-600 transition-colors"
            />
            <Mail className="w-4 h-4 text-studio-500 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-studio-300 block">
            Security Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 pl-10 bg-studio-950 border border-white/15 focus:border-accent focus:outline-none text-sm text-white placeholder-studio-600 transition-colors"
            />
            <Lock className="w-4 h-4 text-studio-500 absolute left-3 top-3.5" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 py-3.5 bg-accent hover:bg-accent-hover disabled:opacity-50 text-studio-950 text-xs font-semibold uppercase tracking-ultra transition-all shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Quick Demo Credentials Helper */}
      <div className="pt-4 border-t border-white/10 text-center space-y-2">
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="text-[11px] font-mono text-accent hover:underline uppercase tracking-wider block mx-auto"
        >
          Fill Default Seed Credentials
        </button>
        <p className="text-[10px] text-studio-500 font-mono">
          Default: admin@urbanplus.com / UrbanPlus@2026!
        </p>
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-studio-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-ultra text-accent">
            <Shield className="w-3.5 h-3.5" />
            <span>Studio Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light tracking-tight text-white">
            Urban Plus Architects
          </h1>
          <p className="text-xs font-mono text-studio-400 uppercase tracking-widest">
            CMS Portal &bull; Gwalior
          </p>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-studio-400">Loading portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
