'use client'

import { useState } from 'react'

const INVENTORY = [
  { id: 'INV-001', sku: 'SKU-0041', name: 'Cotton Kurti - Blue XL', category: 'Apparel', totalStock: 45, amazon: 15, flipkart: 12, meesho: 10, shopify: 8, minAlert: 20, status: 'In Stock', lastUpdated: '10 mins ago' },
  { id: 'INV-002', sku: 'SKU-0012', name: 'Silk Saree - Red Gold', category: 'Apparel', totalStock: 3, amazon: 1, flipkart: 1, meesho: 1, shopify: 0, minAlert: 10, status: 'Critical', lastUpdated: 'Just now' },
  { id: 'INV-003', sku: 'SKU-0099', name: 'Denim Jacket - M Black', category: 'Apparel', totalStock: 8, amazon: 3, flipkart: 2, meesho: 1, shopify: 2, minAlert: 15, status: 'Low Stock', lastUpdated: '25 mins ago' },
  { id: 'INV-004', sku: 'SKU-0104', name: 'Leather Belt - Brown 34', category: 'Accessories', totalStock: 120, amazon: 40, flipkart: 35, meesho: 25, shopify: 20, minAlert: 30, status: 'In Stock', lastUpdated: '1 hr ago' },
  { id: 'INV-005', sku: 'SKU-0210', name: 'Wireless Earbuds TWS', category: 'Electronics', totalStock: 0, amazon: 0, flipkart: 0, meesho: 0, shopify: 0, minAlert: 25, status: 'Out of Stock', lastUpdated: '2 hrs ago' },
]

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = INVENTORY.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase())
    if (filter === 'All') return matchesSearch
    if (filter === 'Critical/Low') return matchesSearch && (item.status === 'Critical' || item.status === 'Low Stock' || item.status === 'Out of Stock')
    return matchesSearch && item.status === filter
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Inventory & Stock Sync</h1>
          <p className="text-navy/60 text-sm">Real-time stock synchronization across Amazon, Flipkart, Meesho & Shopify.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-navy/5 hover:bg-navy/10 text-navy font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2">
            <span>🔄</span> Sync All Now
          </button>
          <button className="bg-accent hover:bg-accent-hover text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-accent-sm transition-all flex items-center gap-2">
            <span>+</span> Add Stock
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Total SKUs Tracked</p>
          <p className="text-2xl font-black text-navy mt-1">1,248</p>
          <p className="text-xs text-green-600 font-medium mt-1">✓ Sync active across 4 channels</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">In Stock</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">1,180</p>
          <p className="text-xs text-navy/40 mt-1">Healthy buffer levels</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Low / Critical Stock</p>
          <p className="text-2xl font-black text-amber-500 mt-1">42</p>
          <p className="text-xs text-amber-600 font-medium mt-1">⚠️ Action required</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-navy-sm">
          <p className="text-navy/50 text-xs font-semibold uppercase">Out of Stock</p>
          <p className="text-2xl font-black text-red-500 mt-1">26</p>
          <p className="text-xs text-red-500 font-medium mt-1">Auto-delisted on marketplaces</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-navy/5 shadow-navy-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by SKU name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-navy/10 rounded-xl px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Critical/Low', 'In Stock', 'Out of Stock'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filter === t ? 'bg-navy text-white shadow-sm' : 'bg-slate-100 text-navy/60 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-sm overflow-hidden">
        <table className="w-full text-left text-sm text-navy">
          <thead className="bg-slate-50 text-navy/50 text-xs font-semibold uppercase border-b border-navy/5">
            <tr>
              <th className="p-4">SKU / Product</th>
              <th className="p-4 text-center">Total Stock</th>
              <th className="p-4 text-center">Amazon</th>
              <th className="p-4 text-center">Flipkart</th>
              <th className="p-4 text-center">Meesho</th>
              <th className="p-4 text-center">Shopify</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-navy">{item.name}</p>
                  <p className="text-xs font-mono text-navy/50">{item.sku} • {item.category}</p>
                </td>
                <td className="p-4 text-center font-black text-navy text-base">{item.totalStock}</td>
                <td className="p-4 text-center font-semibold text-slate-600">{item.amazon}</td>
                <td className="p-4 text-center font-semibold text-slate-600">{item.flipkart}</td>
                <td className="p-4 text-center font-semibold text-slate-600">{item.meesho}</td>
                <td className="p-4 text-center font-semibold text-slate-600">{item.shopify}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                    item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                    item.status === 'Critical' ? 'bg-orange-100 text-orange-700 animate-pulse' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-accent hover:underline font-semibold text-xs">Edit Buffer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
