// ============================================================
// ZAIPIO — Shopify Adapter (Build First)
// Best documented, no approval needed, fastest to validate
// ============================================================

import { BasePlatformAdapter, PlatformCredentials, SyncResult } from '../base/platform.adapter';
import { Order, InventoryItem, Payment, Return } from '@zaipio/shared';
import axios from 'axios';

export class ShopifyAdapter extends BasePlatformAdapter {
  readonly platform = 'shopify' as const;

  private getBaseUrl(shopDomain: string): string {
    return `https://${shopDomain}/admin/api/2024-10`;
  }

  private getHeaders(accessToken: string) {
    return {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    };
  }

  async fetchOrders(
    credentials: PlatformCredentials,
    since?: Date,
  ): Promise<SyncResult<Partial<Order>>> {
    const { accessToken, shopDomain } = credentials;
    if (!accessToken || !shopDomain) {
      return { success: false, data: [], errors: ['Missing Shopify credentials'], syncedAt: new Date() };
    }

    try {
      const params: Record<string, string> = {
        status: 'any',
        limit: '250',
        fields: 'id,name,created_at,financial_status,fulfillment_status,total_price,shipping_address,line_items,shipping_lines',
      };

      if (since) {
        params['created_at_min'] = since.toISOString();
      }

      const response = await axios.get(
        `${this.getBaseUrl(shopDomain)}/orders.json`,
        { headers: this.getHeaders(accessToken), params },
      );

      const orders = response.data.orders.map((o: any) => this.normalizeOrder(o, shopDomain));
      return { success: true, data: orders, errors: [], syncedAt: new Date() };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        errors: [error?.message || 'Shopify orders fetch failed'],
        syncedAt: new Date(),
      };
    }
  }

  private normalizeOrder(raw: any, shopDomain: string): Partial<Order> {
    return {
      platformOrderId: String(raw.id),
      platform: 'shopify',
      status: this.mapOrderStatus(raw.fulfillment_status, raw.financial_status),
      customerName: raw.shipping_address?.name || 'Unknown',
      customerPhone: raw.shipping_address?.phone,
      shippingAddress: raw.shipping_address
        ? {
            line1: raw.shipping_address.address1,
            line2: raw.shipping_address.address2,
            city: raw.shipping_address.city,
            state: raw.shipping_address.province,
            pincode: raw.shipping_address.zip,
            country: raw.shipping_address.country,
          }
        : undefined,
      totalAmount: parseFloat(raw.total_price),
      shippingCost: raw.shipping_lines?.reduce(
        (sum: number, line: any) => sum + parseFloat(line.price), 0
      ) || 0,
      items: raw.line_items?.map((item: any) => ({
        sku: item.sku,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: parseFloat(item.price),
      })),
      orderedAt: new Date(raw.created_at),
    };
  }

  private mapOrderStatus(fulfillmentStatus: string, financialStatus: string): Order['status'] {
    if (financialStatus === 'refunded') return 'returned';
    if (fulfillmentStatus === 'fulfilled') return 'delivered';
    if (fulfillmentStatus === 'partial') return 'shipped';
    if (financialStatus === 'paid') return 'confirmed';
    return 'pending';
  }

  async fetchInventory(credentials: PlatformCredentials): Promise<SyncResult<Partial<InventoryItem>>> {
    // TODO: Implement via Shopify Inventory API
    return { success: true, data: [], errors: [], syncedAt: new Date() };
  }

  async updateStock(
    credentials: PlatformCredentials,
    updates: Array<{ platformListingId: string; stock: number }>,
  ): Promise<{ success: boolean; errors: string[] }> {
    // TODO: Implement via Shopify Inventory Levels API
    return { success: true, errors: [] };
  }

  async fetchPayments(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Payment>>> {
    // TODO: Implement via Shopify Payouts API
    return { success: true, data: [], errors: [], syncedAt: new Date() };
  }

  async fetchReturns(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Return>>> {
    // TODO: Implement via Shopify Refunds API
    return { success: true, data: [], errors: [], syncedAt: new Date() };
  }

  async refreshToken(credentials: PlatformCredentials): Promise<{ accessToken: string; expiresAt: Date }> {
    // Shopify access tokens don't expire — return as-is
    return {
      accessToken: credentials.accessToken || '',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };
  }

  async validateCredentials(credentials: PlatformCredentials): Promise<boolean> {
    try {
      const { accessToken, shopDomain } = credentials;
      if (!accessToken || !shopDomain) return false;
      await axios.get(`${this.getBaseUrl(shopDomain)}/shop.json`, {
        headers: this.getHeaders(accessToken),
      });
      return true;
    } catch {
      return false;
    }
  }
}
