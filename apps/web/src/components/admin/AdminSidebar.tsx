'use client'

import { usePathname } from 'next/navigation'

const ADMIN_NAV = [
  { href: '/admin', label: 'Overview', icon: '⚡' },
  { href: '/admin/sellers', label: 'Sellers & Accounts', icon: '👥' },
  { href: '/admin/subscriptions', label: 'Subscriptions & MRR', icon: '💳' },
  { href: '/admin/system', label: 'API & Worker Health', icon: '📡' },
  { href: '/admin/cron', label: 'Cron & Label Jobs', icon: '⏰' },
  { href: '/admin/settings', label: 'System Settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 bg-slate-950 text-white flex flex-col h-screen overflow-y-auto border-r border-slate-800">
      {/* Header Badge */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center font-black text-white text-sm shadow">
            Z
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">ZAIPIO</span>
            <span className="ml-1.5 text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">
              ADMIN
            </span>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-3 py-2">
          Management
        </p>
        {ADMIN_NAV.map((item) => {
          const active = pathname === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? 'bg-red-600/15 text-red-400 border border-red-500/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500" />}
            </a>
          )
        })}
      </nav>

      {/* Admin User Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Super Admin</p>
            <p className="text-[10px] text-slate-400 truncate">admin@zaipio.com</p>
          </div>
          <a href="/dashboard" className="text-slate-500 hover:text-slate-300 text-xs" title="Back to Seller App">
            ↗
          </a>
        </div>
      </div>
    </aside>
  )
}
