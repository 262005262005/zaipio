"use strict";
// ============================================================
// ZAIPIO — Shared Utilities
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatINR = formatINR;
exports.calculateProfit = calculateProfit;
exports.paginate = paginate;
exports.maskSecret = maskSecret;
exports.sleep = sleep;
exports.slugify = slugify;
/**
 * Format a number as Indian Rupee currency
 */
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
}
/**
 * Calculate profit breakdown for an order
 */
function calculateProfit(params) {
    const { revenue, cogs, platformFee, shippingCost, adSpend = 0 } = params;
    const grossProfit = revenue - cogs - platformFee - shippingCost;
    const netProfit = grossProfit - adSpend;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    return { grossProfit, netProfit, margin: Math.round(margin * 100) / 100 };
}
/**
 * Paginate an array (for mock/testing)
 */
function paginate(items, page = 1, pageSize = 20) {
    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = items.slice(start, start + pageSize);
    return { data, total, totalPages };
}
/**
 * Mask sensitive strings (API keys, tokens)
 */
function maskSecret(secret, visibleChars = 4) {
    if (secret.length <= visibleChars)
        return '****';
    return `${secret.slice(0, visibleChars)}${'*'.repeat(secret.length - visibleChars)}`;
}
/**
 * Sleep utility for async delays
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Generate a simple slug from a string
 */
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
//# sourceMappingURL=index.js.map