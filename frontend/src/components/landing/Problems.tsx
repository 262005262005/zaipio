'use client'

const LOSS_ITEMS = [
  { label: 'Unreconciled Returns & Damaged Goods', amount: '₹42,800', percent: '38%', color: 'text-red-400' },
  { label: 'Marketplace Overcharged Commission Fees', amount: '₹28,500', percent: '25%', color: 'text-amber-400' },
  { label: 'Wrong Weight Penalties & Shipping Surcharges', amount: '₹22,100', percent: '20%', color: 'text-purple-400' },
  { label: 'Unclaimed RTO Losses & Lost Shipments', amount: '₹18,600', percent: '17%', color: 'text-sky-400' },
]

export default function Problems() {
  return (
    <section className="py-24 bg-navy text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient(ellipse at center, rgba(14,165,233,0.12) 0%, transparent 70%) pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Box */}
        <div className="bg-[#041a2e] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text */}
          <div className="space-y-6 text-left">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full">
              ⚠️ THE HIDDEN PROFIT LEAKAGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Every Month, Money You Earned Silently Leaves Your Account.
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Without automated reconciliation, marketplace platforms quietly overcharge weight fees, miscalculate commission slabs, and deny unverified return claims. Indian sellers lose up to 14.8% of their monthly profit margin without even knowing it.
            </p>
            <div className="pt-2">
              <a
                href="/payments"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                <span>Audit Your Fee Leakage Free →</span>
              </a>
            </div>
          </div>

          {/* Right Loss Breakdown Card */}
          <div className="bg-navy p-6 sm:p-8 rounded-2xl border border-white/15 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-mono uppercase font-bold text-white/50">Estimated Monthly Margin Loss</p>
                <p className="text-3xl font-black text-red-400 mt-1">₹1,12,000 / mo</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                HIGH LEAKAGE
              </span>
            </div>

            {/* Loss Breakdown Waterfall */}
            <div className="space-y-4">
              {LOSS_ITEMS.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white/80">{item.label}</span>
                    <span className={item.color}>{item.amount}</span>
                  </div>
                  <div className="w-full h-2 bg-[#041a2e] rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full" style={{ width: item.percent }} />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/40 pt-2 border-t border-white/10">
              * Based on average seller revenue of ₹10L/month across Amazon, Flipkart, Meesho &amp; Shopify.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
