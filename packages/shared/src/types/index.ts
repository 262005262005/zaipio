// ============================================================
// ZAIPIO — Shared Types
// Central type definitions used across all apps and packages
// ============================================================

// ---- Platform Types ----
export type Platform = 'amazon' | 'flipkart' | 'meesho' | 'shopify';

export type SubscriptionTier = 'free' | 'starter' | 'growth' | 'pro';

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'rto';

export type LabelStatus = 'pending' | 'downloaded' | 'cropped' | 'printed';

export type PaymentStatus = 'pending' | 'settled' | 'on_hold' | 'refunded';

// ---- User & Auth ----
export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  gstNumber?: string;
  phone?: string;
  tier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  sellerId: string;
  email: string;
  name: string;
  role: TeamRole;
  createdAt: Date;
}

export type TeamRole = 'owner' | 'admin' | 'accountant' | 'packer';

// ---- Platform Connection ----
export interface PlatformConnection {
  id: string;
  sellerId: string;
  platform: Platform;
  status: 'connected' | 'disconnected' | 'error';
  lastSyncedAt?: Date;
  syncStatus: SyncStatus;
  createdAt: Date;
}

// ---- Orders ----
export interface Order {
  id: string;
  sellerId: string;
  platformOrderId: string;
  platform: Platform;
  status: OrderStatus;
  customerName: string;
  customerPhone?: string;
  shippingAddress: Address;
  items: OrderItem[];
  totalAmount: number;
  platformFee: number;
  shippingCost: number;
  netAmount: number;
  labelStatus: LabelStatus;
  trackingId?: string;
  courier?: string;
  orderedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  sku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  cogs?: number;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// ---- Inventory ----
export interface Product {
  id: string;
  sellerId: string;
  sku: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  cogs?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  productId: string;
  sellerId: string;
  platform: Platform;
  platformListingId: string;
  stock: number;
  reservedStock: number;
  availableStock: number;
  lastSyncedAt: Date;
}

// ---- Payments ----
export interface Payment {
  id: string;
  sellerId: string;
  platform: Platform;
  settlementId: string;
  amount: number;
  status: PaymentStatus;
  settlementDate: Date;
  periodStart: Date;
  periodEnd: Date;
  ordersCount: number;
  deductions: number;
  createdAt: Date;
}

// ---- Profit ----
export interface ProfitBreakdown {
  orderId: string;
  revenue: number;
  cogs: number;
  platformFee: number;
  shippingCost: number;
  adSpend?: number;
  grossProfit: number;
  netProfit: number;
  margin: number; // percentage
}

// ---- Returns ----
export interface Return {
  id: string;
  orderId: string;
  sellerId: string;
  platform: Platform;
  returnReason: string;
  returnReasonCode: string;
  status: 'initiated' | 'in_transit' | 'received' | 'refunded' | 'disposed';
  refundAmount?: number;
  createdAt: Date;
}

// ---- Notifications ----
export interface Notification {
  id: string;
  sellerId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: 'whatsapp' | 'telegram' | 'email' | 'in_app';
  read: boolean;
  createdAt: Date;
}

export type NotificationType =
  | 'low_stock'
  | 'label_ready'
  | 'order_new'
  | 'return_received'
  | 'payment_settled'
  | 'sync_error'
  | 'daily_summary';

// ---- API Response Wrappers ----
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
