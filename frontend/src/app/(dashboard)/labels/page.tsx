'use client'

import { useState, useEffect } from 'react'
import { zaipioApi } from '@/lib/api-client'

const MOCK_LABELS = [
  { id: 'L001', orderId: '#AMZ-28471', platform: 'A', platformColor: '#FF9900', sku: 'SKU-0041', product: 'Cotton Kurti - Blue XL',       qty: 2, status: 'Ready',      downloadedAt: '08 Sep 12:00', pages: 1 },
  { id: 'L002', orderId: '#MSH-44712', platform: 'M', platformColor: '#9B1FE8', sku: 'SKU-0021', product: 'Printed Saree - Green',        qty: 1, status: 'Ready',      downloadedAt: '08 Sep 12:00', pages: 1 },
  { id: 'L003', orderId: '#AMZ-28469', platform: 'A', platformColor: '#FF9900', sku: 'SKU-0033', product: 'Yoga Mat - Purple',            qty: 1, status: 'Ready',      downloadedAt: '08 Sep 12:00', pages: 1 },
  { id: 'L004', orderId: '#SHO-77123', platform: 'S', platformColor: '#96BF48', sku: 'SKU-0064', product: 'Ceramic Coffee Mug',           qty: 3, status: 'Ready',      downloadedAt: '08 Sep 12:00', pages: 2 },
  { id: 'L005', orderId: '#SHO-77111', platform: 'S', platformColor: '#96BF48', sku: 'SKU-0039', product: 'Macramé Wall Hanging',         qty: 1, status: 'Ready',      downloadedAt: '08 Sep 12:00', pages: 1 },
  { id: 'L006', orderId: '#FLK-19284', platform: 'F', platformColor: '#2874F0', sku: 'SKU-0088', product: 'Steel Water Bottle 1L',        qty: 1, status: 'Pending',    downloadedAt: '—',            pages: 0 },
  { id: 'L007', orderId: '#FLK-19271', platform: 'F', platformColor: '#2874F0', sku: 'SKU-0091', product: 'Stainless Steel Lunch Box Set',qty: 1, status: 'Generating', downloadedAt: '—',            pages: 0 },
]

const STATUS_COLORS: Record<string, string> = {
  'Ready':      'text-green-700 bg-green-100',
  'Pending':    'text-amber-700 bg-amber-100',
  'Generating': 'text-blue-700 bg-blue-100',
  'Printed':    'text-navy/50 bg-navy/10',
}

export default function LabelsPage() {
  const [tab, setTab] = useState<'auto' | 'manual'>('auto')
  const [dragOver, setDragOver] = useState(false)
  const [labels, setLabels] = useState(MOCK_LABELS)
  const [apiConnected, setApiConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  
  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<any>(MOCK_LABELS[0])
  const [presetFormat, setPresetFormat] = useState<'4x6' | '2x1' | 'a4'>('4x6')
  const [sortOrder, setSortOrder] = useState('SKU')
  const [printSuccess, setPrintSuccess] = useState(false)

  useEffect(() => {
    fetchLabels()
  }, [])

  const fetchLabels = async () => {
    try {
      const res = await zaipioApi.getDailyLabelBatch()
      if (res.data && res.data.labels) {
        setLabels(res.data.labels)
      }
      setApiConnected(true)
    } catch {
      setApiConnected(false)
    }
  }

  const handleCropLabels = async () => {
    setLoading(true)
    try {
      await zaipioApi.cropLabelsPdf({ cropRatio: '1x2', sort: 'SKU' })
      setShowModal(true)
      setNotification('PDF Manifest Cropped! Opening Interactive Printer Modal...')
      setTimeout(() => setNotification(null), 4000)
    } catch {
      setShowModal(true)
      setNotification('Simulated PDF Crop Complete! Opening Preview Modal...')
      setTimeout(() => setNotification(null), 4000)
    } finally {
      setLoading(false)
    }
  }

  const handlePrintSubmit = () => {
    setPrintSuccess(true)
    setNotification(`🖨️ Printing ${ready} labels via Thermal Printer Engine...`)
    setTimeout(() => {
      setPrintSuccess(false)
      setShowModal(false)
      setNotification(null)
    }, 3000)
  }

  const ready = labels.filter(l => l.status === 'Ready').length

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 bg-navy text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <span>✨</span> {notification}
        </div>
      )}

      {/* Interactive Label Crop & Thermal Printer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-navy/15 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-up">
            {/* Modal Header */}
            <div className="bg-navy text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 border border-accent/40 rounded-xl flex items-center justify-center text-xl">
                  ✂️
                </div>
                <div>
                  <h3 className="font-black text-lg">Label Cropper & Thermal Printer Engine</h3>
                  <p className="text-white/60 text-xs">PDF Crop Ratio: {presetFormat.toUpperCase()} · Auto-Shortlisted by {sortOrder}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
              {/* Top Controls Grid */}
              <div className="bg-white p-4 rounded-2xl border border-navy/10 shadow-navy-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-navy/60 text-xs font-semibold mb-1">Print Layout Format</label>
                  <select 
                    value={presetFormat}
                    onChange={(e) => setPresetFormat(e.target.value as any)}
                    className="w-full border border-navy/20 rounded-xl px-3 py-2 text-navy text-xs font-medium outline-none focus:border-accent"
                  >
                    <option value="4x6">1 per page (Thermal 4×6 inch)</option>
                    <option value="2x1">2 per page (Stacked 4×4)</option>
                    <option value="a4">4 per page (A4 Standard Grid)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-navy/60 text-xs font-semibold mb-1">Sort Shortlist By</label>
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full border border-navy/20 rounded-xl px-3 py-2 text-navy text-xs font-medium outline-none focus:border-accent"
                  >
                    <option value="SKU">SKU Code (A → Z)</option>
                    <option value="QTY">Quantity (High → Low)</option>
                    <option value="PLATFORM">Marketplace Channel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-navy/60 text-xs font-semibold mb-1">Printer Target</label>
                  <select className="w-full border border-navy/20 rounded-xl px-3 py-2 text-navy text-xs font-medium outline-none focus:border-accent">
                    <option>🖨️ Zebra ZD421 (Thermal USB)</option>
                    <option>🖨️ TSC DA210 (Direct Thermal)</option>
                    <option>📄 Download High-Res PDF</option>
                  </select>
                </div>
              </div>

              {/* Main Preview Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Label Item Selector */}
                <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-navy/10 shadow-navy-sm space-y-2 max-h-[360px] overflow-y-auto">
                  <p className="text-navy/50 text-[11px] font-bold uppercase tracking-wider mb-2">Cropped Label Queue ({labels.length})</p>
                  {labels.map((l) => (
                    <div 
                      key={l.id}
                      onClick={() => setSelectedLabel(l)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedLabel?.id === l.id ? 'border-accent bg-accent/5 shadow-sm' : 'border-navy/10 bg-white hover:border-navy/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-black text-[10px]"
                          style={{ background: l.platformColor || '#072946' }}
                        >
                          {l.platform}
                        </div>
                        <div>
                          <p className="text-navy font-bold text-xs">{l.orderId}</p>
                          <p className="text-navy/40 text-[10px] truncate max-w-[140px]">{l.product}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-navy bg-navy/5 px-2 py-0.5 rounded-lg">
                        ×{l.qty}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right: Thermal Label Render Graphic */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-navy/10 shadow-navy-sm">
                  <p className="text-navy/50 text-[11px] font-bold uppercase tracking-wide mb-3">Live Thermal Print Preview (4×6 Thermal Paper)</p>
                  
                  {/* High Fidelity Thermal Shipping Label Graphic */}
                  <div className="w-full max-w-[320px] bg-amber-50/20 border-2 border-dashed border-navy/40 rounded-2xl p-5 shadow-lg space-y-4 font-mono text-navy text-xs">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b-2 border-navy pb-3">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-0.5 rounded text-white font-black text-xs"
                          style={{ background: selectedLabel?.platformColor || '#072946' }}
                        >
                          {selectedLabel?.platform === 'A' ? 'AMAZON' : selectedLabel?.platform === 'F' ? 'FLIPKART' : selectedLabel?.platform === 'M' ? 'MEESHO' : 'SHOPIFY'}
                        </span>
                        <span className="font-bold text-navy text-[10px]">EXPRESS PARCEL</span>
                      </div>
                      <span className="font-black text-sm">STD</span>
                    </div>

                    {/* Barcode Graphic */}
                    <div className="bg-white p-3 border border-navy/20 rounded-xl text-center">
                      <div className="h-10 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px)] w-full mb-1"></div>
                      <p className="text-[10px] font-bold tracking-widest">{selectedLabel?.orderId}-TRK-9821</p>
                    </div>

                    {/* Order & SKU Info */}
                    <div className="space-y-1 bg-navy/5 p-3 rounded-xl text-[11px]">
                      <p><strong className="text-navy">Order ID:</strong> {selectedLabel?.orderId}</p>
                      <p><strong className="text-navy">SKU Code:</strong> {selectedLabel?.sku}</p>
                      <p><strong className="text-navy">Product:</strong> {selectedLabel?.product}</p>
                      <p><strong className="text-navy">Quantity:</strong> {selectedLabel?.qty} Unit(s)</p>
                    </div>

                    {/* Shipping Address */}
                    <div className="border-t border-navy/20 pt-2 text-[10px] leading-relaxed">
                      <p className="font-bold text-navy uppercase text-[9px] mb-0.5">Ship To:</p>
                      <p className="font-bold text-navy">Aarav Sharma (+91 98200 11223)</p>
                      <p className="text-navy/70">Flat 402, Green Park Residency, Bandra West</p>
                      <p className="text-navy/70">Mumbai, Maharashtra - 400050</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 px-6 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="text-navy/60 hover:text-navy font-semibold text-xs px-4 py-2"
              >
                Close Preview
              </button>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setNotification('Downloading cropped thermal labels ZIP...')
                    setTimeout(() => setNotification(null), 3000)
                  }}
                  className="border border-navy/20 text-navy font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-navy/5 transition-all"
                >
                  📥 Save PDF Zip
                </button>
                <button 
                  onClick={handlePrintSubmit}
                  disabled={printSuccess}
                  className="bg-navy hover:bg-navy-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-navy-sm transition-all flex items-center gap-2"
                >
                  {printSuccess ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending to Printer...
                    </>
                  ) : (
                    <>
                      🖨️ Print All ({ready} Thermal Labels)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-navy">Labels Engine</h1>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${apiConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
              {apiConnected ? '🟢 Backend API Live (Port 4000)' : '🟡 Offline Standalone'}
            </span>
          </div>
          <p className="text-navy/50 text-sm">Auto-downloaded daily at 12:00 PM IST · Thermal 4×6 PDF Cropper Active</p>
        </div>
        <div className="flex gap-2">
          <button 
            id="labels-download-all" 
            onClick={() => {
              setShowModal(true)
              setNotification('Opening Cropper & Printer Modal...')
              setTimeout(() => setNotification(null), 3000)
            }}
            className="border border-navy/15 text-navy font-semibold text-xs px-4 py-2 rounded-xl hover:bg-navy/5 transition-all"
          >
            📥 Download All
          </button>
          <button 
            id="labels-print-all" 
            onClick={() => {
              setShowModal(true)
              setNotification(`Opening Printer Modal for ${ready} ready labels...`)
              setTimeout(() => setNotification(null), 3000)
            }}
            className="bg-navy text-white font-semibold text-xs px-4 py-2 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm"
          >
            🖨️ Print All ({ready} ready)
          </button>
        </div>
      </div>

      {/* Today's auto-download status */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow">
            ✅
          </div>
          <div>
            <p className="text-green-800 font-bold text-base">Today's labels downloaded — 08 Sep at 12:00 PM</p>
            <p className="text-green-700/70 text-sm mt-0.5">2,614 labels ready · 233 generating · Next run: Tomorrow 12:00 PM</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-green-800 font-black text-3xl">91.8%</p>
          <p className="text-green-700/60 text-xs font-semibold uppercase">Coverage rate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy/[0.05] p-1 rounded-xl w-fit">
        {[
          { id: 'auto',   label: '⚡ Auto-Downloaded' },
          { id: 'manual', label: '📤 Manual PDF Crop'   },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'auto' | 'manual')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? 'bg-white text-navy shadow-navy-sm' : 'text-navy/50 hover:text-navy'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'auto' && (
        <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-navy/[0.03] text-navy/45 text-[11px] font-bold uppercase tracking-wide border-b border-navy/10">
                  <th className="px-5 py-3.5 text-left">
                    <input type="checkbox" className="accent-navy" defaultChecked />
                  </th>
                  <th className="px-3 py-3.5 text-left">Order</th>
                  <th className="px-3 py-3.5 text-left">Product</th>
                  <th className="px-3 py-3.5 text-left hidden md:table-cell">Pages</th>
                  <th className="px-3 py-3.5 text-left hidden sm:table-cell">Downloaded</th>
                  <th className="px-5 py-3.5 text-left">Status</th>
                  <th className="px-5 py-3.5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/[0.05]">
                {labels.map((l) => (
                  <tr key={l.id} className="hover:bg-navy/[0.02] transition-colors group">
                    <td className="px-5 py-3.5">
                      <input type="checkbox" className="accent-navy" defaultChecked />
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center text-white font-black text-[9px] shrink-0"
                          style={{ background: l.platformColor || '#072946' }}
                        >
                          {l.platform}
                        </div>
                        <div>
                          <p className="text-navy font-bold text-xs">{l.orderId}</p>
                          <p className="text-navy/40 text-[10px]">{l.sku} · ×{l.qty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-navy text-xs font-medium truncate max-w-[160px]">{l.product}</p>
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      <span className="text-navy/55 text-xs">{l.pages || '—'} {l.pages === 1 ? 'page' : l.pages > 1 ? 'pages' : ''}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell">
                      <span className="text-navy/45 text-xs">{l.downloadedAt}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {l.status === 'Generating' ? (
                        <span className="flex items-center gap-1.5 text-blue-600 text-[10px] font-bold">
                          <span className="w-3 h-3 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                          Generating
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[l.status] || 'bg-slate-100 text-slate-700'}`}>
                          {l.status}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {l.status === 'Ready' && (
                          <>
                            <button 
                              id={`label-download-${l.id}`} 
                              onClick={() => {
                                setSelectedLabel(l)
                                setShowModal(true)
                              }}
                              className="text-[10px] font-semibold text-accent hover:underline"
                            >
                              Download
                            </button>
                            <span className="text-navy/20">·</span>
                            <button 
                              id={`label-print-${l.id}`} 
                              onClick={() => {
                                setSelectedLabel(l)
                                setShowModal(true)
                              }}
                              className="text-[10px] font-semibold text-navy/50 hover:text-navy"
                            >
                              Print
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'manual' && (
        <div className="space-y-4">
          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
              dragOver ? 'border-accent bg-accent/5' : 'border-navy/20 hover:border-navy/40 bg-white'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleCropLabels() }}
            onClick={() => handleCropLabels()}
            id="label-drop-zone"
          >
            <div className="text-4xl mb-3">{dragOver ? '📂' : '📤'}</div>
            <p className="text-navy font-bold text-base mb-1">Drop your marketplace PDF manifest here</p>
            <p className="text-navy/50 text-sm mb-4">Supports Amazon, Flipkart, Meesho & Shopify combined PDFs</p>
            <button className="bg-navy text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm">
              Choose PDF File
            </button>
            <input 
              id="label-file-input" 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={() => handleCropLabels()}
            />
          </div>

          {/* Crop settings */}
          <div className="bg-white border border-navy/10 rounded-2xl p-5 shadow-sm">
            <h3 className="text-navy font-bold text-sm mb-4">Crop & Shortlist Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-navy/60 text-xs font-semibold mb-1.5">Sort order</label>
                <select className="w-full border border-navy/20 rounded-xl px-3 py-2.5 text-navy text-sm outline-none focus:border-accent">
                  <option>SKU (A → Z)</option>
                  <option>Order Quantity (High → Low)</option>
                  <option>Platform</option>
                </select>
              </div>
              <div>
                <label className="block text-navy/60 text-xs font-semibold mb-1.5">Labels per page</label>
                <select className="w-full border border-navy/20 rounded-xl px-3 py-2.5 text-navy text-sm outline-none focus:border-accent">
                  <option>1 per page (Thermal 4x6)</option>
                  <option>2 per page</option>
                  <option>4 per page (A4)</option>
                </select>
              </div>
            </div>
            <button 
              disabled={loading}
              onClick={handleCropLabels}
              className="mt-4 bg-navy text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing & Cropping PDF...
                </>
              ) : (
                'Process & Crop Labels'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

