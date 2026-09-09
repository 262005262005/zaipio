export declare class InventoryController {
    getInventory(): Promise<{
        id: string;
        sku: string;
        name: string;
        category: string;
        totalStock: number;
        amazon: number;
        flipkart: number;
        meesho: number;
        shopify: number;
        minAlert: number;
        status: string;
    }[]>;
    updateStock(body: any): Promise<{
        success: boolean;
        sku: any;
        updatedStock: any;
        syncLatencyMs: number;
    }>;
}
export declare class InventoryModule {
}
//# sourceMappingURL=inventory.module.d.ts.map