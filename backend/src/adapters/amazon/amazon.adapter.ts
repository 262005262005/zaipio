// ============================================================
// ZAIPIO — Amazon SP-API Adapter (stub)
// Apply for approval on Day 1 — takes 1-2 weeks
// ============================================================
import { BasePlatformAdapter, PlatformCredentials, SyncResult } from '../base/platform.adapter';
import { Order, InventoryItem, Payment, Return } from '@zaipio/shared';

export class AmazonAdapter extends BasePlatformAdapter {
  readonly platform = 'amazon' as const;

  // TODO: Implement using amazon-sp-api npm package
  // Key APIs: Orders API, Reports API, Catalog API, FBA Inventory API
  // Auth: OAuth 2.0 via Login with Amazon + SP-API app registration
  // NOTE: Use async Reports API over live polling — rate limits are strict

  async fetchOrders(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Order>>> {
    throw new Error('Amazon adapter not yet implemented — apply for SP-API access first');
  }

  async fetchInventory(credentials: PlatformCredentials): Promise<SyncResult<Partial<InventoryItem>>> {
    throw new Error('Amazon adapter not yet implemented');
  }

  async updateStock(credentials: PlatformCredentials, updates: any[]): Promise<{ success: boolean; errors: string[] }> {
    throw new Error('Amazon adapter not yet implemented');
  }

  async fetchPayments(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Payment>>> {
    throw new Error('Amazon adapter not yet implemented');
  }

  async fetchReturns(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Return>>> {
    throw new Error('Amazon adapter not yet implemented');
  }

  async refreshToken(credentials: PlatformCredentials): Promise<{ accessToken: string; expiresAt: Date }> {
    throw new Error('Amazon adapter not yet implemented');
  }

  async validateCredentials(credentials: PlatformCredentials): Promise<boolean> {
    return false;
  }
}
