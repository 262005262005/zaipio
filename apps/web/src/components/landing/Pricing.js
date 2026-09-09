"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pricing;
const react_1 = require("react");
const TIERS = [
    {
        name: 'Free',
        price: '₹0',
        period: 'forever',
        desc: 'Try ZAIPIO risk-free.',
        cta: 'Get Started Free',
        ctaStyle: 'border-2 border-navy/20 text-navy hover:bg-navy/5',
        popular: false,
        features: [
            '1 platform connection',
            'Manual label upload & crop',
            'Up to 50 orders / month',
            'Basic order list view',
            'No data export',
        ],
        missing: ['Auto label download', 'Stock sync', 'Profit calculator', 'WhatsApp alerts'],
    },
    {
        name: 'Starter',
        price: '₹999',
        period: '/month',
        desc: 'For sellers getting serious.',
        cta: 'Start Starter',
        ctaStyle: 'border-2 border-navy/20 text-navy hover:bg-navy/5',
        popular: false,
        features: [
            '1–2 platforms connected',
            'Auto label crop + SKU shortlist',
            'Auto label download at 12:00 PM',
            '1-way stock sync',
            'Low-stock email alerts',
            'Monthly Excel export',
        ],
        missing: ['Profit calculator', 'WhatsApp alerts', 'Payment dashboard'],
    },
    {
        name: 'Growth',
        price: '₹2,999',
        period: '/month',
        desc: 'For sellers scaling up.',
        cta: 'Start Growth',
        ctaStyle: 'bg-white text-navy font-bold hover:bg-navy-50',
        popular: true,
        features: [
            'All platforms (unlimited)',
            '2-way real-time stock sync',
            'Payment & settlement dashboard',
            'Profit calculator per order',
            'Returns & RTO tracker',
            'WhatsApp + Telegram alerts',
            'Courier tracking integration',
            'GST invoice auto-generation',
            'PDF + Excel reports (any range)',
        ],
        missing: [],
    },
    {
        name: 'Pro',
        price: '₹6,999',
        period: '/month',
        desc: 'For agencies & power sellers.',
        cta: 'Contact Sales',
        ctaStyle: 'border-2 border-navy/20 text-navy hover:bg-navy/5',
        popular: false,
        features: [
            'Everything in Growth',
            'Multi-account / multi-brand',
            'Ad spend tracker + ROAS',
            'Bulk repricing tool',
            'Team roles & permissions',
            'API access for integrations',
            'White-label reports',
            'Priority support + onboarding',
        ],
        missing: [],
    },
];
function Pricing() {
    const [annual, setAnnual] = (0, react_1.useState)(false);
    return (<section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="pill bg-green-50 text-green-700 border border-green-200 mb-4">
            💳 Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mt-4 mb-4">
            Pay only for what you need.
          </h2>
          <p className="text-navy/55 text-lg max-w-lg mx-auto mb-8">
            Start free. Upgrade when your business grows.
            No lock-in, cancel anytime.
          </p>

          {/* Annual toggle */}
          <div className="inline-flex items-center gap-3 bg-navy/5 rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-white text-navy shadow-navy-sm' : 'text-navy/50'}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? 'bg-white text-navy shadow-navy-sm' : 'text-navy/50'}`}>
              Annual <span className="text-green-600 font-bold">−20%</span>
            </button>
          </div>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {TIERS.map((t) => (<div key={t.name} className={`rounded-2xl border p-6 transition-all ${t.popular
                ? 'pricing-popular shadow-navy-lg'
                : 'bg-white border-navy/10 hover:shadow-navy-md hover:-translate-y-0.5'}`}>
              {t.popular && (<div className="text-center mb-4">
                  <span className="text-[11px] font-black bg-accent text-white px-3 py-1 rounded-full tracking-wide">
                    MOST POPULAR
                  </span>
                </div>)}

              <p className={`font-black text-xl mb-1 ${t.popular ? 'text-white' : 'text-navy'}`}>{t.name}</p>
              <div className="flex items-end gap-1 mb-1">
                <span className={`font-black text-4xl ${t.popular ? 'text-white' : 'text-navy'}`}>
                  {annual && t.price !== '₹0'
                ? `₹${Math.round(parseInt(t.price.replace('₹', '').replace(',', '')) * 0.8).toLocaleString('en-IN')}`
                : t.price}
                </span>
                <span className={`text-sm mb-1 ${t.popular ? 'text-white/60' : 'text-navy/50'}`}>{t.period}</span>
              </div>
              <p className={`text-sm mb-5 ${t.popular ? 'text-white/65' : 'text-navy/55'}`}>{t.desc}</p>

              <a href="#" className={`block text-center py-3 rounded-xl font-bold text-sm mb-6 transition-all ${t.popular
                ? t.ctaStyle
                : t.ctaStyle}`}>
                {t.cta}
              </a>

              <ul className="space-y-2">
                {t.features.map((f) => (<li key={f} className={`flex items-start gap-2 text-sm ${t.popular ? 'text-white/85' : 'text-navy/70'}`}>
                    <span className={`mt-0.5 shrink-0 text-xs w-4 h-4 rounded-full flex items-center justify-center ${t.popular ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>✓</span>
                    {f}
                  </li>))}
                {t.missing.map((f) => (<li key={f} className={`flex items-start gap-2 text-sm ${t.popular ? 'text-white/30' : 'text-navy/25'}`}>
                    <span className="mt-0.5 shrink-0 text-xs">✕</span>
                    {f}
                  </li>))}
              </ul>
            </div>))}
        </div>

        <p className="text-center text-navy/40 text-sm mt-10">
          Prices are directional — subject to revision based on seller feedback · GST extra · Cancel anytime
        </p>
      </div>
    </section>);
}
//# sourceMappingURL=Pricing.js.map