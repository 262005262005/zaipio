"use strict";
// ============================================================
// ZAIPIO — Shared Constants
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.RETURN_REASON_CODES = exports.ORDER_STATUS_LABELS = exports.PLATFORM_DISPLAY_NAMES = exports.LOW_STOCK_DEFAULT_THRESHOLD = exports.LABEL_DOWNLOAD_CRON = exports.TIER_PRICING = exports.TIER_LIMITS = exports.SUBSCRIPTION_TIERS = exports.PLATFORMS = void 0;
exports.PLATFORMS = ['amazon', 'flipkart', 'meesho', 'shopify'];
exports.SUBSCRIPTION_TIERS = {
    FREE: 'free',
    STARTER: 'starter',
    GROWTH: 'growth',
    PRO: 'pro',
};
exports.TIER_LIMITS = {
    free: {
        platforms: 1,
        ordersPerMonth: 50,
        autoLabelDownload: false,
        stockSync: false,
        profitCalculator: false,
        whatsappAlerts: false,
        teamRoles: false,
    },
    starter: {
        platforms: 2,
        ordersPerMonth: 1000,
        autoLabelDownload: true,
        stockSync: 'one-way',
        profitCalculator: false,
        whatsappAlerts: false,
        teamRoles: false,
    },
    growth: {
        platforms: -1, // unlimited
        ordersPerMonth: -1, // unlimited
        autoLabelDownload: true,
        stockSync: 'two-way',
        profitCalculator: true,
        whatsappAlerts: true,
        teamRoles: false,
    },
    pro: {
        platforms: -1,
        ordersPerMonth: -1,
        autoLabelDownload: true,
        stockSync: 'two-way',
        profitCalculator: true,
        whatsappAlerts: true,
        teamRoles: true,
    },
};
exports.TIER_PRICING = {
    free: 0,
    starter: 999,
    growth: 2999,
    pro: 6999,
};
// Label auto-download schedule (IST 12:00 noon daily)
exports.LABEL_DOWNLOAD_CRON = '30 6 * * *'; // 06:30 UTC = 12:00 IST
exports.LOW_STOCK_DEFAULT_THRESHOLD = 10;
exports.PLATFORM_DISPLAY_NAMES = {
    amazon: 'Amazon',
    flipkart: 'Flipkart',
    meesho: 'Meesho',
    shopify: 'Shopify',
};
exports.ORDER_STATUS_LABELS = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    returned: 'Returned',
    rto: 'RTO',
};
exports.RETURN_REASON_CODES = {
    DAMAGED: 'Product Damaged',
    WRONG_ITEM: 'Wrong Item Sent',
    NOT_AS_DESCRIBED: 'Not as Described',
    BUYER_CHANGED_MIND: 'Buyer Changed Mind',
    QUALITY_ISSUE: 'Quality Issue',
    LATE_DELIVERY: 'Late Delivery',
    RTO: 'Return to Origin',
    OTHER: 'Other',
};
//# sourceMappingURL=index.js.map