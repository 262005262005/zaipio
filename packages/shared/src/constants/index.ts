// ============================================================
// ZAIPIO — Shared Constants
// ============================================================

export const PLATFORMS = ['amazon', 'flipkart', 'meesho', 'shopify'] as const;

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  STARTER: 'starter',
  GROWTH: 'growth',
  PRO: 'pro',
} as const;

export const TIER_LIMITS = {
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
} as const;

export const TIER_PRICING = {
  free: 0,
  starter: 999,
  growth: 2999,
  pro: 6999,
} as const;

// Label auto-download schedule (IST 12:00 noon daily)
export const LABEL_DOWNLOAD_CRON = '30 6 * * *'; // 06:30 UTC = 12:00 IST

export const LOW_STOCK_DEFAULT_THRESHOLD = 10;

export const PLATFORM_DISPLAY_NAMES: Record<string, string> = {
  amazon: 'Amazon',
  flipkart: 'Flipkart',
  meesho: 'Meesho',
  shopify: 'Shopify',
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
  rto: 'RTO',
};

export const RETURN_REASON_CODES: Record<string, string> = {
  DAMAGED: 'Product Damaged',
  WRONG_ITEM: 'Wrong Item Sent',
  NOT_AS_DESCRIBED: 'Not as Described',
  BUYER_CHANGED_MIND: 'Buyer Changed Mind',
  QUALITY_ISSUE: 'Quality Issue',
  LATE_DELIVERY: 'Late Delivery',
  RTO: 'Return to Origin',
  OTHER: 'Other',
};
