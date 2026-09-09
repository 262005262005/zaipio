export declare const PLATFORMS: readonly ["amazon", "flipkart", "meesho", "shopify"];
export declare const SUBSCRIPTION_TIERS: {
    readonly FREE: "free";
    readonly STARTER: "starter";
    readonly GROWTH: "growth";
    readonly PRO: "pro";
};
export declare const TIER_LIMITS: {
    readonly free: {
        readonly platforms: 1;
        readonly ordersPerMonth: 50;
        readonly autoLabelDownload: false;
        readonly stockSync: false;
        readonly profitCalculator: false;
        readonly whatsappAlerts: false;
        readonly teamRoles: false;
    };
    readonly starter: {
        readonly platforms: 2;
        readonly ordersPerMonth: 1000;
        readonly autoLabelDownload: true;
        readonly stockSync: "one-way";
        readonly profitCalculator: false;
        readonly whatsappAlerts: false;
        readonly teamRoles: false;
    };
    readonly growth: {
        readonly platforms: -1;
        readonly ordersPerMonth: -1;
        readonly autoLabelDownload: true;
        readonly stockSync: "two-way";
        readonly profitCalculator: true;
        readonly whatsappAlerts: true;
        readonly teamRoles: false;
    };
    readonly pro: {
        readonly platforms: -1;
        readonly ordersPerMonth: -1;
        readonly autoLabelDownload: true;
        readonly stockSync: "two-way";
        readonly profitCalculator: true;
        readonly whatsappAlerts: true;
        readonly teamRoles: true;
    };
};
export declare const TIER_PRICING: {
    readonly free: 0;
    readonly starter: 999;
    readonly growth: 2999;
    readonly pro: 6999;
};
export declare const LABEL_DOWNLOAD_CRON = "30 6 * * *";
export declare const LOW_STOCK_DEFAULT_THRESHOLD = 10;
export declare const PLATFORM_DISPLAY_NAMES: Record<string, string>;
export declare const ORDER_STATUS_LABELS: Record<string, string>;
export declare const RETURN_REASON_CODES: Record<string, string>;
//# sourceMappingURL=index.d.ts.map