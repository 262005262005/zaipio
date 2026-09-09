export declare class AuthController {
    signup(body: any): Promise<{
        success: boolean;
        message: string;
        token: string;
        user: {
            id: string;
            name: any;
            email: any;
        };
    }>;
    login(body: any): Promise<{
        success: boolean;
        token: string;
        user: {
            id: string;
            name: string;
            email: any;
            plan: string;
        };
    }>;
    getProfile(): Promise<{
        id: string;
        name: string;
        email: string;
        businessName: string;
        plan: string;
        connectedPlatforms: string[];
    }>;
}
export declare class AuthModule {
}
//# sourceMappingURL=auth.module.d.ts.map