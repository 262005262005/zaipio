"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLayout;
const AdminSidebar_1 = __importDefault(require("@/components/admin/AdminSidebar"));
const AdminHeader_1 = __importDefault(require("@/components/admin/AdminHeader"));
function AdminLayout({ children }) {
    return (<div className="flex h-screen bg-slate-900 text-slate-100 font-outfit overflow-hidden">
      <AdminSidebar_1.default />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader_1.default />
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {children}
        </main>
      </div>
    </div>);
}
//# sourceMappingURL=layout.js.map