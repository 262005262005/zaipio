'use client'

import { usePathname } from 'next/navigation'

const NAV = [
  {
    group: 'OVERVIEW',
    items: [
      { href: '/dashboard',   label: 'Dashboard',   icon: '⊞' },
      { href: '/orders',      label: 'Orders',       icon: '📦' },
      { href: '/labels',      label: 'Labels',       icon: '🏷️' },
    ],
  },
  {
    group: 'OPERATIONS',
    items: [
      { href: '/inventory',   label: 'Inventory',    icon: '📊' },
      { href: '/payments',    label: 'Payments',     icon: '💳' },
      { href: '/returns',     label: 'Returns',      icon: '↩️' },
    ],
  },
  {
    group: 'INSIGHTS',
    items: [
      { href: '/profit',      label: 'Profit',       icon: '💰' },
    ],
  },
  {
    group: 'SETTINGS',
    items: [
      { href: '/settings',    label: 'Settings',     icon: '⚙️' },
    ],
  },
]

const PLATFORM_STATUSES = [
  { letter: 'A', color: '#FF9900', name: 'Amazon',   ok: true  },
  { letter: 'F', color: '#2874F0', name: 'Flipkart', ok: true  },
  { letter: 'M', color: '#9B1FE8', name: 'Meesho',   ok: false },
  { letter: 'S', color: '#96BF48', name: 'Shopify',  ok: true  },
]

interface SidebarProps {
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname()

  const content = (
    <aside className="w-60 shrink-0 bg-navy flex flex-col h-full overflow-y-auto z-40">
      {/* Logo & Mobile Close */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow">
            <span className="text-navy font-black text-sm">Z</span>
          </div>
          <span className="text-white font-black text-xl tracking-tight">ZAIPIO</span>
        </a>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-white/60 hover:text-white p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Sync status strip */}
      <div className="mx-3 mt-3 bg-white/[0.07] border border-white/10 rounded-xl px-3 py-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Platform Sync</span>
          <span className="flex items-center gap-1 text-green-400 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>
        <div className="flex gap-1.5">
          {PLATFORM_STATUSES.map((p) => (
            <div key={p.letter} className="relative group">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
                style={{ background: p.color, opacity: p.ok ? 1 : 0.45 }}
              >
                {p.letter}
              </div>
              {!p.ok && (
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-navy" />
              )}
            </div>
          ))}
        </div>
        <p className="text-white/30 text-[10px] mt-1.5">Last sync: 2 min ago</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-2 mb-1.5">
              {section.group}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                        active
                          ? 'bg-white/15 text-white shadow-sm'
                          : 'text-white/55 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{item.icon}</span>
                        {item.label}
                      </div>
                      {active && (
                        <div className="w-1 h-1 rounded-full bg-accent" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Profile Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">Rohan Mehta</p>
            <p className="text-white/40 text-xs truncate">Growth Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop static sidebar */}
      <div className="hidden lg:block h-screen">
        {content}
      </div>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-50 h-full">
            {content}
          </div>
        </div>
      )}
    </>
  )
}
