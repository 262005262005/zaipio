// Shared left-side navy brand panel used on all auth pages

const STATS = [
  { value: '50K+', label: 'Labels automated daily' },
  { value: '₹2.3Cr', label: 'Profit tracked this month' },
  { value: '4', label: 'Platforms connected' },
]

const TESTIMONIAL = {
  quote:
    '"Before ZAIPIO, I spent 2 hours every morning sorting labels. Now it\'s done at 12:00 automatically — I didn\'t even open my laptop."',
  name: 'Rohan Mehta',
  business: 'Seller on Amazon & Flipkart · ₹40L/month GMV',
  initials: 'RM',
}

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] bg-navy flex-col justify-between p-10 xl:p-14 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top — Logo */}
      <div className="relative z-10">
        <a href="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-navy font-black text-base">Z</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tight">ZAIPIO</span>
        </a>

        {/* Tagline */}
        <p className="text-white/50 text-sm mt-3 max-w-xs leading-relaxed">
          One dashboard for every platform. Labels, stock, profit — unified.
        </p>
      </div>

      {/* Middle — Stats */}
      <div className="relative z-10 space-y-5">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
          Trusted by sellers this month
        </p>
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/[0.07] border border-white/10 rounded-2xl p-4">
              <p className="text-white font-black text-2xl leading-none mb-1">{s.value}</p>
              <p className="text-white/45 text-xs leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Platform logos row */}
        <div className="flex items-center gap-3 pt-2">
          {[
            { letter: 'A', color: '#FF9900' },
            { letter: 'F', color: '#2874F0' },
            { letter: 'M', color: '#9B1FE8' },
            { letter: 'S', color: '#96BF48' },
          ].map((p) => (
            <div
              key={p.letter}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: p.color }}
            >
              {p.letter}
            </div>
          ))}
          <span className="text-white/35 text-xs ml-1">+ more coming</span>
        </div>
      </div>

      {/* Bottom — Testimonial */}
      <div className="relative z-10">
        <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-6">
          {/* Quote icon */}
          <span className="text-accent text-3xl font-black leading-none block mb-3">"</span>
          <p className="text-white/80 text-sm leading-relaxed italic mb-5">
            {TESTIMONIAL.quote}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-black text-xs shrink-0">
              {TESTIMONIAL.initials}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{TESTIMONIAL.name}</p>
              <p className="text-white/40 text-xs">{TESTIMONIAL.business}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
