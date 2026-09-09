export declare class OrdersController {
    getOrders(): Promise<{
        id: string;
        platform: string;
        platformName: string;
        platformColor: string;
        sku: string;
        product: string;
        qty: number;
        amount: number;
        status: string;
        date: string;
        customer: string;
        city: string;
        fee: number;
        netProfit: number;
    }[]>;
    syncOrders(): Promise<{
        success: boolean;
        message: string;
        syncedCount: number;
        timestamp: string;
    }>;
    getOrderById(id: string): Promise<{
        id: string;
        platform: string;
        status: string;
        customer: {
            name: string;
            address: string;
            city: string;
            state: string;
            pincode: string;
            phone: string;
        };
        items: {
            name: string;
            sku: string;
            qty: number;
            price: number;
        }[];
        financials: {
            sellingPrice: number;
            platformFee: number;
            shipping: number;
            cogs: number;
            netProfit: number;
        };
    }>;
}
export declare class OrdersModule {
}
//# sourceMappingURL=orders.module.d.ts.map