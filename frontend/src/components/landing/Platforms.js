"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Platforms;
const PLATFORMS = [
    {
        name: 'Amazon',
        color: '#FF9900',
        bg: '#FFF8ED',
        letter: 'A',
        apis: ['Orders API', 'Reports API', 'FBA Inventory', 'Catalog API'],
        status: 'Full Integration',
        statusColor: 'text-green-600 bg-green-50',
        desc: 'Connect via SP-API OAuth 2.0. Auto-pull orders, settlements, and FBA inventory on schedule.',
    },
    {
        name: 'Flipkart',
        color: '#2874F0',
        bg: '#EFF4FF',
        letter: 'F',
        apis: ['Orders API', 'Listings API', 'Returns API', 'Shipments API'],
        status: 'Full Integration',
        statusColor: 'text-green-600 bg-green-50',
        desc: 'Connect via Marketplace API. Sync orders, listings, and shipment status in real time.',
    },
    {
        name: 'Meesho',
        color: '#9B1FE8',
        bg: '#F5EDFF',
        letter: 'M',
        apis: ['Order API', 'Inventory API', 'Returns API', 'CSV Fallback'],
        status: 'Hybrid (API + CSV)',
        statusColor: 'text-amber-600 bg-amber-50',
        desc: 'API + CSV hybrid support. Limited API coverage is handled gracefully with CSV import/export fallback.',
    },
    {
        name: 'Shopify',
        color: '#96BF48',
        bg: '#F3F9EA',
        letter: 'S',
        apis: ['Orders API', 'Inventory API', 'Fulfillments API', 'Payouts API'],
        status: 'Full Integration',
        statusColor: 'text-green-600 bg-green-50',
        desc: 'Easiest setup — install via OAuth in 2 clicks. Best documented and most reliable integration.',
    },
];
function Platforms() {
    return (<section id="platforms" className="py-24 bg-navy/[0.02] border-y border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="pill bg-navy/10 text-navy border border-navy/20 mb-4">
            🔌 Platform Integrations
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mt-4 mb-4">
            Connect everything in minutes.
          </h2>
          <p className="text-navy/55 text-lg max-w-xl mx-auto">
            One OAuth wizard. Tokens stored encrypted. Data normalized into a single unified schema.
          </p>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p) => (<div key={p.name} className="bg-white rounded-2xl border border-navy/10 p-6 hover:shadow-navy-md hover:-translate-y-1 transition-all group">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-sm group-hover:scale-105 transition-transform" style={{ background: p.color }}>
                  {p.letter}
                </div>
                <div>
                  <p className="text-navy font-black text-lg leading-none">{p.name}</p>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${p.statusColor}`}>
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-navy/60 text-sm leading-relaxed mb-4">{p.desc}</p>

              {/* API tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.apis.map((api) => (<span key={api} className="text-[10px] font-semibold px-2 py-1 rounded-lg border border-navy/10 text-navy/60" style={{ background: p.bg }}>
                    {api}
                  </span>))}
              </div>
            </div>))}
        </div>

        {/* Architecture note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-navy/10 rounded-full px-5 py-2.5 text-sm text-navy/60 shadow-navy-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"/>
            Adapter pattern — one platform's API change never breaks another
          </div>
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=Platforms.js.map