'use client'

import { useState } from 'react'

type Platform = 'shopify' | 'amazon' | 'flipkart' | 'meesho'

const PLATFORMS: { id: Platform; name: string; color: string; bg: string; letter: string; desc: string; time: string; recommended?: boolean }[] = [
  { id: 'shopify',  name: 'Shopify',  color: '#96BF48', bg: '#F3F9EA', letter: 'S', desc: 'OAuth in 2 clicks. No approval needed.', time: '< 2 min', recommended: true },
  { id: 'amazon',   name: 'Amazon',   color: '#FF9900', bg: '#FFF8ED', letter: 'A', desc: 'SP-API via Login with Amazon.', time: '~5 min' },
  { id: 'flipkart', name: 'Flipkart', color: '#2874F0', bg: '#EFF4FF', letter: 'F', desc: 'API key from Marketplace settings.', time: '~5 min' },
  { id: 'meesho',   name: 'Meesho',   color: '#9B1FE8', bg: '#F5EDFF', letter: 'M', desc: 'API key + CSV fallback support.', time: '~5 min' },
]

const STEPS = [
  { id: 1, label: 'Welcome',  icon: '👋' },
  { id: 2, label: 'Platform', icon: '🔌' },
  { id: 3, label: 'Connect',  icon: '🔗' },
  { id: 4, label: 'Alerts',   icon: '🔔' },
  { id: 5, label: 'Done',     icon: '🎉' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('shopify')
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [alerts, setAlerts] = useState({ whatsapp: true, email: true, telegram: false, lowStockThreshold: '10' })

  const handleConnect = async () => {
    setConnecting(true)
    // TODO: Redirect to OAuth URL for selected platform
    await new Promise((r) => setTimeout(r, 2000))
    setConnecting(false)
    setConnected(true)
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen bg-white font-outfit flex flex-col">

      {/* Top bar */}
      <div className="border-b border-navy/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">Z</span>
          </div>
          <span className="text-navy font-black text-lg">ZAIPIO</span>
        </div>

        {/* Step indicators */}
        <div className="hidden sm:flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  step === s.id
                    ? 'bg-navy text-white'
                    : step > s.id
                    ? 'text-green-600'
                    : 'text-navy/30'
                }`}
              >
                <span>{step > s.id ? '✓' : s.icon}</span>
                <span className="hidden md:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-0.5 rounded-full mx-0.5 transition-all ${step > s.id ? 'bg-navy' : 'bg-navy/15'}`} />
              )}
            </div>
          ))}
        </div>

        <a href="/login" className="text-navy/40 text-xs hover:text-navy transition-colors">
          Skip setup →
        </a>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-navy/10">
        <div className="h-full bg-navy transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">

          {/* ── Step 1: Welcome ── */}
          {step === 1 && (
            <div className="text-center">
              <div className="text-6xl mb-6">👋</div>
              <h1 className="text-4xl font-black text-navy mb-3">
                Welcome to ZAIPIO!
              </h1>
              <p className="text-navy/55 text-lg mb-2">
                Let's get your seller dashboard set up in under 5 minutes.
              </p>
              <p className="text-navy/40 text-sm mb-10">
                We'll connect your first platform, set up your label automation, and configure alerts.
              </p>

              {/* What to expect */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { icon: '🔌', title: 'Connect a platform', desc: '2-click OAuth setup' },
                  { icon: '🏷️', title: 'Auto-label ready', desc: 'Labels at 12:00 PM daily' },
                  { icon: '🔔', title: 'Get alerts', desc: 'WhatsApp or email' },
                ].map((item) => (
                  <div key={item.title} className="bg-navy/[0.03] border border-navy/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-navy font-bold text-sm mb-0.5">{item.title}</p>
                    <p className="text-navy/45 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="bg-navy text-white font-bold text-base px-10 py-4 rounded-2xl hover:bg-navy-800 transition-all shadow-navy-md hover:-translate-y-0.5"
              >
                Let's start →
              </button>
            </div>
          )}

          {/* ── Step 2: Choose Platform ── */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-navy mb-2">Which platform do you sell on?</h1>
                <p className="text-navy/55 text-sm">Connect your first one now. You can add more later.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 ${
                      selectedPlatform === p.id
                        ? 'border-navy shadow-navy-md'
                        : 'border-navy/15 hover:border-navy/30'
                    }`}
                    style={{ background: selectedPlatform === p.id ? p.bg : 'white' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-lg"
                        style={{ background: p.color }}
                      >
                        {p.letter}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {p.recommended && (
                          <span className="text-[10px] font-black bg-accent text-white px-2 py-0.5 rounded-full">
                            START HERE
                          </span>
                        )}
                        {selectedPlatform === p.id && (
                          <div className="w-5 h-5 bg-navy rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] font-black">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-navy font-black text-base mb-1">{p.name}</p>
                    <p className="text-navy/55 text-xs mb-2">{p.desc}</p>
                    <span className="text-accent text-xs font-semibold">⏱ Setup: {p.time}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-none border-2 border-navy/15 text-navy font-semibold px-5 py-3.5 rounded-xl hover:bg-navy/5 transition-all text-sm">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm"
                >
                  Connect {PLATFORMS.find(p => p.id === selectedPlatform)?.name} →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Connect ── */}
          {step === 3 && (() => {
            const p = PLATFORMS.find((pl) => pl.id === selectedPlatform)!
            return (
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-6 shadow-navy-md"
                  style={{ background: p.color }}
                >
                  {p.letter}
                </div>
                <h1 className="text-3xl font-black text-navy mb-3">
                  Connect {p.name}
                </h1>

                {!connected ? (
                  <>
                    <p className="text-navy/55 text-sm mb-8 max-w-md mx-auto">
                      Click the button below to open {p.name}'s authorization page. You'll be redirected back here automatically after approving access.
                    </p>

                    {/* What we'll access */}
                    <div className="bg-navy/[0.03] border border-navy/10 rounded-2xl p-5 mb-8 text-left max-w-sm mx-auto">
                      <p className="text-navy font-bold text-sm mb-3">ZAIPIO will be able to:</p>
                      <ul className="space-y-2">
                        {['Read your orders', 'Read inventory levels', 'Update stock quantities', 'Read payment/settlement data'].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-navy/65 text-sm">
                            <span className="w-4 h-4 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-navy/40 text-xs mt-3 pt-3 border-t border-navy/10">
                        🔒 Credentials are encrypted at rest (AES-256). We never store plain-text tokens.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button onClick={() => setStep(2)} className="border-2 border-navy/15 text-navy font-semibold px-5 py-3.5 rounded-xl hover:bg-navy/5 transition-all text-sm">
                        ← Change platform
                      </button>
                      <button
                        onClick={handleConnect}
                        disabled={connecting}
                        className="bg-navy text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm disabled:opacity-60 flex items-center gap-2 justify-center"
                        style={{ background: connecting ? undefined : p.color }}
                      >
                        {connecting ? (
                          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Connecting…</>
                        ) : (
                          <>Authorize {p.name} →</>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-navy font-bold text-lg mb-2">{p.name} connected successfully!</p>
                    <p className="text-navy/50 text-sm mb-8">Your first sync will start shortly. Labels will be ready by 12:00 PM tomorrow.</p>
                    <button
                      onClick={() => setStep(4)}
                      className="bg-navy text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm"
                    >
                      Set up alerts →
                    </button>
                  </>
                )}
              </div>
            )
          })()}

          {/* ── Step 4: Alerts ── */}
          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🔔</div>
                <h1 className="text-3xl font-black text-navy mb-2">Set up your alerts</h1>
                <p className="text-navy/55 text-sm">Get notified about labels, low stock, and daily summaries.</p>
              </div>

              <div className="space-y-4 mb-8">
                {/* WhatsApp */}
                <div className={`p-5 rounded-2xl border-2 transition-all ${alerts.whatsapp ? 'border-navy bg-navy/[0.03]' : 'border-navy/15'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">💬</div>
                      <div>
                        <p className="text-navy font-bold text-sm">WhatsApp Alerts</p>
                        <p className="text-navy/50 text-xs">Low stock, labels ready, daily summary</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAlerts(a => ({ ...a, whatsapp: !a.whatsapp }))}
                      className={`w-12 h-6 rounded-full transition-all relative ${alerts.whatsapp ? 'bg-navy' : 'bg-navy/20'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${alerts.whatsapp ? 'left-6' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <p className="text-navy/40 text-xs mt-2">Recommended — sellers respond 5× faster to WhatsApp than email</p>
                </div>

                {/* Email */}
                <div className={`p-5 rounded-2xl border-2 transition-all ${alerts.email ? 'border-navy bg-navy/[0.03]' : 'border-navy/15'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white text-xl">📧</div>
                      <div>
                        <p className="text-navy font-bold text-sm">Email Alerts</p>
                        <p className="text-navy/50 text-xs">Daily reports and weekly summaries</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAlerts(a => ({ ...a, email: !a.email }))}
                      className={`w-12 h-6 rounded-full transition-all relative ${alerts.email ? 'bg-navy' : 'bg-navy/20'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${alerts.email ? 'left-6' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>

                {/* Low stock threshold */}
                <div className="p-5 rounded-2xl border-2 border-navy/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">⚠️</div>
                    <div>
                      <p className="text-navy font-bold text-sm">Low Stock Alert Threshold</p>
                      <p className="text-navy/50 text-xs">Alert when any SKU falls below this many units</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={alerts.lowStockThreshold}
                      onChange={(e) => setAlerts(a => ({ ...a, lowStockThreshold: e.target.value }))}
                      className="w-24 border border-navy/20 rounded-xl px-4 py-2.5 text-navy font-bold text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-center"
                    />
                    <span className="text-navy/55 text-sm">units remaining</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-none border-2 border-navy/15 text-navy font-semibold px-5 py-3.5 rounded-xl hover:bg-navy/5 transition-all text-sm">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex-1 bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm"
                >
                  Save & Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 5: Done ── */}
          {step === 5 && (
            <div className="text-center">
              {/* Confetti-style emoji row */}
              <div className="text-4xl mb-2 space-x-2">🎉 🚀 ✅</div>
              <h1 className="text-4xl font-black text-navy mb-3">You're all set!</h1>
              <p className="text-navy/55 text-lg mb-10">
                Your ZAIPIO dashboard is ready. Labels will auto-download at 12:00 PM tomorrow.
              </p>

              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { icon: '🔌', label: 'Platform connected', value: PLATFORMS.find(p => p.id === selectedPlatform)?.name || 'Shopify' },
                  { icon: '🏷️', label: 'Auto-download', value: '12:00 PM daily' },
                  { icon: '🔔', label: 'Alerts', value: [alerts.whatsapp && 'WhatsApp', alerts.email && 'Email'].filter(Boolean).join(' + ') || 'None' },
                ].map((item) => (
                  <div key={item.label} className="bg-navy/[0.03] border border-navy/10 rounded-2xl p-4">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-navy/45 text-xs mb-1">{item.label}</p>
                    <p className="text-navy font-bold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <a
                href="/dashboard"
                className="inline-block bg-navy text-white font-bold text-base px-10 py-4 rounded-2xl hover:bg-navy-800 transition-all shadow-navy-md hover:-translate-y-0.5 mb-4"
              >
                Open Dashboard →
              </a>
              <p className="text-navy/40 text-xs">
                You can add more platforms anytime from Platform Connections
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
