'use client'

import { useState } from 'react'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel'

const TIERS = [
  { id: 'free',    label: 'Free',    price: '₹0/mo',     desc: '1 platform · 50 orders/mo' },
  { id: 'starter', label: 'Starter', price: '₹999/mo',   desc: '2 platforms · Auto labels' },
  { id: 'growth',  label: 'Growth',  price: '₹2,999/mo', desc: 'All platforms · Full features', popular: true },
]

export default function SignupPage() {
  const [step, setStep] = useState(1) // 2 steps: account info → choose plan
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    tier: 'growth',
    agreed: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }))

  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.businessName.trim()) e.businessName = 'Business name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email address'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agreed) {
      setErrors({ agreed: 'Please accept the terms to continue' })
      return
    }
    setErrors({})
    setLoading(true)
    // TODO: POST to /api/v1/auth/signup
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    window.location.href = '/onboarding'
  }

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <span>⚠</span> {errors[field]}
      </p>
    ) : null

  return (
    <div className="min-h-screen flex w-full font-outfit">
      <AuthBrandPanel />

      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-navy font-black text-xl">ZAIPIO</span>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? 'bg-navy text-white'
                      : 'bg-navy/10 text-navy/40'
                  }`}
                >
                  {step > s ? '✓' : s}
                </div>
                {s < 2 && (
                  <div className={`h-0.5 w-12 rounded-full transition-all ${step > s ? 'bg-navy' : 'bg-navy/15'}`} />
                )}
              </div>
            ))}
            <span className="text-navy/40 text-xs ml-2 font-medium">
              {step === 1 ? 'Account details' : 'Choose your plan'}
            </span>
          </div>

          {/* ─── STEP 1 — Account Info ─── */}
          {step === 1 && (
            <>
              <div className="mb-7">
                <h1 className="text-3xl font-black text-navy mb-2">Create your account</h1>
                <p className="text-navy/55 text-sm">Start free — no credit card required</p>
              </div>

              <form onSubmit={handleNext} className="space-y-4">
                {/* Name + Business */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="signup-name">
                      Your name
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="Rohan Mehta"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:ring-2 focus:ring-accent/20 transition-all bg-white ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-navy/20 focus:border-accent'}`}
                    />
                    <FieldError field="name" />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="signup-business">
                      Business name
                    </label>
                    <input
                      id="signup-business"
                      type="text"
                      placeholder="Mehta Traders"
                      value={form.businessName}
                      onChange={(e) => update('businessName', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:ring-2 focus:ring-accent/20 transition-all bg-white ${errors.businessName ? 'border-red-400 focus:border-red-400' : 'border-navy/20 focus:border-accent'}`}
                    />
                    <FieldError field="businessName" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="signup-email">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@business.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:ring-2 focus:ring-accent/20 transition-all bg-white ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-navy/20 focus:border-accent'}`}
                  />
                  <FieldError field="email" />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="signup-phone">
                    WhatsApp number <span className="text-navy/35 font-normal">(for alerts)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="border border-navy/20 rounded-xl px-3 py-3 text-navy/60 text-sm bg-navy/[0.03] whitespace-nowrap">
                      🇮🇳 +91
                    </div>
                    <input
                      id="signup-phone"
                      type="tel"
                      placeholder="98765 43210"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="flex-1 border border-navy/20 rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="signup-password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 pr-12 text-navy text-sm placeholder-navy/35 outline-none focus:ring-2 focus:ring-accent/20 transition-all bg-white ${errors.password ? 'border-red-400 focus:border-red-400' : 'border-navy/20 focus:border-accent'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/35 hover:text-navy text-xs font-semibold"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <FieldError field="password" />
                  {/* Strength indicator */}
                  {form.password && (
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            form.password.length >= i * 3
                              ? i <= 1 ? 'bg-red-400'
                                : i <= 2 ? 'bg-amber-400'
                                : i <= 3 ? 'bg-accent'
                                : 'bg-green-500'
                              : 'bg-navy/10'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="signup-confirm">
                    Confirm password
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:ring-2 focus:ring-accent/20 transition-all bg-white ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : form.confirmPassword && form.password === form.confirmPassword ? 'border-green-400' : 'border-navy/20 focus:border-accent'}`}
                  />
                  {form.confirmPassword && form.password === form.confirmPassword && (
                    <p className="text-green-600 text-xs mt-1">✓ Passwords match</p>
                  )}
                  <FieldError field="confirmPassword" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm hover:shadow-navy-md mt-2"
                >
                  Continue →
                </button>
              </form>
            </>
          )}

          {/* ─── STEP 2 — Choose Plan ─── */}
          {step === 2 && (
            <>
              <div className="mb-7">
                <h1 className="text-3xl font-black text-navy mb-2">Choose your plan</h1>
                <p className="text-navy/55 text-sm">
                  You can upgrade anytime · Cancel whenever
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tier selector */}
                <div className="space-y-3">
                  {TIERS.map((t) => (
                    <label
                      key={t.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.tier === t.id
                          ? 'border-navy bg-navy/[0.03]'
                          : 'border-navy/15 hover:border-navy/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${form.tier === t.id ? 'border-navy bg-navy' : 'border-navy/30'}`}>
                          {form.tier === t.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-navy font-bold text-sm">{t.label}</span>
                            {t.popular && (
                              <span className="text-[10px] font-black bg-accent text-white px-2 py-0.5 rounded-full">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-navy/50 text-xs mt-0.5">{t.desc}</p>
                        </div>
                      </div>
                      <span className="text-navy font-black text-sm">{t.price}</span>
                      <input
                        type="radio"
                        name="tier"
                        value={t.id}
                        checked={form.tier === t.id}
                        onChange={(e) => update('tier', e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>

                {/* Note for free tier */}
                {form.tier === 'free' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-xs leading-relaxed">
                    💡 Free plan includes manual labels only (no auto-download). Upgrade to Starter for the daily 12:00 PM label automation.
                  </div>
                )}

                {/* Terms */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={form.agreed}
                      onChange={(e) => update('agreed', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-navy/25 accent-navy cursor-pointer"
                    />
                    <span className="text-navy/60 text-xs leading-relaxed">
                      I agree to ZAIPIO's{' '}
                      <a href="/terms" className="text-accent hover:underline font-semibold">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-accent hover:underline font-semibold">Privacy Policy</a>.
                      I understand my platform credentials will be encrypted and stored securely.
                    </span>
                  </label>
                  <FieldError field="agreed" />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-none border-2 border-navy/15 text-navy font-semibold text-sm px-5 py-3.5 rounded-xl hover:bg-navy/5 transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm hover:shadow-navy-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      'Create Account & Continue'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Sign in link */}
          <p className="text-center text-navy/50 text-sm mt-8">
            Already have an account?{' '}
            <a href="/login" className="text-navy font-bold hover:text-accent transition-colors">
              Sign in →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
