/**
 * Format a number as Indian Rupee currency
 */
export declare function formatINR(amount: number): string;
/**
 * Calculate profit breakdown for an order
 */
export declare function calculateProfit(params: {
    revenue: number;
    cogs: number;
    platformFee: number;
    shippingCost: number;
    adSpend?: number;
}): {
    grossProfit: number;
    netProfit: number;
    margin: number;
};
/**
 * Paginate an array (for mock/testing)
 */
export declare function paginate<T>(items: T[], page?: number, pageSize?: number): {
    data: T[];
    total: number;
    totalPages: number;
};
/**
 * Mask sensitive strings (API keys, tokens)
 */
export declare function maskSecret(secret: string, visibleChars?: number): string;
/**
 * Sleep utility for async delays
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Generate a simple slug from a string
 */
export declare function slugify(text: string): string;
//# sourceMappingURL=index.d.ts.map