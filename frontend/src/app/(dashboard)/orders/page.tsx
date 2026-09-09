'use client'

import { useState, useEffect } from 'react'
import { zaipioApi } from '@/lib/api-client'

const STATUS_COLORS: Record<string, string> = {
  'Label Ready': 'text-green-700 bg-green-100',
  'Processing':  'text-blue-700 bg-blue-100',
  'Shipped':     'text-purple-700 bg-purple-100',
  'Delivered':   'text-navy/60 bg-navy/10',
  'RTO':         'text-red-700 bg-red-100',
  'Cancelled':   'text-gray-500 bg-gray-100',
}

const STATUSES = ['All', 'Label Ready', 'Processing', 'Shipped', 'Delivered', 'RTO']
const PLATFORMS = ['All', 'Amazon', 'Flipkart', 'Meesho', 'Shopify']

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [apiConnected, setApiConnected] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [platformFilter, setPlatformFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [density, setDensity] = useState<'compact' | 'comfortable'>('comfortable')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await zaipioApi.getOrders()
      setOrders(res.data)
      setApiConnected(true)
    } catch (err) {
      console.warn('Backend API connection fallback, using local state')
      setApiConnected(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filtered = orders.filter((o) => {
    const matchStatus   = statusFilter === 'All'   || o.status === statusFilter
    const matchPlatform = platformFilter === 'All' || o.platformName === platformFilter
    const matchSearch   = !search || o.id.toLowerCase().includes(search.toLowerCase())
      || o.product.toLowerCase().includes(search.toLowerCase())
      || o.sku.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchPlatform && matchSearch
  })

  return (
    <div className="space-y-5 relative text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-navy">Unified Orders</h1>
            {apiConnected && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full border border-green-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Backend API Connected (Port 4000)
              </span>
            )}
          </div>
          <p className="text-navy/50 text-sm mt-0.5">{orders.length} orders today across all platforms</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Density Switcher */}
          <div className="bg-navy/5 border border-navy/10 rounded-xl p-1 flex items-center gap-1">
            <button
              onClick={() => setDensity('comfortable')}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${density === 'comfortable' ? 'bg-white shadow text-navy' : 'text-navy/50'}`}
              title="Comfortable Row View"
            >
              ☰ Comfortable
            </button>
            <button
              onClick={() => setDensity('compact')}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${density === 'compact' ? 'bg-white shadow text-navy' : 'text-navy/50'}`}
              title="Dense Compact View"
            >
              ☵ Compact
            </button>
          </div>
          <button
            onClick={() => fetchOrders()}
            className="bg-navy text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm flex items-center gap-1.5"
          >
            <span>🔄</span> Sync API
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-navy' },
          { label: 'Label Ready',  value: orders.filter(o => o.status === 'Label Ready').length, color: 'text-green-600' },
          { label: 'Processing',   value: orders.filter(o => o.status === 'Processing').length, color: 'text-blue-600' },
          { label: 'Shipped',      value: orders.filter(o => o.status === 'Shipped').length, color: 'text-purple-600' },
          { label: 'RTO Losses',   value: orders.filter(o => o.status === 'RTO').length, color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-navy/10 rounded-xl p-3.5 shadow-sm">
            <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-navy/50 text-xs font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-navy/10 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-navy/[0.04] border border-navy/10 rounded-xl px-3 py-2 w-full md:w-64">
          <span className="text-navy/35 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search order ID, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-navy text-sm placeholder-navy/35 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                statusFilter === s ? 'bg-navy text-white shadow-sm' : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-navy/45 text-[11px] font-bold uppercase tracking-wider border-b border-navy/10">
                <th className="p-4"><input type="checkbox" className="accent-navy" /></th>
                <th className="p-4">Order ID &amp; Channel</th>
                <th className="p-4">Customer &amp; City</th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Net Profit</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                    density === 'compact' ? 'py-1.5' : 'py-3.5'
                  }`}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="accent-navy" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm"
                        style={{ background: o.platformColor || '#0EA5E9' }}
                      >
                        {o.platform}
                      </div>
                      <div>
                        <p className="font-bold text-navy text-xs group-hover:text-accent transition-colors">{o.id}</p>
                        <p className="text-[10px] text-navy/40">{o.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-navy text-xs">{o.customer}</p>
                    <p className="text-[10px] text-navy/50">{o.city}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-navy text-xs truncate max-w-[200px]">{o.product}</p>
                    <p className="text-[10px] font-mono text-navy/40">{o.sku} • Qty: {o.qty}</p>
                  </td>
                  <td className="p-4 font-bold text-navy text-xs">₹{o.amount?.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-bold text-xs">
                    <span className={o.netProfit > 0 ? 'text-emerald-600' : 'text-red-500'}>
                      {o.netProfit > 0 ? `+₹${o.netProfit}` : `-₹${Math.abs(o.netProfit)}`}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-xs font-semibold text-accent group-hover:underline">Inspect →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Slide-Over Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm flex justify-end" onClick={() => setSelectedOrder(null)}>
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 animate-slide-right text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-navy/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center text-white font-black text-[10px]"
                    style={{ background: selectedOrder.platformColor || '#0EA5E9' }}
                  >
                    {selectedOrder.platform}
                  </span>
                  <h2 className="text-lg font-bold text-navy">{selectedOrder.id}</h2>
                </div>
                <p className="text-xs text-navy/50 mt-0.5">Placed on {selectedOrder.platformName} • {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center text-navy font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Customer & Shipping Info */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-navy/5">
              <p className="text-xs font-bold text-navy uppercase tracking-wider">Shipping Address</p>
              <p className="text-sm font-semibold text-navy">{selectedOrder.customer}</p>
              <p className="text-xs text-navy/70">House #102, Green Park Avenue</p>
              <p className="text-xs text-navy/70">{selectedOrder.city} - 400001</p>
              <p className="text-xs text-navy/50 font-mono">📱 +91 98200 11223</p>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-navy uppercase tracking-wider">Order Items</p>
              <div className="flex items-center justify-between p-3 rounded-xl border border-navy/10 bg-white">
                <div>
                  <p className="font-semibold text-navy text-sm">{selectedOrder.product}</p>
                  <p className="text-xs font-mono text-navy/50">SKU: {selectedOrder.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy text-sm">₹{selectedOrder.amount}</p>
                  <p className="text-xs text-navy/50">Qty: {selectedOrder.qty}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-navy/10 space-y-2">
              <button className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-2.5 rounded-xl shadow-accent-sm text-sm transition-all flex items-center justify-center gap-2">
                <span>🏷️</span> Download Shipping Label PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
