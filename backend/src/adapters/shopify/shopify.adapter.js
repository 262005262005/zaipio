"use strict";
// ============================================================
// ZAIPIO — Shopify Adapter (Build First)
// Best documented, no approval needed, fastest to validate
// ============================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAdapter = void 0;
const platform_adapter_1 = require("../base/platform.adapter");
const axios_1 = __importDefault(require("axios"));
class ShopifyAdapter extends platform_adapter_1.BasePlatformAdapter {
    platform = 'shopify';
    getBaseUrl(shopDomain) {
        return `https://${shopDomain}/admin/api/2024-10`;
    }
    getHeaders(accessToken) {
        return {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
        };
    }
    async fetchOrders(credentials, since) {
        const { accessToken, shopDomain } = credentials;
        if (!accessToken || !shopDomain) {
            return { success: false, data: [], errors: ['Missing Shopify credentials'], syncedAt: new Date() };
        }
        try {
            const params = {
                status: 'any',
                limit: '250',
                fields: 'id,name,created_at,financial_status,fulfillment_status,total_price,shipping_address,line_items,shipping_lines',
            };
            if (since) {
                params['created_at_min'] = since.toISOString();
            }
            const response = await axios_1.default.get(`${this.getBaseUrl(shopDomain)}/orders.json`, { headers: this.getHeaders(accessToken), params });
            const orders = response.data.orders.map((o) => this.normalizeOrder(o, shopDomain));
            return { success: true, data: orders, errors: [], syncedAt: new Date() };
        }
        catch (error) {
            return {
                success: false,
                data: [],
                errors: [error?.message || 'Shopify orders fetch failed'],
                syncedAt: new Date(),
            };
        }
    }
    normalizeOrder(raw, shopDomain) {
        return {
            platformOrderId: String(raw.id),
            platform: 'shopify',
            status: this.mapOrderStatus(raw.fulfillment_status, raw.financial_status),
            customerName: raw.shipping_address?.name || 'Unknown',
            customerPhone: raw.shipping_address?.phone,
            shippingAddress: raw.shipping_address
                ? {
                    line1: raw.shipping_address.address1,
                    line2: raw.shipping_address.address2,
                    city: raw.shipping_address.city,
                    state: raw.shipping_address.province,
                    pincode: raw.shipping_address.zip,
                    country: raw.shipping_address.country,
                }
                : undefined,
            totalAmount: parseFloat(raw.total_price),
            shippingCost: raw.shipping_lines?.reduce((sum, line) => sum + parseFloat(line.price), 0) || 0,
            items: raw.line_items?.map((item) => ({
                sku: item.sku,
                productName: item.name,
                quantity: item.quantity,
                unitPrice: parseFloat(item.price),
            })),
            orderedAt: new Date(raw.created_at),
        };
    }
    mapOrderStatus(fulfillmentStatus, financialStatus) {
        if (financialStatus === 'refunded')
            return 'returned';
        if (fulfillmentStatus === 'fulfilled')
            return 'delivered';
        if (fulfillmentStatus === 'partial')
            return 'shipped';
        if (financialStatus === 'paid')
            return 'confirmed';
        return 'pending';
    }
    async fetchInventory(credentials) {
        // TODO: Implement via Shopify Inventory API
        return { success: true, data: [], errors: [], syncedAt: new Date() };
    }
    async updateStock(credentials, updates) {
        // TODO: Implement via Shopify Inventory Levels API
        return { success: true, errors: [] };
    }
    async fetchPayments(credentials, since) {
        // TODO: Implement via Shopify Payouts API
        return { success: true, data: [], errors: [], syncedAt: new Date() };
    }
    async fetchReturns(credentials, since) {
        // TODO: Implement via Shopify Refunds API
        return { success: true, data: [], errors: [], syncedAt: new Date() };
    }
    async refreshToken(credentials) {
        // Shopify access tokens don't expire — return as-is
        return {
            accessToken: credentials.accessToken || '',
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        };
    }
    async validateCredentials(credentials) {
        try {
            const { accessToken, shopDomain } = credentials;
            if (!accessToken || !shopDomain)
                return false;
            await axios_1.default.get(`${this.getBaseUrl(shopDomain)}/shop.json`, {
                headers: this.getHeaders(accessToken),
            });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.ShopifyAdapter = ShopifyAdapter;
//# sourceMappingURL=shopify.adapter.js.map