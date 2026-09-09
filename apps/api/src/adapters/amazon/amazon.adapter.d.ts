import { BasePlatformAdapter, PlatformCredentials, SyncResult } from '../base/platform.adapter';
import { Order, InventoryItem, Payment, Return } from '@zaipio/shared';
export declare class AmazonAdapter extends BasePlatformAdapter {
    readonly platform: "amazon";
    fetchOrders(credentials: PlatformCredentials, since?: Date): Promise<SyncResult<Partial<Order>>>;
    fetchInventory(credentials: PlatformCredentials): Promise<SyncResult<Partial<InventoryItem>>>;
    updateStock(credentials: PlatformCredentials, updates: any[]): Promise<{
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
//# sourceMappingURL=amazon.adapter.d.ts.map