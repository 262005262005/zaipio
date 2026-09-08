'use client'

export default function ReturnsPage() {
  const RETURNS = [
    { id: 'RET-401', orderId: '#AMZ-28471', customer: 'Aarav Sharma', sku: 'SKU-0041', reason: 'Size too small', status: 'RTO In-Transit', platform: 'Amazon', date: '08 Sep 2026' },
    { id: 'RET-402', orderId: '#FK-92812', customer: 'Priya Patel', sku: 'SKU-0012', reason: 'Defective item', status: 'Received & Inspected', platform: 'Flipkart', date: '07 Sep 2026' },
    { id: 'RET-403', orderId: '#MSH-11029', customer: 'Vikram Singh', sku: 'SKU-0099', reason: 'Customer non-contactable', status: 'RTO Initiated', platform: 'Meesho', date: '06 Sep 2026' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Return & RTO Management</h1>
          <p className="text-navy/60 text-sm">Track customer returns, courier RTOs, damage claims, and reverse logistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Return Rate</p>
          <p className="text-2xl font-black text-navy mt-1">4.2%</p>
          <p className="text-xs text-green-600 font-medium mt-1">↓ 0.8% below category avg</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">RTO Orders</p>
          <p className="text-2xl font-black text-amber-500 mt-1">18</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Reverse logistics active</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Refund Value</p>
          <p className="text-2xl font-black text-red-500 mt-1">₹14,800</p>
          <p className="text-xs text-navy/40 mt-1">Processed this month</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Claims Filed</p>
          <p className="text-2xl font-black text-accent mt-1">5</p>
          <p className="text-xs text-accent font-medium mt-1">₹6,200 pending recovery</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-sm overflow-hidden">
        <div className="p-4 border-b border-navy/5">
          <h2 className="font-bold text-navy">Active Returns & RTO Tracker</h2>
        </div>
        <table className="w-full text-left text-sm text-navy">
          <thead className="bg-slate-50 text-navy/50 text-xs font-semibold uppercase border-b border-navy/5">
            <tr>
              <th className="p-4">Return ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Platform</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {RETURNS.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-navy">{r.id}</td>
                <td className="p-4 font-semibold text-slate-700">{r.orderId}</td>
                <td className="p-4 font-medium">{r.platform}</td>
                <td className="p-4 font-mono text-xs">{r.sku}</td>
                <td className="p-4 text-navy/70">{r.reason}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-accent hover:underline font-semibold text-xs">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
