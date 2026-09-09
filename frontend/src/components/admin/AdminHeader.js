"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminHeader;
function AdminHeader() {
    return (<header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
          All Microservices Operational
        </span>
        <span className="text-slate-600 text-xs">•</span>
        <span className="text-slate-400 text-xs">Worker Latency: 42ms</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative">
          <input type="text" placeholder="Search seller, email, or order ID..." className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-500/50 w-64"/>
        </div>

        {/* Global Emergency Stop Toggle */}
        <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center gap-1.5">
          <span>⚙️</span> Config Flags
        </button>
      </div>
    </header>);
}
//# sourceMappingURL=AdminHeader.js.map