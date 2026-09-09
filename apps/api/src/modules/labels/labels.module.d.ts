export declare class LabelsController {
    getDailyBatch(): Promise<{
        batchTime: string;
        status: string;
        totalLabels: number;
        platforms: {
            amazon: number;
            flipkart: number;
            meesho: number;
            shopify: number;
        };
    }>;
    cropLabels(): Promise<{
        success: boolean;
        message: string;
        downloadUrl: string;
    }>;
}
export declare class LabelsModule {
}
//# sourceMappingURL=labels.module.d.ts.map