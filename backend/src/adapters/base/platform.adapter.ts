// ============================================================
// ZAIPIO — Adapter Base Interface
// Every platform adapter MUST implement this contract
// ============================================================

import { Order, InventoryItem, Payment, Return, Platform } from '@zaipio/shared';

export interface PlatformCredentials {
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  apiSecret?: string;
  shopDomain?: string; // Shopify
}

export interface SyncResult<T> {
  success: boolean;
  data: T[];
  errors: string[];
  syncedAt: Date;
}

export abstract class BasePlatformAdapter {
  abstract readonly platform: Platform;

  /**
   * Fetch new/updated orders from the platform
   */
  abstract fetchOrders(
    credentials: PlatformCredentials,
    since?: Date,
  ): Promise<SyncResult<Partial<Order>>>;

  /**
   * Fetch inventory levels for all SKUs
   */
  abstract fetchInventory(
    credentials: PlatformCredentials,
  ): Promise<SyncResult<Partial<InventoryItem>>>;

  /**
   * Push stock update to the platform
   */
  abstract updateStock(
    credentials: PlatformCredentials,
    updates: Array<{ platformListingId: string; stock: number }>,
  ): Promise<{ success: boolean; errors: string[] }>;

  /**
   * Fetch payment / settlement data
   */
  abstract fetchPayments(
    credentials: PlatformCredentials,
    since?: Date,
  ): Promise<SyncResult<Partial<Payment>>>;

  /**
   * Fetch returns / RTOs
   */
  abstract fetchReturns(
    credentials: PlatformCredentials,
    since?: Date,
  ): Promise<SyncResult<Partial<Return>>>;

  /**
   * Refresh the access token using the refresh token
   */
  abstract refreshToken(
    credentials: PlatformCredentials,
  ): Promise<{ accessToken: string; expiresAt: Date }>;

  /**
   * Validate that stored credentials are still working
   */
  abstract validateCredentials(
    credentials: PlatformCredentials,
  ): Promise<boolean>;
}
