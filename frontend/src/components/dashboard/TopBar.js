"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopBar;
const react_1 = require("react");
function TopBar({ onOpenMobile }) {
    const [search, setSearch] = (0, react_1.useState)('');
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    return (<header className="h-16 bg-white border-b border-navy/10 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">

      {/* Left — Hamburger & Page context */}
      <div className="flex items-center gap-3">
        {onOpenMobile && (<button onClick={onOpenMobile} className="lg:hidden p-2 rounded-xl bg-navy/5 hover:bg-navy/10 text-navy font-bold text-lg leading-none" aria-label="Open Mobile Menu">
            ☰
          </button>)}
        <div>
          <p className="text-navy/40 text-[11px] font-medium sm:text-xs">{dateStr}</p>
          <p className="text-navy font-bold text-xs sm:text-sm leading-tight">Labels download at 12:00 PM IST</p>
        </div>
      </div>

      {/* Center — Search */}
      <div className="hidden md:flex items-center gap-2 bg-navy/[0.04] border border-navy/10 rounded-xl px-3 py-2 w-64 focus-within:border-accent focus-within:bg-white transition-all">
        <span className="text-navy/35 text-sm">🔍</span>
        <input type="text" placeholder="Search orders, SKUs…" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-navy text-sm placeholder-navy/35 outline-none"/>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-navy/10">
          <button title="Electric Sky" className="w-3.5 h-3.5 rounded-full bg-[#0EA5E9] hover:scale-110 transition-transform ring-2 ring-white"/>
          <button title="Emerald" className="w-3.5 h-3.5 rounded-full bg-[#10B981] hover:scale-110 transition-transform"/>
          <button title="Indigo" className="w-3.5 h-3.5 rounded-full bg-[#6366F1] hover:scale-110 transition-transform"/>
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl hover:bg-navy/10 transition-colors text-navy/60" aria-label="Notifications">
          <span className="text-base sm:text-lg">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"/>
        </button>

        {/* Quick add order */}
        <button className="bg-navy text-white font-semibold text-xs px-3 py-2 sm:px-4 sm:py-2 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm">
          <span>+</span> <span className="hidden sm:inline">New Order</span>
        </button>
      </div>
    </header>);
}
//# sourceMappingURL=TopBar.js.map