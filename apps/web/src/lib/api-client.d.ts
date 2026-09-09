export declare const apiClient: any;
export declare const zaipioApi: {
    login: (credentials: {
        email: string;
        password?: string;
    }) => any;
    signup: (userData: any) => any;
    getProfile: () => any;
    getOrders: () => any;
    getOrderById: (id: string) => any;
    triggerOrderSync: () => any;
    getDailyLabelBatch: () => any;
    cropLabelsPdf: (pdfData: any) => any;
    getInventory: () => any;
    updateStock: (sku: string, stock: number) => any;
    getPaymentReconciliation: () => any;
};
//# sourceMappingURL=api-client.d.ts.map