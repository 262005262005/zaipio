'use client'

import { useEffect, useRef } from 'react'

const PLATFORMS = [
  { name: 'Amazon', color: '#FF9900', letter: 'A' },
  { name: 'Flipkart', color: '#2874F0', letter: 'F' },
  { name: 'Meesho', color: '#9B1FE8', letter: 'M' },
  { name: 'Shopify', color: '#96BF48', letter: 'S' },
]

const AGENTIC_PILLS = [
  { label: '⚡ Agentic Order Processing', sub: 'Labels ready by 12:00' },
  { label: '🛡️ Claims Filed with Proof', sub: 'RTO & Damage recovery' },
  { label: '💳 Rupee-Level Reconciliation', sub: 'Zero fee leakage' },
  { label: '🤖 Auto Stock Sync', sub: 'Multi-platform safety' },
]

export default function Hero() {
  const dashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = dashRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4
      el.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`
    }
    const onLeave = () => { el.style.transform = 'perspective(1200px) rotateY(-2deg) rotateX(2deg)' }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-b from-[#041a2e] via-navy to-navy">

      {/* Background radial glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Monospace micro badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/[0.08] border border-white/15 text-white text-xs font-mono px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="tracking-widest uppercase text-[11px] font-bold text-accent">THE AGENTIC OMS FOR E-COMMERCE</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight text-balance mb-6">
          You Sell.
          <br />
          <span className="bg-gradient-to-r from-accent via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            ZAIPIO Runs The Rest.
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          The AI-powered Agentic OMS for Amazon, Flipkart, Meesho &amp; Shopify sellers — order processing, stock sync, video-proof claims, and payment reconciliation down to the rupee.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="/signup"
            className="w-full sm:w-auto bg-gradient-to-r from-accent to-sky-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:brightness-110 hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Start Free — No Card Needed</span>
            <span>→</span>
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto bg-white/10 border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            Explore Agentic Features
          </a>
        </div>

        {/* Feature Pills Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16">
          {AGENTIC_PILLS.map((p) => (
            <div key={p.label} className="bg-white/[0.05] border border-white/10 p-3 rounded-2xl backdrop-blur-sm text-left">
              <p className="text-white font-bold text-xs">{p.label}</p>
              <p className="text-white/50 text-[10px] font-mono mt-0.5">{p.sub}</p>
            </div>
          ))}
        </div>

        {/* Interactive Dashboard Frame */}
        <div
          ref={dashRef}
          className="relative mx-auto max-w-5xl transition-transform duration-200 ease-out"
          style={{ transform: 'perspective(1200px) rotateY(-2deg) rotateX(2deg)' }}
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-emerald-400/20 blur-3xl rounded-3xl" />

          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 text-navy text-left">
            {/* Window bar */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="bg-slate-800 rounded-md px-4 py-1 text-xs text-slate-300 font-mono">
                app.zaipio.com/agentic-control
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Agent Active
              </div>
            </div>

            {/* Dashboard inner preview */}
            <div className="p-6 bg-slate-50 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-navy/10 shadow-sm">
                  <p className="text-navy/50 text-[10px] font-mono uppercase font-bold">Daily Orders Handled</p>
                  <p className="text-2xl font-black text-navy mt-1">2,847</p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">✓ 100% Auto-crop ready</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-navy/10 shadow-sm">
                  <p className="text-navy/50 text-[10px] font-mono uppercase font-bold">Claims Filed with Video</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">₹42,800</p>
                  <p className="text-xs text-accent font-bold mt-1">18 VMS proofs attached</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-navy/10 shadow-sm">
                  <p className="text-navy/50 text-[10px] font-mono uppercase font-bold">Reconciled to Rupee</p>
                  <p className="text-2xl font-black text-navy mt-1">₹14,25,000</p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">0% Fee Leakage</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-navy/10 shadow-sm">
                  <p className="text-navy/50 text-[10px] font-mono uppercase font-bold">Stock Sync Latency</p>
                  <p className="text-2xl font-black text-accent mt-1">12ms</p>
                  <p className="text-xs text-navy/50 mt-1">4 Platforms live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
