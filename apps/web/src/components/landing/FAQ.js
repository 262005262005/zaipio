"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FAQ;
const react_1 = require("react");
const FAQS = [
    {
        q: 'Is my Amazon / Flipkart / Shopify data safe?',
        a: 'Yes. All API tokens and credentials are encrypted at rest using AES-256 before storage. We never store plain-text keys. ZAIPIO\'s security and compliance practices are reviewed during Amazon SP-API and Flipkart partner approval.',
    },
    {
        q: 'How does the 12:00 label auto-download work?',
        a: 'ZAIPIO runs a scheduled job every day at 12:00 PM IST that fetches pending order labels from all connected platforms, crops them by SKU and quantity, and makes them available instantly. You get a WhatsApp notification when labels are ready.',
    },
    {
        q: 'What if a platform\'s API is down or rate-limited?',
        a: 'All sync jobs are queued via BullMQ and retried automatically with exponential backoff. You\'ll see a sync error banner on your dashboard with exact timestamps, and receive an alert notification.',
    },
    {
        q: 'Can my packer see financial data?',
        a: 'No. The Pro tier\'s team roles system restricts access by role. Packers only see today\'s orders and labels. Accountants only see payments and reports. Admins/owners see everything.',
    },
    {
        q: 'Does ZAIPIO support Meesho fully?',
        a: 'Meesho\'s API program is the most restricted. ZAIPIO uses a hybrid approach — API where available, plus a CSV import/export fallback to cover gaps. As Meesho\'s API expands, we\'ll update automatically.',
    },
    {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes. Cancel from your billing dashboard anytime. You keep access until the end of your current billing period. No lock-in contracts.',
    },
    {
        q: 'How long does onboarding take?',
        a: 'Most sellers connect their first platform (Shopify is fastest) in under 5 minutes via our 2-click OAuth wizard. Connecting all 4 platforms typically takes 15–20 minutes.',
    },
];
function FAQ() {
    const [open, setOpen] = (0, react_1.useState)(0);
    return (<section id="faq" className="py-24 bg-navy/[0.02] border-t border-navy/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="pill bg-navy/10 text-navy border border-navy/20 mb-4">❓ FAQ</span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mt-4 mb-4">
            Questions answered.
          </h2>
          <p className="text-navy/55 text-lg">
            Still have one? Email us at{' '}
            <a href="mailto:support@zaipio.com" className="text-accent font-semibold hover:underline">
              support@zaipio.com
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (<div key={i} className="bg-white rounded-2xl border border-navy/10 overflow-hidden hover:border-navy/20 transition-colors">
              <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-navy font-bold text-base pr-4">{faq.q}</span>
                <span className={`text-navy/40 text-xl font-light shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              {open === i && (<div className="px-6 pb-5">
                  <p className="text-navy/65 text-sm leading-relaxed">{faq.a}</p>
                </div>)}
            </div>))}
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=FAQ.js.map