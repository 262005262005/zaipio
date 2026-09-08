// Inline mini bar chart — no external library needed
const BAR_DATA = [
  { day: 'Mon', orders: 187, labels: 174 },
  { day: 'Tue', orders: 234, labels: 221 },
  { day: 'Wed', orders: 198, labels: 190 },
  { day: 'Thu', orders: 312, labels: 295 },
  { day: 'Fri', orders: 278, labels: 261 },
  { day: 'Sat', orders: 401, labels: 388 },
  { day: 'Sun', orders: 357, labels: 341 },
]

const MAX = Math.max(...BAR_DATA.map((d) => d.orders))

const STAT_CARDS = [
  {
    id: 'orders-today',
    label: "Today's Orders",
    value: '2,847',
    change: '+12% vs yesterday',
    up: true,
    icon: '📦',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    id: 'labels-ready',
    label: 'Labels Ready',
    value: '2,614',
    change: '91.8% coverage',
    up: true,
    icon: '🏷️',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    id: 'low-stock',
    label: 'Low Stock SKUs',
    value: '7',
    change: '3 critical (< 5 units)',
    up: false,
    icon: '⚠️',
    color: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    id: 'net-revenue',
    label: "Today's Revenue",
    value: '₹3.42L',
    change: '+₹28K vs yesterday',
    up: true,
    icon: '💰',
    color: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-100',
  },
]

const RECENT_ORDERS = [
  { id: '#AMZ-28471', platform: 'A', platformColor: '#FF9900', sku: 'SKU-0041', product: 'Cotton Kurti - Blue XL', qty: 2, amount: '₹1,198', status: 'Label Ready',  statusColor: 'text-green-700 bg-green-100' },
  { id: '#FLK-19284', platform: 'F', platformColor: '#2874F0', sku: 'SKU-0088', product: 'Steel Water Bottle 1L', qty: 1, amount: '₹549',   status: 'Processing',  statusColor: 'text-blue-700 bg-blue-100' },
  { id: '#MSH-44712', platform: 'M', platformColor: '#9B1FE8', sku: 'SKU-0021', product: 'Printed Saree - Green', qty: 1, amount: '₹899',   status: 'Label Ready',  statusColor: 'text-green-700 bg-green-100' },
  { id: '#SHO-77123', platform: 'S', platformColor: '#96BF48', sku: 'SKU-0064', product: 'Ceramic Coffee Mug',   qty: 3, amount: '₹1,047', status: 'Shipped',     statusColor: 'text-purple-700 bg-purple-100' },
  { id: '#AMZ-28469', platform: 'A', platformColor: '#FF9900', sku: 'SKU-0033', product: 'Yoga Mat - Purple',    qty: 1, amount: '₹799',   status: 'Label Ready',  statusColor: 'text-green-700 bg-green-100' },
  { id: '#FLK-19280', platform: 'F', platformColor: '#2874F0', sku: 'SKU-0055', product: 'LED Desk Lamp',        qty: 1, amount: '₹1,299', status: 'RTO',          statusColor: 'text-red-700 bg-red-100' },
]

const LOW_STOCK = [
  { sku: 'SKU-0012', name: 'Floral Kurta - Red M',     stock: 3,  platform: 'Amazon + Flipkart', critical: true },
  { sku: 'SKU-0044', name: 'Stainless Steel Dabba',     stock: 4,  platform: 'Meesho',            critical: true },
  { sku: 'SKU-0071', name: 'Casual Sneakers - Size 8',  stock: 2,  platform: 'Shopify',           critical: true },
  { sku: 'SKU-0029', name: 'Bamboo Toothbrush Set',     stock: 8,  platform: 'All platforms',     critical: false },
  { sku: 'SKU-0083', name: 'Brass Diya Set (6 pcs)',    stock: 9,  platform: 'Amazon',            critical: false },
]

const PLATFORM_SYNC = [
  { letter: 'A', name: 'Amazon',   color: '#FF9900', status: 'Synced', time: '3 min ago', ok: true },
  { letter: 'F', name: 'Flipkart', color: '#2874F0', status: 'Synced', time: '3 min ago', ok: true },
  { letter: 'M', name: 'Meesho',   color: '#9B1FE8', status: 'Error',  time: 'Retry in 2m', ok: false },
  { letter: 'S', name: 'Shopify',  color: '#96BF48', status: 'Synced', time: '1 min ago', ok: true },
]

export default function DashboardHome() {
  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy">Good morning, Rohan 👋</h1>
          <p className="text-navy/50 text-sm mt-0.5">Monday, 8 Sep 2026 · Labels auto-downloading at 12:00 PM</p>
        </div>
        <div className="flex gap-2">
          <button id="dash-export" className="border border-navy/15 text-navy font-semibold text-xs px-4 py-2 rounded-xl hover:bg-navy/5 transition-all">
            Export Report
          </button>
          <button id="dash-sync" className="bg-navy text-white font-semibold text-xs px-4 py-2 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Sync Now
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.id} id={card.id} className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-navy-sm transition-all ${card.color}`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${card.iconBg}`}>
                {card.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.up ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                {card.up ? '↑' : '↓'}
              </span>
            </div>
            <p className="text-navy/55 text-xs font-medium mb-1">{card.label}</p>
            <p className="text-navy font-black text-2xl mb-1">{card.value}</p>
            <p className={`text-xs font-medium ${card.up ? 'text-green-700' : 'text-amber-700'}`}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* ── Main Grid: Chart + Platform Sync ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Orders Chart (col-span-2) */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-navy/10 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-navy font-bold text-base">Orders This Week</h2>
              <p className="text-navy/45 text-xs mt-0.5">Orders vs Labels coverage</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-navy/60">
                <span className="w-3 h-1.5 rounded-full bg-navy inline-block" />Orders
              </span>
              <span className="flex items-center gap-1.5 text-navy/60">
                <span className="w-3 h-1.5 rounded-full bg-accent inline-block" />Labels
              </span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-3 h-48">
            {BAR_DATA.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex gap-1 items-end" style={{ height: `${(d.orders / MAX) * 100}%` }}>
                  {/* Orders bar */}
                  <div
                    className="flex-1 bg-navy rounded-t-lg hover:bg-navy-700 transition-colors relative group"
                    style={{ height: '100%' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {d.orders} orders
                    </div>
                  </div>
                  {/* Labels bar */}
                  <div
                    className="flex-1 bg-accent/70 rounded-t-lg hover:bg-accent transition-colors"
                    style={{ height: `${(d.labels / d.orders) * 100}%` }}
                  />
                </div>
                <span className="text-navy/40 text-[10px] font-medium">{d.day}</span>
              </div>
            ))}
          </div>

          {/* Totals row */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-navy/10">
            <div>
              <p className="text-navy/45 text-xs">Total Orders</p>
              <p className="text-navy font-black text-lg">{BAR_DATA.reduce((s, d) => s + d.orders, 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-navy/45 text-xs">Labels Covered</p>
              <p className="text-navy font-black text-lg">{BAR_DATA.reduce((s, d) => s + d.labels, 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-navy/45 text-xs">Coverage Rate</p>
              <p className="text-green-600 font-black text-lg">95.2%</p>
            </div>
          </div>
        </div>

        {/* Platform Sync Status */}
        <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm">
          <h2 className="text-navy font-bold text-base mb-4">Platform Status</h2>
          <div className="space-y-3">
            {PLATFORM_SYNC.map((p) => (
              <div key={p.name} className="flex items-center justify-between p-3 rounded-xl bg-navy/[0.03] border border-navy/[0.07]">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
                    style={{ background: p.color, opacity: p.ok ? 1 : 0.55 }}
                  >
                    {p.letter}
                  </div>
                  <div>
                    <p className="text-navy font-semibold text-sm">{p.name}</p>
                    <p className="text-navy/40 text-xs">{p.time}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.ok ? 'text-green-700 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                  {p.ok ? '✓ ' : '⚠ '}{p.status}
                </span>
              </div>
            ))}
          </div>
          <button id="dash-reconnect-meesho" className="w-full mt-4 border border-red-200 text-red-600 font-semibold text-xs py-2.5 rounded-xl hover:bg-red-50 transition-all">
            Reconnect Meesho →
          </button>
        </div>
      </div>

      {/* ── Bottom Grid: Recent Orders + Low Stock ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Recent Orders (col-span-2) */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
            <h2 className="text-navy font-bold text-base">Recent Orders</h2>
            <a href="/orders" className="text-accent text-xs font-semibold hover:underline">View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-navy/[0.03] text-navy/45 text-[11px] font-bold uppercase tracking-wide">
                  <th className="px-5 py-3 text-left">Order ID</th>
                  <th className="px-3 py-3 text-left">Product</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Qty</th>
                  <th className="px-3 py-3 text-left hidden sm:table-cell">Amount</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/[0.06]">
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="hover:bg-navy/[0.02] transition-colors group cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center text-white font-black text-[9px] shrink-0"
                          style={{ background: o.platformColor }}
                        >
                          {o.platform}
                        </div>
                        <span className="text-navy font-bold text-xs">{o.id}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-navy text-xs font-medium truncate max-w-[160px]">{o.product}</p>
                      <p className="text-navy/40 text-[10px]">{o.sku}</p>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="text-navy/70 text-xs font-medium">×{o.qty}</span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="text-navy font-bold text-xs">{o.amount}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${o.statusColor}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
            <div className="flex items-center gap-2">
              <h2 className="text-navy font-bold text-base">Low Stock</h2>
              <span className="text-xs font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full">3 critical</span>
            </div>
            <a href="/inventory" className="text-accent text-xs font-semibold hover:underline">View all →</a>
          </div>
          <div className="divide-y divide-navy/[0.06]">
            {LOW_STOCK.map((item) => (
              <div key={item.sku} className="px-5 py-3 hover:bg-navy/[0.02] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-navy font-semibold text-xs truncate">{item.name}</p>
                    <p className="text-navy/40 text-[10px] mt-0.5">{item.sku} · {item.platform}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-black text-sm ${item.critical ? 'text-red-600' : 'text-amber-600'}`}>
                      {item.stock}
                    </p>
                    <p className="text-navy/35 text-[10px]">units</p>
                  </div>
                </div>
                {item.critical && (
                  <div className="mt-1.5 h-1 rounded-full bg-red-100 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${(item.stock / 10) * 100}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-navy/10">
            <button id="dash-send-stock-alert" className="w-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold text-xs py-2.5 rounded-xl hover:bg-amber-100 transition-all">
              📱 Send WhatsApp Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
