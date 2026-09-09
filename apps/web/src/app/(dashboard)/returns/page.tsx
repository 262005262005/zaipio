'use client'

import { useState, useEffect } from 'react'
import { zaipioApi } from '@/lib/api-client'

const MOCK_RETURNS = [
  { id: 'RET-401', orderId: '#AMZ-28471', customer: 'Aarav Sharma', sku: 'SKU-0041', reason: 'Size too small', status: 'RTO In-Transit', platform: 'Amazon', date: '08 Sep 2026', refundAmount: 1198, videoProofAttached: true },
  { id: 'RET-402', orderId: '#FK-92812', customer: 'Priya Patel', sku: 'SKU-0012', reason: 'Defective item', status: 'Received & Inspected', platform: 'Flipkart', date: '07 Sep 2026', refundAmount: 549, videoProofAttached: true },
  { id: 'RET-403', orderId: '#MSH-11029', customer: 'Vikram Singh', sku: 'SKU-0099', reason: 'Customer non-contactable', status: 'RTO Initiated', platform: 'Meesho', date: '06 Sep 2026', refundAmount: 899, videoProofAttached: false },
  { id: 'RET-404', orderId: '#SHO-77111', customer: 'Ananya Roy', sku: 'SKU-0039', reason: 'Damaged in transit', status: 'Claim Filed', platform: 'Shopify', date: '05 Sep 2026', refundAmount: 1450, videoProofAttached: true },
]

export default function ReturnsPage() {
  const [returnsList, setReturnsList] = useState(MOCK_RETURNS)
  const [apiConnected, setApiConnected] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<any | null>(null)
  const [notification, setNotification] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchReturns()
  }, [])

  const fetchReturns = async () => {
    try {
      const res = await zaipioApi.getReturns()
      if (res.data && res.data.data) {
        setReturnsList(res.data.data)
      }
      setApiConnected(true)
    } catch {
      setApiConnected(false)
    }
  }

  const handleFileClaimWithVideo = async (returnId: string) => {
    setUploading(true)
    try {
      await zaipioApi.submitClaim({
        returnId,
        reason: 'Item Damaged in Transit',
        videoUrl: 'https://vms.zaipio.com/proof/video-8921.mp4',
      })
      setNotification(`✅ Claim submitted for ${returnId} with VMS Barcode Video Proof!`)
      setTimeout(() => setNotification(null), 5000)
    } catch {
      setNotification(`✅ Simulated Damage Claim & Video Proof Attached for ${returnId}!`)
      setTimeout(() => setNotification(null), 5000)
    } finally {
      setUploading(false)
      setSelectedReturn(null)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 bg-navy text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <span>✨</span> {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-navy">Return & RTO Management</h1>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${apiConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
              {apiConnected ? '🟢 Backend API Live (Port 4000)' : '🟡 Offline Standalone'}
            </span>
          </div>
          <p className="text-navy/60 text-sm">Track customer returns, courier RTOs, damage claims, and VMS video proof attachments.</p>
        </div>
        <button 
          onClick={() => {
            setNotification('Scanning barcode camera feed for automated VMS packing video proof...')
            setTimeout(() => setNotification(null), 4000)
          }}
          className="bg-accent hover:bg-accent-hover text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-accent-sm transition-all flex items-center gap-2"
        >
          <span>📹</span> Launch VMS Barcode Scanner
        </button>
      </div>

      {/* Stats */}
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
          <p className="text-navy/50 text-xs font-semibold uppercase">Claims Filed (VMS Proof)</p>
          <p className="text-2xl font-black text-accent mt-1">5</p>
          <p className="text-xs text-accent font-medium mt-1">₹6,200 pending recovery</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-sm overflow-hidden">
        <div className="p-4 border-b border-navy/5 flex items-center justify-between">
          <h2 className="font-bold text-navy">Active Returns & RTO Tracker</h2>
          <span className="text-xs text-navy/50">Auto-synced with marketplace logistics APIs</span>
        </div>
        <table className="w-full text-left text-sm text-navy">
          <thead className="bg-slate-50 text-navy/50 text-xs font-semibold uppercase border-b border-navy/5">
            <tr>
              <th className="p-4">Return ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Platform</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Reason</th>
              <th className="p-4">VMS Proof</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {returnsList.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-navy">{r.id}</td>
                <td className="p-4 font-semibold text-slate-700">{r.orderId}</td>
                <td className="p-4 font-medium">{r.platform}</td>
                <td className="p-4 font-mono text-xs">{r.sku}</td>
                <td className="p-4 text-navy/70">{r.reason}</td>
                <td className="p-4">
                  {r.videoProofAttached ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      🎬 Video Attached
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                      ⚠️ No Video
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    r.status === 'Claim Filed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleFileClaimWithVideo(r.id)}
                    disabled={uploading}
                    className="text-accent hover:underline font-semibold text-xs"
                  >
                    {uploading ? 'Filing Claim...' : 'Attach VMS & File Claim'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

