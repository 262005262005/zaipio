'use client'

export default function ProfitPage() {
  const BREAKDOWN = [
    { label: 'Gross Sales Revenue', amount: '₹12,45,000', percent: '100%', color: 'text-navy', bg: 'bg-navy' },
    { label: 'COGS (Cost of Goods Sold)', amount: '₹5,60,250', percent: '45.0%', color: 'text-slate-600', bg: 'bg-slate-500' },
    { label: 'Marketplace Commissions & Fees', amount: '₹1,74,300', percent: '14.0%', color: 'text-amber-600', bg: 'bg-amber-500' },
    { label: 'Shipping & Forward Logistics', amount: '₹99,600', percent: '8.0%', color: 'text-blue-600', bg: 'bg-blue-500' },
    { label: 'Ad Spend (Amazon Ads / Meta)', amount: '₹1,24,500', percent: '10.0%', color: 'text-purple-600', bg: 'bg-purple-500' },
    { label: 'RTO & Return Losses', amount: '₹37,350', percent: '3.0%', color: 'text-red-600', bg: 'bg-red-500' },
    { label: 'Net Profit Realized', amount: '₹2,49,000', percent: '20.0%', color: 'text-emerald-600 font-black', bg: 'bg-emerald-500' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Order Profitability & Unit Economics</h1>
          <p className="text-navy/60 text-sm">Real-time P&L calculator per order: Revenue − COGS − Fees − Ads − Shipping − Returns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Net Profit Big Card */}
        <div className="bg-gradient-to-br from-navy to-navy/90 text-white p-6 rounded-2xl shadow-navy-md flex flex-col justify-between">
          <div>
            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Net Profit (This Month)</span>
            <p className="text-4xl font-black mt-2 text-emerald-400">₹2,49,000</p>
            <p className="text-xs text-white/70 mt-1">20.0% Net Profit Margin</p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Gross Margin</span>
              <span className="font-bold">55.0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">ROAS (Ad Return)</span>
              <span className="font-bold text-sky-400">4.2x</span>
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-navy/5 shadow-navy-sm space-y-4">
          <h2 className="font-bold text-navy">Unit Economics Waterfall</h2>
          <div className="space-y-3">
            {BREAKDOWN.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy/80">{item.label}</span>
                  <span className={item.color}>{item.amount} ({item.percent})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.bg}`} style={{ width: item.percent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
