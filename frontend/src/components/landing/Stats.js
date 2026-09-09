"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stats;
const STATS = [
    { value: '50,000+', label: 'Labels Automated', sub: 'daily across all platforms' },
    { value: '₹2.3Cr+', label: 'Profit Tracked', sub: 'by sellers this month' },
    { value: '4', label: 'Platforms', sub: 'Amazon · Flipkart · Meesho · Shopify' },
    { value: '12:00', label: 'Labels Every Day', sub: 'auto-downloaded, on time' },
];
function Stats() {
    return (<section className="py-10 border-y border-navy/10 bg-navy/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((s, i) => (<div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-navy mb-1">{s.value}</p>
              <p className="text-sm font-bold text-navy/80 mb-0.5">{s.label}</p>
              <p className="text-xs text-navy/45">{s.sub}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=Stats.js.map