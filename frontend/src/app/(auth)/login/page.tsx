'use client'

import { useState } from 'react'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    setLoading(true)
    // TODO: Connect to API /auth/login
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    // Redirect to dashboard on success
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex w-full font-outfit">
      {/* ── Left Brand Panel ── */}
      <AuthBrandPanel />

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-navy font-black text-xl">ZAIPIO</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-navy mb-2">Welcome back</h1>
            <p className="text-navy/55 text-sm">
              Sign in to your seller dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-navy/20 rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-navy font-semibold text-sm" htmlFor="login-password">
                  Password
                </label>
                <a href="/forgot-password" className="text-accent text-xs font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-navy/20 rounded-xl px-4 py-3 pr-12 text-navy text-sm placeholder-navy/35 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/35 hover:text-navy text-xs font-semibold transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-navy/25 accent-navy cursor-pointer"
              />
              <label htmlFor="remember" className="text-navy/60 text-sm cursor-pointer select-none">
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm hover:shadow-navy-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-navy/40 text-xs font-medium">or continue with</span>
            </div>
          </div>

          {/* Google SSO (placeholder) */}
          <button
            type="button"
            className="w-full border border-navy/15 rounded-xl py-3 flex items-center justify-center gap-3 text-navy font-semibold text-sm hover:bg-navy/5 hover:border-navy/25 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="text-center text-navy/50 text-sm mt-8">
            New to ZAIPIO?{' '}
            <a href="/signup" className="text-navy font-bold hover:text-accent transition-colors">
              Create your free account →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
