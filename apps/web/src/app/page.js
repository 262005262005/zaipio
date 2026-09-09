"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
const Navbar_1 = __importDefault(require("@/components/layout/Navbar"));
const Footer_1 = __importDefault(require("@/components/layout/Footer"));
const Hero_1 = __importDefault(require("@/components/landing/Hero"));
const Stats_1 = __importDefault(require("@/components/landing/Stats"));
const Problems_1 = __importDefault(require("@/components/landing/Problems"));
const Features_1 = __importDefault(require("@/components/landing/Features"));
const Platforms_1 = __importDefault(require("@/components/landing/Platforms"));
const Pricing_1 = __importDefault(require("@/components/landing/Pricing"));
const FAQ_1 = __importDefault(require("@/components/landing/FAQ"));
const CTA_1 = __importDefault(require("@/components/landing/CTA"));
function LandingPage() {
    return (<main className="min-h-screen font-outfit">
      <Navbar_1.default />
      <Hero_1.default />
      <Stats_1.default />
      <Problems_1.default />
      <Features_1.default />
      <Platforms_1.default />
      <Pricing_1.default />
      <FAQ_1.default />
      <CTA_1.default />
      <Footer_1.default />
    </main>);
}
//# sourceMappingURL=page.js.map