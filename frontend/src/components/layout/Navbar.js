"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const react_1 = require("react");
const PRODUCT_MENU = [
    {
        group: 'RUN THE DAY',
        items: [
            { title: 'Agentic Order Processing', desc: '11-stage autonomous order workflow & daily batching', badge: 'LIVE', href: '#features' },
            { title: 'Auto PDF Label Cropper', desc: 'SKU & qty-wise label crop from uploaded PDF', badge: 'LIVE', href: '/labels' },
            { title: 'Stock & Inventory Sync', desc: 'Real-time multi-platform inventory buffer', badge: 'LIVE', href: '/inventory' },
        ],
    },
    {
        group: 'PROTECT THE MONEY',
        items: [
            { title: 'Payment Reconciliation', desc: 'Payout settlement to the rupee & fee leakage check', badge: 'LIVE', href: '/payments' },
            { title: 'VMS Video Proof Claims', desc: 'Pack-out & return video proof for damaged claims', badge: 'NEW', href: '/returns' },
            { title: 'Return & RTO Recovery', desc: 'Courier RTO tracking & reverse logistics claims', badge: 'LIVE', href: '/returns' },
        ],
    },
    {
        group: 'GROW THE BRAND',
        items: [
            { title: 'AI Catalog Studio', desc: 'Convert phone photos into studio-grade listings', badge: 'NEW', href: '#features' },
            { title: 'Per-Order Profit Waterfall', desc: 'Real net profit after fees, shipping, ads & COGS', badge: 'LIVE', href: '/profit' },
        ],
    },
];
const SOLUTIONS_MENU = [
    {
        group: 'BY MARKETPLACE',
        items: [
            { title: 'Amazon Sellers', desc: 'SP-API integration, FBA & MFN fulfillment', icon: '🅰️', href: '#platforms' },
            { title: 'Flipkart Sellers', desc: 'Smart fulfillment & settlement reconciliation', icon: '🅵', href: '#platforms' },
            { title: 'Meesho Sellers', desc: 'Zero commission order batching & RTO claims', icon: '🅼', href: '#platforms' },
            { title: 'Shopify Sellers', desc: 'Multi-location inventory sync & order flow', icon: '🅂', href: '#platforms' },
        ],
    },
    {
        group: 'BY SELLER CATEGORY',
        items: [
            { title: 'Apparel & Fashion', desc: 'Size-wise SKU shortlisted packing labels', icon: '👗', href: '#features' },
            { title: 'Footwear & Accessories', desc: 'Box serial packing & barcode validation', icon: '👟', href: '#features' },
            { title: 'D2C & E-Commerce Brands', desc: 'Unified multi-warehouse stock management', icon: '🚀', href: '#features' },
        ],
    },
];
const RESOURCES_MENU = [
    { title: 'Free Profit Calculator', desc: 'Calculate net seller margin after platform fees', icon: '🧮', href: '/profit' },
    { title: 'How It Works', desc: 'Step-by-step setup guide for new sellers', icon: '📖', href: '#faq' },
    { title: 'Marketplace Fee Guide 2026', desc: 'Amazon, Flipkart & Meesho commission charts', icon: '📄', href: '#faq' },
    { title: 'System Status', desc: 'Real-time API microservice health & worker latency', icon: '🟢', href: '/admin/system' },
];
function Navbar() {
    const [scrolled, setScrolled] = (0, react_1.useState)(false);
    const [activeDropdown, setActiveDropdown] = (0, react_1.useState)(null);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, react_1.useState)(false);
    const [mobileAccordion, setMobileAccordion] = (0, react_1.useState)(null);
    const navRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (<header ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-navy-md border-b border-white/10' : 'bg-navy/80 backdrop-blur-sm border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[88px]">

          {/* Brand Logo - Taller & Bolder */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-navy font-black text-xl tracking-tight">Z</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-black text-2xl tracking-tight">ZAIPIO</span>
              <span className="text-[11px] font-mono font-bold text-accent uppercase tracking-widest bg-accent/15 px-2 py-0.5 rounded-md border border-accent/30">
                OMS
              </span>
            </div>
          </a>

          {/* Desktop Nav Items - Larger Font & Padding */}
          <nav className="hidden md:flex items-center gap-3">

            {/* Product Mega Menu Trigger */}
            <div className="relative">
              <button onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-base font-bold transition-all ${activeDropdown === 'product' ? 'bg-white/15 text-white shadow-sm' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
                <span>Product</span>
                <span className={`text-xs transition-transform duration-200 ${activeDropdown === 'product' ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {/* Product Mega Dropdown */}
              {activeDropdown === 'product' && (<div className="absolute top-full left-0 mt-3 w-[760px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-fade-in z-50 text-left">
                  {PRODUCT_MENU.map((col) => (<div key={col.group} className="space-y-3">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">{col.group}</p>
                      <div className="space-y-2">
                        {col.items.map((item) => (<a key={item.title} href={item.href} onClick={() => setActiveDropdown(null)} className="block p-3 rounded-xl hover:bg-slate-800 transition-all group">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-xs group-hover:text-accent transition-colors">{item.title}</span>
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-accent/20 text-accent">{item.badge}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</p>
                          </a>))}
                      </div>
                    </div>))}
                </div>)}
            </div>

            {/* Solutions Dropdown Trigger */}
            <div className="relative">
              <button onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-base font-bold transition-all ${activeDropdown === 'solutions' ? 'bg-white/15 text-white shadow-sm' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
                <span>Solutions</span>
                <span className={`text-xs transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {/* Solutions Dropdown */}
              {activeDropdown === 'solutions' && (<div className="absolute top-full left-0 mt-3 w-[540px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 animate-fade-in z-50 text-left">
                  {SOLUTIONS_MENU.map((col) => (<div key={col.group} className="space-y-3">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">{col.group}</p>
                      <div className="space-y-2">
                        {col.items.map((item) => (<a key={item.title} href={item.href} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition-all group">
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <p className="font-bold text-white text-xs group-hover:text-accent transition-colors">{item.title}</p>
                              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                            </div>
                          </a>))}
                      </div>
                    </div>))}
                </div>)}
            </div>

            {/* Resources Dropdown Trigger */}
            <div className="relative">
              <button onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-base font-bold transition-all ${activeDropdown === 'resources' ? 'bg-white/15 text-white shadow-sm' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
                <span>Resources</span>
                <span className={`text-xs transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {/* Resources Dropdown */}
              {activeDropdown === 'resources' && (<div className="absolute top-full left-0 mt-3 w-[340px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-2 animate-fade-in z-50 text-left">
                  {RESOURCES_MENU.map((item) => (<a key={item.title} href={item.href} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition-all group">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-white text-xs group-hover:text-accent transition-colors">{item.title}</p>
                        <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                      </div>
                    </a>))}
                </div>)}
            </div>

            {/* Direct Links */}
            <a href="#pricing" className="px-4 py-2.5 text-white/90 hover:text-white text-base font-bold transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Right CTAs - Slightly Taller & Bolder */}
          <div className="hidden md:flex items-center gap-5">
            <a href="/login" className="text-white font-bold text-base hover:text-accent transition-colors">
              Log in
            </a>
            <a href="/signup" className="bg-gradient-to-r from-accent to-sky-600 text-white font-black text-sm px-6 py-3 rounded-xl shadow-[0_0_24px_rgba(14,165,233,0.5)] hover:brightness-110 hover:-translate-y-0.5 transition-all">
              Start Free →
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-xl bg-white/10 text-white font-bold text-xl">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Accordion Navigation */}
      {mobileMenuOpen && (<div className="md:hidden bg-slate-950 border-b border-slate-800 p-6 space-y-4 text-left max-h-[85vh] overflow-y-auto">

          {/* Product Accordion */}
          <div>
            <button onClick={() => setMobileAccordion(mobileAccordion === 'product' ? null : 'product')} className="flex items-center justify-between w-full text-white font-bold text-base py-2.5 border-b border-slate-800/80">
              <span>Product</span>
              <span className="text-xs">{mobileAccordion === 'product' ? '▲' : '▼'}</span>
            </button>
            {mobileAccordion === 'product' && (<div className="py-2 space-y-2 pl-3">
                {PRODUCT_MENU.flatMap(g => g.items).map((item) => (<a key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
                    <p className="text-xs font-bold text-accent">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </a>))}
              </div>)}
          </div>

          {/* Solutions Accordion */}
          <div>
            <button onClick={() => setMobileAccordion(mobileAccordion === 'solutions' ? null : 'solutions')} className="flex items-center justify-between w-full text-white font-bold text-base py-2.5 border-b border-slate-800/80">
              <span>Solutions</span>
              <span className="text-xs">{mobileAccordion === 'solutions' ? '▲' : '▼'}</span>
            </button>
            {mobileAccordion === 'solutions' && (<div className="py-2 space-y-2 pl-3">
                {SOLUTIONS_MENU.flatMap(g => g.items).map((item) => (<a key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
                    <p className="text-xs font-bold text-white">{item.icon} {item.title}</p>
                  </a>))}
              </div>)}
          </div>

          {/* Direct Pricing Link */}
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-white font-bold text-base py-2.5 border-b border-slate-800/80">
            Pricing
          </a>

          {/* Mobile Bottom Actions */}
          <div className="pt-3 flex flex-col gap-3">
            <a href="/login" className="text-center py-2.5 text-white font-bold text-sm rounded-xl bg-slate-900 border border-slate-800">Log in</a>
            <a href="/signup" className="text-center py-3 bg-accent text-white font-black text-sm rounded-xl shadow-accent">Start Free</a>
          </div>
        </div>)}
    </header>);
}
//# sourceMappingURL=Navbar.js.map