"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const react_1 = require("react");
const Sidebar_1 = __importDefault(require("@/components/dashboard/Sidebar"));
const TopBar_1 = __importDefault(require("@/components/dashboard/TopBar"));
function DashboardLayout({ children }) {
    const [mobileOpen, setMobileOpen] = (0, react_1.useState)(false);
    return (<div className="flex h-screen bg-[#F4F6FA] font-outfit overflow-hidden">
      <Sidebar_1.default mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar_1.default onOpenMobile={() => setMobileOpen(true)}/>
        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {children}
        </main>
      </div>
    </div>);
}
//# sourceMappingURL=layout.js.map