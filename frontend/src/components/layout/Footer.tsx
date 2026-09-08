const LINKS = {
  Product: ['Features', 'Pricing', 'Platforms', 'Roadmap', 'Changelog'],
  Company:  ['About', 'Blog', 'Careers', 'Contact'],
  Support:  ['Help Center', 'Status', 'API Docs', 'Community'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Data Deletion', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <span className="text-navy font-black text-base">Z</span>
              </div>
              <span className="text-white font-black text-2xl tracking-tight">ZAIPIO</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-5">
              One dashboard for Indian e-commerce sellers — labels, stock, payments, and profit, unified.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-xs">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-white font-bold text-sm mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/45 hover:text-white text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-sm">
            © {new Date().getFullYear()} ZAIPIO. All rights reserved. Made with ❤️ for Indian sellers.
          </p>
          <div className="flex items-center gap-5">
            {['Amazon', 'Flipkart', 'Meesho', 'Shopify'].map((p) => (
              <span key={p} className="text-white/30 text-xs hover:text-white/60 cursor-pointer transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
