export declare class PaymentsController {
    getReconciliation(): Promise<{
        totalSettledMonth: number;
        pendingSettlements: number;
        platformFees: number;
        discrepancyAlerts: number;
        recentBatches: {
            id: string;
            date: string;
            platform: string;
            gross: string;
            commission: string;
            shipping: string;
            netSettlement: string;
            status: string;
        }[];
    }>;
}
export declare class PaymentsModule {
}
//# sourceMappingURL=payments.module.d.ts.map