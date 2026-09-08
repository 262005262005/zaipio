// ============================================================
// ZAIPIO — Shared Utilities
// ============================================================

/**
 * Format a number as Indian Rupee currency
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate profit breakdown for an order
 */
export function calculateProfit(params: {
  revenue: number;
  cogs: number;
  platformFee: number;
  shippingCost: number;
  adSpend?: number;
}): {
  grossProfit: number;
  netProfit: number;
  margin: number;
} {
  const { revenue, cogs, platformFee, shippingCost, adSpend = 0 } = params;
  const grossProfit = revenue - cogs - platformFee - shippingCost;
  const netProfit = grossProfit - adSpend;
  const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  return { grossProfit, netProfit, margin: Math.round(margin * 100) / 100 };
}

/**
 * Paginate an array (for mock/testing)
 */
export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 20
): { data: T[]; total: number; totalPages: number } {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return { data, total, totalPages };
}

/**
 * Mask sensitive strings (API keys, tokens)
 */
export function maskSecret(secret: string, visibleChars: number = 4): string {
  if (secret.length <= visibleChars) return '****';
  return `${secret.slice(0, visibleChars)}${'*'.repeat(secret.length - visibleChars)}`;
}

/**
 * Sleep utility for async delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a simple slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
