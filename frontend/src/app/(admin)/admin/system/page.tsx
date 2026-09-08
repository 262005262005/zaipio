'use client'

const API_ENDPOINTS = [
  { name: 'Amazon SP-API Orders Webhook', method: 'POST', endpoint: '/api/v1/webhooks/amazon/orders', latency: '24ms', successRate: '99.98%', status: 'Operational' },
  { name: 'Flipkart Order Fetch API', method: 'GET', endpoint: '/api/v1/integrations/flipkart/pull', latency: '65ms', successRate: '99.90%', status: 'Operational' },
  { name: 'Meesho Orders Polling Cron', method: 'GET', endpoint: '/api/v1/integrations/meesho/sync', latency: '210ms', successRate: '98.50%', status: 'Degraded' },
  { name: 'Shopify GraphQL Webhook', method: 'POST', endpoint: '/api/v1/webhooks/shopify/fulfillment', latency: '18ms', successRate: '100.00%', status: 'Operational' },
  { name: 'PDF Label Cropper microservice', method: 'POST', endpoint: '/api/v1/labels/crop', latency: '14ms', successRate: '100.00%', status: 'Operational' },
]

export default function AdminSystemHealthPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace API & Worker Health</h1>
          <p className="text-slate-400 text-sm">Monitor API endpoints, rate limits, webhook listener queues, and PDF processing engine.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700">
          🔄 Ping All Microservices
        </button>
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-white text-sm">Marketplace Integrations Status</h2>
          <span className="text-xs text-slate-500">Auto-refreshed every 10s</span>
        </div>
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900 text-slate-500 text-xs font-semibold uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Integration Service</th>
              <th className="p-4">Method & Endpoint</th>
              <th className="p-4 text-center">Avg Latency</th>
              <th className="p-4 text-center">24h Success Rate</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {API_ENDPOINTS.map((api) => (
              <tr key={api.name} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-4 font-bold text-white">{api.name}</td>
                <td className="p-4 font-mono text-xs text-slate-400">
                  <span className="text-red-400 font-bold mr-2">{api.method}</span>
                  {api.endpoint}
                </td>
                <td className="p-4 text-center font-semibold text-slate-200">{api.latency}</td>
                <td className="p-4 text-center font-black text-emerald-400">{api.successRate}</td>
                <td className="p-4 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    api.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400 animate-pulse'
                  }`}>
                    {api.status}
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
