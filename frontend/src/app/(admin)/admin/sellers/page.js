"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminSellersPage;
const react_1 = require("react");
const SELLERS = [
    { id: 'SEL-8821', name: 'Vedic Threads Pvt Ltd', email: 'rohan@vedicthreads.in', phone: '+91 98765 43210', plan: 'Growth', status: 'Active', ordersMonth: 4820, mrr: '₹4,999', joined: '12 Jan 2026' },
    { id: 'SEL-8820', name: 'Urban Tech Electronics', email: 'sales@urbantech.co.in', phone: '+91 99887 76655', plan: 'Enterprise', status: 'Active', ordersMonth: 28400, mrr: '₹14,999', joined: '03 Feb 2026' },
    { id: 'SEL-8819', name: 'Kashmiri Handloom Arts', email: 'info@kashmirarts.com', phone: '+91 91234 56789', plan: 'Starter', status: 'Active', ordersMonth: 820, mrr: '₹1,999', joined: '18 May 2026' },
    { id: 'SEL-8818', name: 'Organica Pure Essentials', email: 'contact@organicapure.in', phone: '+91 94567 89012', plan: 'Free', status: 'Active', ordersMonth: 42, mrr: '₹0', joined: '01 Sep 2026' },
    { id: 'SEL-8817', name: 'Metro Fashion Hub', email: 'metro@fashionhub.in', phone: '+91 97654 32109', plan: 'Growth', status: 'Suspended', ordersMonth: 0, mrr: '₹4,999', joined: '14 Nov 2025' },
];
function AdminSellersPage() {
    const [search, setSearch] = (0, react_1.useState)('');
    const [planFilter, setPlanFilter] = (0, react_1.useState)('All');
    const filtered = SELLERS.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
        if (planFilter === 'All')
            return matchesSearch;
        return matchesSearch && s.plan === planFilter;
    });
    return (<div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Seller Accounts & Tenant Management</h1>
          <p className="text-slate-400 text-sm">Manage registered sellers, update plans, monitor activity, or impersonate accounts.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow transition-all flex items-center gap-2">
          <span>+</span> Create Seller Account
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <input type="text" placeholder="Search by business name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-96 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-500"/>
        <div className="flex items-center gap-2">
          {['All', 'Free', 'Starter', 'Growth', 'Enterprise'].map((p) => (<button key={p} onClick={() => setPlanFilter(p)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${planFilter === p ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
              {p}
            </button>))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900 text-slate-500 text-xs font-semibold uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Seller / Email</th>
              <th className="p-4">Plan</th>
              <th className="p-4 text-center">Orders (30d)</th>
              <th className="p-4 text-right">MRR</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((s) => (<tr key={s.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-white">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.email} • {s.phone}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                s.plan === 'Growth' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    s.plan === 'Starter' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        'bg-slate-800 text-slate-400'}`}>
                    {s.plan}
                  </span>
                </td>
                <td className="p-4 text-center font-semibold text-slate-200">{s.ordersMonth.toLocaleString()}</td>
                <td className="p-4 text-right font-black text-white">{s.mrr}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button className="text-xs font-semibold text-red-400 hover:underline">Impersonate</button>
                  <button className="text-xs font-semibold text-slate-400 hover:underline">Edit Plan</button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map