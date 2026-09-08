// ============================================================
// ZAIPIO — Database Schema (Drizzle ORM)
// PostgreSQL schema for all core entities
// ============================================================

import {
  pgTable, uuid, varchar, text, integer, decimal,
  boolean, timestamp, jsonb, pgEnum, index,
} from 'drizzle-orm/pg-core';

// ---- Enums ----
export const platformEnum = pgEnum('platform', ['amazon', 'flipkart', 'meesho', 'shopify']);
export const tierEnum = pgEnum('subscription_tier', ['free', 'starter', 'growth', 'pro']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'rto']);
export const labelStatusEnum = pgEnum('label_status', ['pending', 'downloaded', 'cropped', 'printed']);
export const syncStatusEnum = pgEnum('sync_status', ['idle', 'syncing', 'success', 'error']);
export const teamRoleEnum = pgEnum('team_role', ['owner', 'admin', 'accountant', 'packer']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'settled', 'on_hold', 'refunded']);

// ---- Sellers (main users) ----
export const sellers = pgTable('sellers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  gstNumber: varchar('gst_number', { length: 20 }),
  tier: tierEnum('tier').notNull().default('free'),
  razorpayCustomerId: varchar('razorpay_customer_id', { length: 100 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ---- Team Members ----
export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: teamRoleEnum('role').notNull().default('packer'),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ---- Platform Connections ----
export const platformConnections = pgTable('platform_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  platform: platformEnum('platform').notNull(),
  accessToken: text('access_token'),           // encrypted at app level
  refreshToken: text('refresh_token'),          // encrypted at app level
  tokenExpiresAt: timestamp('token_expires_at'),
  apiKey: text('api_key'),                      // encrypted at app level
  shopDomain: varchar('shop_domain', { length: 255 }), // Shopify specific
  status: varchar('status', { length: 20 }).notNull().default('disconnected'),
  syncStatus: syncStatusEnum('sync_status').notNull().default('idle'),
  lastSyncedAt: timestamp('last_synced_at'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => [index('idx_conn_seller_platform').on(t.sellerId, t.platform)]);

// ---- Products / SKUs ----
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  sku: varchar('sku', { length: 100 }).notNull(),
  name: varchar('name', { length: 500 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  imageUrl: text('image_url'),
  cogs: decimal('cogs', { precision: 10, scale: 2 }),
  lowStockThreshold: integer('low_stock_threshold').default(10),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => [index('idx_product_seller_sku').on(t.sellerId, t.sku)]);

// ---- Inventory ----
export const inventory = pgTable('inventory', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  platform: platformEnum('platform').notNull(),
  platformListingId: varchar('platform_listing_id', { length: 255 }),
  stock: integer('stock').notNull().default(0),
  reservedStock: integer('reserved_stock').notNull().default(0),
  lastSyncedAt: timestamp('last_synced_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ---- Orders ----
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  platformOrderId: varchar('platform_order_id', { length: 255 }).notNull(),
  platform: platformEnum('platform').notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  customerName: varchar('customer_name', { length: 255 }),
  customerPhone: varchar('customer_phone', { length: 20 }),
  shippingAddress: jsonb('shipping_address'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).default('0'),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }).default('0'),
  netAmount: decimal('net_amount', { precision: 10, scale: 2 }),
  labelStatus: labelStatusEnum('label_status').notNull().default('pending'),
  labelFileUrl: text('label_file_url'),
  trackingId: varchar('tracking_id', { length: 100 }),
  courier: varchar('courier', { length: 100 }),
  orderedAt: timestamp('ordered_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => [
  index('idx_order_seller').on(t.sellerId),
  index('idx_order_platform').on(t.platform),
  index('idx_order_status').on(t.status),
  index('idx_order_platform_id').on(t.platformOrderId, t.platform),
]);

// ---- Order Items ----
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  sku: varchar('sku', { length: 100 }).notNull(),
  productName: varchar('product_name', { length: 500 }).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  cogs: decimal('cogs', { precision: 10, scale: 2 }),
});

// ---- Payments / Settlements ----
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  platform: platformEnum('platform').notNull(),
  settlementId: varchar('settlement_id', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum('status').notNull().default('pending'),
  settlementDate: timestamp('settlement_date'),
  periodStart: timestamp('period_start'),
  periodEnd: timestamp('period_end'),
  ordersCount: integer('orders_count').default(0),
  deductions: decimal('deductions', { precision: 10, scale: 2 }).default('0'),
  rawData: jsonb('raw_data'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ---- Returns ----
export const returns = pgTable('returns', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  platform: platformEnum('platform').notNull(),
  returnReason: text('return_reason'),
  returnReasonCode: varchar('return_reason_code', { length: 50 }),
  status: varchar('status', { length: 50 }).notNull().default('initiated'),
  refundAmount: decimal('refund_amount', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ---- Audit / Event Log (append-only, never update) ----
export const eventLog = pgTable('event_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').references(() => sellers.id),
  entityType: varchar('entity_type', { length: 50 }).notNull(),   // 'order', 'inventory', 'payment', etc.
  entityId: uuid('entity_id'),
  eventType: varchar('event_type', { length: 100 }).notNull(),    // 'order.created', 'stock.synced', etc.
  payload: jsonb('payload'),
  source: varchar('source', { length: 50 }),                       // 'amazon', 'system', 'user'
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => [
  index('idx_event_seller').on(t.sellerId),
  index('idx_event_type').on(t.eventType),
  index('idx_event_entity').on(t.entityType, t.entityId),
]);

// ---- Subscriptions ----
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => sellers.id, { onDelete: 'cascade' }),
  razorpaySubscriptionId: varchar('razorpay_subscription_id', { length: 100 }),
  tier: tierEnum('tier').notNull(),
  status: varchar('status', { length: 30 }).notNull().default('active'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
