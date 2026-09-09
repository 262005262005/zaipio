"use strict";
// ============================================================
// ZAIPIO — Database Schema (Drizzle ORM)
// PostgreSQL schema for all core entities
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptions = exports.eventLog = exports.returns = exports.payments = exports.orderItems = exports.orders = exports.inventory = exports.products = exports.platformConnections = exports.teamMembers = exports.sellers = exports.paymentStatusEnum = exports.teamRoleEnum = exports.syncStatusEnum = exports.labelStatusEnum = exports.orderStatusEnum = exports.tierEnum = exports.platformEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ---- Enums ----
exports.platformEnum = (0, pg_core_1.pgEnum)('platform', ['amazon', 'flipkart', 'meesho', 'shopify']);
exports.tierEnum = (0, pg_core_1.pgEnum)('subscription_tier', ['free', 'starter', 'growth', 'pro']);
exports.orderStatusEnum = (0, pg_core_1.pgEnum)('order_status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'rto']);
exports.labelStatusEnum = (0, pg_core_1.pgEnum)('label_status', ['pending', 'downloaded', 'cropped', 'printed']);
exports.syncStatusEnum = (0, pg_core_1.pgEnum)('sync_status', ['idle', 'syncing', 'success', 'error']);
exports.teamRoleEnum = (0, pg_core_1.pgEnum)('team_role', ['owner', 'admin', 'accountant', 'packer']);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)('payment_status', ['pending', 'settled', 'on_hold', 'refunded']);
// ---- Sellers (main users) ----
exports.sellers = (0, pg_core_1.pgTable)('sellers', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    passwordHash: (0, pg_core_1.varchar)('password_hash', { length: 255 }).notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    businessName: (0, pg_core_1.varchar)('business_name', { length: 255 }).notNull(),
    phone: (0, pg_core_1.varchar)('phone', { length: 20 }),
    gstNumber: (0, pg_core_1.varchar)('gst_number', { length: 20 }),
    tier: (0, exports.tierEnum)('tier').notNull().default('free'),
    razorpayCustomerId: (0, pg_core_1.varchar)('razorpay_customer_id', { length: 100 }),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
// ---- Team Members ----
exports.teamMembers = (0, pg_core_1.pgTable)('team_members', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    role: (0, exports.teamRoleEnum)('role').notNull().default('packer'),
    passwordHash: (0, pg_core_1.varchar)('password_hash', { length: 255 }).notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ---- Platform Connections ----
exports.platformConnections = (0, pg_core_1.pgTable)('platform_connections', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    platform: (0, exports.platformEnum)('platform').notNull(),
    accessToken: (0, pg_core_1.text)('access_token'), // encrypted at app level
    refreshToken: (0, pg_core_1.text)('refresh_token'), // encrypted at app level
    tokenExpiresAt: (0, pg_core_1.timestamp)('token_expires_at'),
    apiKey: (0, pg_core_1.text)('api_key'), // encrypted at app level
    shopDomain: (0, pg_core_1.varchar)('shop_domain', { length: 255 }), // Shopify specific
    status: (0, pg_core_1.varchar)('status', { length: 20 }).notNull().default('disconnected'),
    syncStatus: (0, exports.syncStatusEnum)('sync_status').notNull().default('idle'),
    lastSyncedAt: (0, pg_core_1.timestamp)('last_synced_at'),
    errorMessage: (0, pg_core_1.text)('error_message'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
}, (t) => [(0, pg_core_1.index)('idx_conn_seller_platform').on(t.sellerId, t.platform)]);
// ---- Products / SKUs ----
exports.products = (0, pg_core_1.pgTable)('products', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    sku: (0, pg_core_1.varchar)('sku', { length: 100 }).notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 500 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    category: (0, pg_core_1.varchar)('category', { length: 100 }),
    imageUrl: (0, pg_core_1.text)('image_url'),
    cogs: (0, pg_core_1.decimal)('cogs', { precision: 10, scale: 2 }),
    lowStockThreshold: (0, pg_core_1.integer)('low_stock_threshold').default(10),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
}, (t) => [(0, pg_core_1.index)('idx_product_seller_sku').on(t.sellerId, t.sku)]);
// ---- Inventory ----
exports.inventory = (0, pg_core_1.pgTable)('inventory', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    productId: (0, pg_core_1.uuid)('product_id').notNull().references(() => exports.products.id, { onDelete: 'cascade' }),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    platform: (0, exports.platformEnum)('platform').notNull(),
    platformListingId: (0, pg_core_1.varchar)('platform_listing_id', { length: 255 }),
    stock: (0, pg_core_1.integer)('stock').notNull().default(0),
    reservedStock: (0, pg_core_1.integer)('reserved_stock').notNull().default(0),
    lastSyncedAt: (0, pg_core_1.timestamp)('last_synced_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
// ---- Orders ----
exports.orders = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    platformOrderId: (0, pg_core_1.varchar)('platform_order_id', { length: 255 }).notNull(),
    platform: (0, exports.platformEnum)('platform').notNull(),
    status: (0, exports.orderStatusEnum)('status').notNull().default('pending'),
    customerName: (0, pg_core_1.varchar)('customer_name', { length: 255 }),
    customerPhone: (0, pg_core_1.varchar)('customer_phone', { length: 20 }),
    shippingAddress: (0, pg_core_1.jsonb)('shipping_address'),
    totalAmount: (0, pg_core_1.decimal)('total_amount', { precision: 10, scale: 2 }).notNull(),
    platformFee: (0, pg_core_1.decimal)('platform_fee', { precision: 10, scale: 2 }).default('0'),
    shippingCost: (0, pg_core_1.decimal)('shipping_cost', { precision: 10, scale: 2 }).default('0'),
    netAmount: (0, pg_core_1.decimal)('net_amount', { precision: 10, scale: 2 }),
    labelStatus: (0, exports.labelStatusEnum)('label_status').notNull().default('pending'),
    labelFileUrl: (0, pg_core_1.text)('label_file_url'),
    trackingId: (0, pg_core_1.varchar)('tracking_id', { length: 100 }),
    courier: (0, pg_core_1.varchar)('courier', { length: 100 }),
    orderedAt: (0, pg_core_1.timestamp)('ordered_at').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
}, (t) => [
    (0, pg_core_1.index)('idx_order_seller').on(t.sellerId),
    (0, pg_core_1.index)('idx_order_platform').on(t.platform),
    (0, pg_core_1.index)('idx_order_status').on(t.status),
    (0, pg_core_1.index)('idx_order_platform_id').on(t.platformOrderId, t.platform),
]);
// ---- Order Items ----
exports.orderItems = (0, pg_core_1.pgTable)('order_items', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    orderId: (0, pg_core_1.uuid)('order_id').notNull().references(() => exports.orders.id, { onDelete: 'cascade' }),
    sku: (0, pg_core_1.varchar)('sku', { length: 100 }).notNull(),
    productName: (0, pg_core_1.varchar)('product_name', { length: 500 }).notNull(),
    quantity: (0, pg_core_1.integer)('quantity').notNull(),
    unitPrice: (0, pg_core_1.decimal)('unit_price', { precision: 10, scale: 2 }).notNull(),
    cogs: (0, pg_core_1.decimal)('cogs', { precision: 10, scale: 2 }),
});
// ---- Payments / Settlements ----
exports.payments = (0, pg_core_1.pgTable)('payments', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    platform: (0, exports.platformEnum)('platform').notNull(),
    settlementId: (0, pg_core_1.varchar)('settlement_id', { length: 255 }).notNull(),
    amount: (0, pg_core_1.decimal)('amount', { precision: 10, scale: 2 }).notNull(),
    status: (0, exports.paymentStatusEnum)('status').notNull().default('pending'),
    settlementDate: (0, pg_core_1.timestamp)('settlement_date'),
    periodStart: (0, pg_core_1.timestamp)('period_start'),
    periodEnd: (0, pg_core_1.timestamp)('period_end'),
    ordersCount: (0, pg_core_1.integer)('orders_count').default(0),
    deductions: (0, pg_core_1.decimal)('deductions', { precision: 10, scale: 2 }).default('0'),
    rawData: (0, pg_core_1.jsonb)('raw_data'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ---- Returns ----
exports.returns = (0, pg_core_1.pgTable)('returns', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    orderId: (0, pg_core_1.uuid)('order_id').notNull().references(() => exports.orders.id),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    platform: (0, exports.platformEnum)('platform').notNull(),
    returnReason: (0, pg_core_1.text)('return_reason'),
    returnReasonCode: (0, pg_core_1.varchar)('return_reason_code', { length: 50 }),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull().default('initiated'),
    refundAmount: (0, pg_core_1.decimal)('refund_amount', { precision: 10, scale: 2 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
// ---- Audit / Event Log (append-only, never update) ----
exports.eventLog = (0, pg_core_1.pgTable)('event_log', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').references(() => exports.sellers.id),
    entityType: (0, pg_core_1.varchar)('entity_type', { length: 50 }).notNull(), // 'order', 'inventory', 'payment', etc.
    entityId: (0, pg_core_1.uuid)('entity_id'),
    eventType: (0, pg_core_1.varchar)('event_type', { length: 100 }).notNull(), // 'order.created', 'stock.synced', etc.
    payload: (0, pg_core_1.jsonb)('payload'),
    source: (0, pg_core_1.varchar)('source', { length: 50 }), // 'amazon', 'system', 'user'
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
}, (t) => [
    (0, pg_core_1.index)('idx_event_seller').on(t.sellerId),
    (0, pg_core_1.index)('idx_event_type').on(t.eventType),
    (0, pg_core_1.index)('idx_event_entity').on(t.entityType, t.entityId),
]);
// ---- Subscriptions ----
exports.subscriptions = (0, pg_core_1.pgTable)('subscriptions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    sellerId: (0, pg_core_1.uuid)('seller_id').notNull().references(() => exports.sellers.id, { onDelete: 'cascade' }),
    razorpaySubscriptionId: (0, pg_core_1.varchar)('razorpay_subscription_id', { length: 100 }),
    tier: (0, exports.tierEnum)('tier').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 30 }).notNull().default('active'),
    currentPeriodStart: (0, pg_core_1.timestamp)('current_period_start'),
    currentPeriodEnd: (0, pg_core_1.timestamp)('current_period_end'),
    cancelledAt: (0, pg_core_1.timestamp)('cancelled_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
//# sourceMappingURL=index.js.map