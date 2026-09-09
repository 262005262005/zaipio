"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonAdapter = void 0;
// ============================================================
// ZAIPIO — Amazon SP-API Adapter (stub)
// Apply for approval on Day 1 — takes 1-2 weeks
// ============================================================
const platform_adapter_1 = require("../base/platform.adapter");
class AmazonAdapter extends platform_adapter_1.BasePlatformAdapter {
    platform = 'amazon';
    // TODO: Implement using amazon-sp-api npm package
    // Key APIs: Orders API, Reports API, Catalog API, FBA Inventory API
    // Auth: OAuth 2.0 via Login with Amazon + SP-API app registration
    // NOTE: Use async Reports API over live polling — rate limits are strict
    async fetchOrders(credentials, since) {
        throw new Error('Amazon adapter not yet implemented — apply for SP-API access first');
    }
    async fetchInventory(credentials) {
        throw new Error('Amazon adapter not yet implemented');
    }
    async updateStock(credentials, updates) {
        throw new Error('Amazon adapter not yet implemented');
    }
    async fetchPayments(credentials, since) {
        throw new Error('Amazon adapter not yet implemented');
    }
    async fetchReturns(credentials, since) {
        throw new Error('Amazon adapter not yet implemented');
    }
    async refreshToken(credentials) {
        throw new Error('Amazon adapter not yet implemented');
    }
    async validateCredentials(credentials) {
        return false;
    }
}
exports.AmazonAdapter = AmazonAdapter;
//# sourceMappingURL=amazon.adapter.js.map