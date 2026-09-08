'use client'

const ZIGZAG_FEATURES = [
  {
    badge: 'AUTOMATED WORKFLOW',
    title: 'Agentic Order Processing & Daily 12:00 Batch',
    desc: 'Stop logging into 4 separate seller portals every morning. ZAIPIO automatically fetches orders from Amazon, Flipkart, Meesho, and Shopify, crops labels SKU-wise, and outputs dispatch-ready PDF stacks at 12:00 PM.',
    points: [
      '11-stage autonomous order execution',
      'SKU-wise & quantity-wise label PDF bundling',
      'Instant picklist generation for warehouse staff',
    ],
    cta: 'Explore Order Automation →',
    href: '/orders',
    reverse: false,
    mockupType: 'orders',
  },
  {
    badge: 'PROTECT THE MONEY',
    title: 'Claims Filed For You with VMS Video Proof',
    desc: 'Don’t lose money on damaged courier returns or missing items. ZAIPIO links your barcode scan video recording directly to return claims, automatically generating video-proof packages that get 98%+ recovery approval.',
    points: [
      'Automatic barcode scan video mapping',
      'Instant video proof pack generation',
      'Reverse logistics damage claim submission',
    ],
    cta: 'See Claim Recovery System →',
    href: '/returns',
    reverse: true,
    mockupType: 'claims',
  },
  {
    badge: 'RECONCILIATION',
    title: 'Rupee-Level Marketplace Payment Settlement',
    desc: 'Marketplaces deduct hidden fees, wrong weight penalties, and overcharged commissions. ZAIPIO reconciles every single payout batch down to the rupee, flagging exact fee leakages instantly.',
    points: [
      'Payout reconciliation for Amazon, Flipkart, Meesho & Shopify',
      'Automated weight penalty & overcharge alerts',
      'Exportable GST reconciliation sheets',
    ],
    cta: 'Check Settlement Recon →',
    href: '/payments',
    reverse: false,
    mockupType: 'payments',
  },
  {
    badge: 'INVENTORY SAFETY',
    title: 'Real-Time Multi-Channel Stock Buffer',
    desc: 'Never risk overselling or marketplace account suspension again. When an order sells on Meesho, ZAIPIO updates stock levels on Amazon, Flipkart, and Shopify in under 12 milliseconds.',
    points: [
      '12ms 2-way real-time stock sync',
      'Safety stock buffer per SKU per channel',
      'Automated low-stock WhatsApp alert trigger',
    ],
    cta: 'View Inventory Sync →',
    href: '/inventory',
    reverse: true,
    mockupType: 'inventory',
  },
  {
    badge: 'REAL MARGINS',
    title: 'Per-Order Net Profit Waterfall Calculator',
    desc: 'Revenue isn’t profit. ZAIPIO calculates your true net profit per order by subtracting marketplace commission, GST, forward/reverse shipping, ad spend, and COGS automatically.',
    points: [
      'Unit economics waterfall per order',
      'Real ROAS & ad spend profit attribution',
      'Margin health alerts per SKU category',
    ],
    cta: 'Calculate Order Profit →',
    href: '/profit',
    reverse: false,
    mockupType: 'profit',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-navy text-white overflow-hidden relative border-t border-white/10">
      
      {/* Background Radial Glows using ZAIPIO Accent Blue */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest bg-accent/15 text-accent border border-accent/30 px-3 py-1 rounded-full">
            ✦ WORKFLOW AUTOMATION ENGINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            How ZAIPIO Runs Your Marketplace Store For You
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            From 12:00 PM label cropping to video-proof claim filing and rupee-level payment reconciliation — AI agents handle every operational step.
          </p>
        </div>

        {/* Zig-Zag Feature Blocks */}
        {ZIGZAG_FEATURES.map((f, index) => (
          <div
            key={f.title}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
              f.reverse ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Text Column */}
            <div className="flex-1 space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/15 px-2.5 py-1 rounded-md border border-accent/30">
                {f.badge}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {f.title}
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                {f.desc}
              </p>
              <ul className="space-y-3 pt-2">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm font-semibold text-white/90">
                    <span className="w-5 h-5 rounded-full bg-accent/25 text-accent flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <a
                  href={f.href}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-sky-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
                >
                  {f.cta}
                </a>
              </div>
            </div>

            {/* Mockup Column in ZAIPIO Navy Theme */}
            <div className="flex-1 w-full">
              <div className="relative bg-[#041a2e] border border-white/15 rounded-2xl shadow-2xl p-6 overflow-hidden group hover:border-accent/50 transition-all">
                {/* Glow backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-accent/25 to-sky-400/25 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 space-y-4">
                  {/* Mockup Top Window Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 uppercase">zaipio_workflow_node_0{index + 1}</span>
                  </div>

                  {/* Render Mockup Details based on type */}
                  {f.mockupType === 'orders' && (
                    <div className="space-y-3 font-outfit text-left">
                      <div className="flex items-center justify-between bg-navy-950 p-3 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-white">12:00 PM Auto-Crop Trigger</span>
                        <span className="text-[10px] font-mono font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">EXECUTED</span>
                      </div>
                      <div className="p-3 bg-navy-900/80 rounded-xl border border-white/10 space-y-2 text-xs">
                        <div className="flex justify-between text-white/70"><span>Amazon Labels (2,847)</span><span className="text-green-400 font-bold">Ready</span></div>
                        <div className="flex justify-between text-white/70"><span>Flipkart Shortlist SKU-0041</span><span className="text-green-400 font-bold">Bundled</span></div>
                        <div className="flex justify-between text-white/70"><span>Meesho Auto-Crop PDF</span><span className="text-green-400 font-bold">Shortlisted</span></div>
                      </div>
                    </div>
                  )}

                  {f.mockupType === 'claims' && (
                    <div className="space-y-3 font-outfit text-left">
                      <div className="flex items-center justify-between bg-navy-950 p-3 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-white">Pack-Out Video Proof Linked</span>
                        <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">CLAIM FILED</span>
                      </div>
                      <div className="p-3 bg-navy-900/80 rounded-xl border border-white/10 space-y-2 text-xs">
                        <div className="flex justify-between text-white/70"><span>Return Order ID</span><span className="text-white font-mono">#RET-401</span></div>
                        <div className="flex justify-between text-white/70"><span>Video Scan Hash</span><span className="text-accent font-mono">vms_rec_8847.mp4</span></div>
                        <div className="flex justify-between text-white/70"><span>Recovery Amount</span><span className="text-green-400 font-bold">₹1,499 Approved</span></div>
                      </div>
                    </div>
                  )}

                  {f.mockupType === 'payments' && (
                    <div className="space-y-3 font-outfit text-left">
                      <div className="flex items-center justify-between bg-navy-950 p-3 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-white">Settlement Batch Recon</span>
                        <span className="text-[10px] font-mono font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">0% LEAKAGE</span>
                      </div>
                      <div className="p-3 bg-navy-900/80 rounded-xl border border-white/10 space-y-2 text-xs">
                        <div className="flex justify-between text-white/70"><span>Gross Marketplace Payout</span><span className="text-white font-bold">₹14,25,000</span></div>
                        <div className="flex justify-between text-white/70"><span>Comm &amp; Shipping Deductions</span><span className="text-red-400">-₹1,99,500</span></div>
                        <div className="flex justify-between text-white/70"><span>Net Rupee Bank Settlement</span><span className="text-green-400 font-black">₹12,25,500</span></div>
                      </div>
                    </div>
                  )}

                  {f.mockupType === 'inventory' && (
                    <div className="space-y-3 font-outfit text-left">
                      <div className="flex items-center justify-between bg-navy-950 p-3 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-white">2-Way Sync Engine</span>
                        <span className="text-[10px] font-mono font-bold bg-accent/20 text-accent px-2 py-0.5 rounded border border-accent/30">12ms LATENCY</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="bg-navy-950 p-2 rounded-lg border border-white/10"><p className="text-[10px] text-white/50">Amazon</p><p className="font-bold text-amber-400">15</p></div>
                        <div className="bg-navy-950 p-2 rounded-lg border border-white/10"><p className="text-[10px] text-white/50">Flipkart</p><p className="font-bold text-sky-400">12</p></div>
                        <div className="bg-navy-950 p-2 rounded-lg border border-white/10"><p className="text-[10px] text-white/50">Meesho</p><p className="font-bold text-purple-400">10</p></div>
                        <div className="bg-navy-950 p-2 rounded-lg border border-white/10"><p className="text-[10px] text-white/50">Shopify</p><p className="font-bold text-green-400">8</p></div>
                      </div>
                    </div>
                  )}

                  {f.mockupType === 'profit' && (
                    <div className="space-y-3 font-outfit text-left">
                      <div className="flex items-center justify-between bg-navy-950 p-3 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-white">Unit Profit Margin Waterfall</span>
                        <span className="text-[10px] font-mono font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">20.0% NET</span>
                      </div>
                      <div className="p-3 bg-navy-900/80 rounded-xl border border-white/10 space-y-1.5 text-xs">
                        <div className="flex justify-between text-white/70"><span>Order Revenue</span><span className="text-white">₹1,198</span></div>
                        <div className="flex justify-between text-white/70"><span>Platform Fees + Shipping</span><span className="text-red-400">-₹252</span></div>
                        <div className="flex justify-between text-white/70"><span>Estimated COGS</span><span className="text-white/50">-₹496</span></div>
                        <div className="flex justify-between text-white font-bold pt-1 border-t border-white/10"><span>Net Profit Realized</span><span className="text-green-400 font-black">+₹450</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
