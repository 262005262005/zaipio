'use client'

import { useState } from 'react'

const TRANSACTIONS = [
  { id: 'PAY-8910', date: '08 Sep 2026', platform: 'Amazon', gross: '₹14,250', commission: '₹1,995', shipping: '₹850', netSettlement: '₹11,405', status: 'Settled' },
  { id: 'PAY-8911', date: '07 Sep 2026', platform: 'Flipkart', gross: '₹22,100', commission: '₹3,094', shipping: '₹1,320', netSettlement: '₹17,686', status: 'Settled' },
  { id: 'PAY-8912', date: '06 Sep 2026', platform: 'Meesho', gross: '₹9,400', commission: '₹470', shipping: '₹750', netSettlement: '₹8,180', status: 'Processing' },
  { id: 'PAY-8913', date: '05 Sep 2026', platform: 'Shopify', gross: '₹35,000', commission: '₹700', shipping: '₹1,200', netSettlement: '₹33,100', status: 'Settled' },
]

export default function PaymentsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Payment Reconciliation & Settlements</h1>
          <p className="text-navy/60 text-sm">Unified settlement reconciliation across all marketplaces with fee breakdown.</p>
        </div>
        <button className="bg-navy hover:bg-navy/90 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-navy-sm transition-all flex items-center gap-2">
          <span>📥</span> Export Reconciliation CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Total Payouts (This Month)</p>
          <p className="text-2xl font-black text-navy mt-1">₹4,85,400</p>
          <p className="text-xs text-green-600 font-medium mt-1">↑ +14% vs last month</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Pending Settlements</p>
          <p className="text-2xl font-black text-amber-500 mt-1">₹62,180</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Expected in 48 hours</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Platform Fees & Deductions</p>
          <p className="text-2xl font-black text-red-500 mt-1">₹68,240</p>
          <p className="text-xs text-navy/40 mt-1">Avg ~14.1% commission</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Discrepancy Alerts</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">0</p>
          <p className="text-xs text-green-600 font-medium mt-1">✓ 100% Reconciled</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-sm overflow-hidden">
        <div className="p-4 border-b border-navy/5 flex items-center justify-between">
          <h2 className="font-bold text-navy">Recent Payout Batches</h2>
          <span className="text-xs text-navy/50">Auto-updated daily</span>
        </div>
        <table className="w-full text-left text-sm text-navy">
          <thead className="bg-slate-50 text-navy/50 text-xs font-semibold uppercase border-b border-navy/5">
            <tr>
              <th className="p-4">Batch ID / Date</th>
              <th className="p-4">Platform</th>
              <th className="p-4 text-right">Gross Sales</th>
              <th className="p-4 text-right">Commission Fee</th>
              <th className="p-4 text-right">Shipping Charges</th>
              <th className="p-4 text-right">Net Settlement</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {TRANSACTIONS.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-navy">{t.id}</p>
                  <p className="text-xs text-navy/50">{t.date}</p>
                </td>
                <td className="p-4 font-semibold">{t.platform}</td>
                <td className="p-4 text-right font-medium">{t.gross}</td>
                <td className="p-4 text-right font-medium text-red-500">{t.commission}</td>
                <td className="p-4 text-right font-medium text-red-500">{t.shipping}</td>
                <td className="p-4 text-right font-black text-emerald-600">{t.netSettlement}</td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    t.status === 'Settled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
