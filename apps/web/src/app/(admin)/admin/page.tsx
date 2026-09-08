'use client'

const METRICS = [
  { label: 'Monthly Recurring Revenue (MRR)', value: '₹18,45,000', change: '+22.4%', status: 'good' },
  { label: 'Active Paid Sellers', value: '1,420', change: '+84 this month', status: 'good' },
  { label: 'Labels Processed (24h)', value: '1,28,450', change: '99.98% success', status: 'good' },
  { label: 'Marketplace Sync Errors', value: '3', change: '-5 from yesterday', status: 'warning' },
]

const SYSTEM_HEALTH = [
  { service: 'Amazon SP-API Webhook Worker', status: 'Healthy', latency: '24ms', uptime: '100%' },
  { service: 'Flipkart Seller API Sync', status: 'Healthy', latency: '48ms', uptime: '99.9%' },
  { service: 'Meesho Order Poller', status: 'Degraded', latency: '240ms', uptime: '98.5%' },
  { service: 'PDF Label Cropper Service', status: 'Healthy', latency: '12ms', uptime: '100%' },
]

const RECENT_SELLERS = [
  { id: 'SEL-8821', name: 'Vedic Threads Pvt Ltd', email: 'rohan@vedicthreads.in', plan: 'Growth', mrr: '₹4,999/mo', platforms: ['Amazon', 'Shopify'], date: 'Just now' },
  { id: 'SEL-8820', name: 'Urban Tech Electronics', email: 'sales@urbantech.co.in', plan: 'Enterprise', mrr: '₹14,999/mo', platforms: ['Amazon', 'Flipkart', 'Meesho', 'Shopify'], date: '25 mins ago' },
  { id: 'SEL-8819', name: 'Kashmiri Handloom Arts', email: 'info@kashmirarts.com', plan: 'Starter', mrr: '₹1,999/mo', platforms: ['Flipkart', 'Meesho'], date: '1 hr ago' },
  { id: 'SEL-8818', name: 'Organica Pure Essentials', email: 'contact@organicapure.in', plan: 'Free', mrr: '₹0/mo', platforms: ['Shopify'], date: '3 hrs ago' },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Control Panel</h1>
          <p className="text-slate-400 text-sm">Real-time platform analytics, seller metrics, and microservice status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs transition-all border border-slate-700">
            📊 Download System Report
          </button>
          <button className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-lg transition-all">
            ⚡ Force Cron Trigger (12:00)
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{m.label}</p>
            <p className="text-2xl font-black text-white">{m.value}</p>
            <p className={`text-xs font-semibold ${m.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {m.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sellers Table (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white text-base">Recently Registered Sellers</h2>
            <a href="/admin/sellers" className="text-xs text-red-400 hover:underline font-semibold">
              View All Sellers →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-slate-500 text-xs font-semibold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Seller</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">MRR</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {RECENT_SELLERS.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-white">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.email} • {s.date}</p>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        s.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        s.plan === 'Growth' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        s.plan === 'Starter' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {s.plan}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-white">{s.mrr}</td>
                    <td className="p-3 text-right">
                      <button className="text-xs font-semibold text-red-400 hover:underline">Impersonate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Microservice Health Panel (1 col) */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h2 className="font-bold text-white text-base">API & Microservice Status</h2>
          <div className="space-y-3">
            {SYSTEM_HEALTH.map((item) => (
              <div key={item.service} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{item.service}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Latency: {item.latency}</span>
                  <span>Uptime: {item.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
