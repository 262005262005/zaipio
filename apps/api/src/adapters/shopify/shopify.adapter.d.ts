import { BasePlatformAdapter, PlatformCredentials, SyncResult } from '../base/platform.adapter';
import { Order, InventoryItem, Payment, Return } from '@zaipio/shared';
export declare class ShopifyAdapter extends BasePlatformAdapter {
    readonly platform: "shopify";
    private getBaseUrl;
    private getHeaders;
    fetchOrders(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Order>>>;
    private normalizeOrder;
    private mapOrderStatus;
    fetchInventory(credentials: PlatformCredentials): Promise<SyncResult<Partial<InventoryItem>>>;
    updateStock(credentials: PlatformCredentials, updates: Array<{
        platformListingId: string;
        stock: number;
    }>): Promise<{
        success: boolean;
        errors: string[];
    }>;
    fetchPayments(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Payment>>>;
    fetchReturns(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Return>>>;
    refreshToken(credentials: PlatformCredentials): Promise<{
        accessToken: string;
        expiresAt: Date;
    }>;
    validateCredentials(credentials: PlatformCredentials): Promise<boolean>;
}
//# sourceMappingURL=shopify.adapter.d.ts.map