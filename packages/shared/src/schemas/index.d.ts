import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password?: string | undefined;
}, {
    email: string;
    password?: string | undefined;
}>;
export declare const SignupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    businessName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    businessName: string;
    phone?: string | undefined;
}, {
    email: string;
    password: string;
    name: string;
    businessName: string;
    phone?: string | undefined;
}>;
export declare const LabelCropSchema: z.ZodObject<{
    cropRatio: z.ZodDefault<z.ZodEnum<["1x1", "1x2", "2x2"]>>;
    sort: z.ZodDefault<z.ZodEnum<["SKU", "ORDER_QTY", "PLATFORM"]>>;
    pdfBuffer: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sort: "SKU" | "ORDER_QTY" | "PLATFORM";
    cropRatio: "1x1" | "1x2" | "2x2";
    pdfBuffer?: string | undefined;
}, {
    sort?: "SKU" | "ORDER_QTY" | "PLATFORM" | undefined;
    cropRatio?: "1x1" | "1x2" | "2x2" | undefined;
    pdfBuffer?: string | undefined;
}>;
export declare const StockUpdateSchema: z.ZodObject<{
    sku: z.ZodString;
    stock: z.ZodNumber;
    platform: z.ZodDefault<z.ZodEnum<["amazon", "flipkart", "meesho", "shopify", "all"]>>;
}, "strip", z.ZodTypeAny, {
    sku: string;
    stock: number;
    platform: "amazon" | "flipkart" | "meesho" | "shopify" | "all";
}, {
    sku: string;
    stock: number;
    platform?: "amazon" | "flipkart" | "meesho" | "shopify" | "all" | undefined;
}>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type LabelCropInput = z.infer<typeof LabelCropSchema>;
export type StockUpdateInput = z.infer<typeof StockUpdateSchema>;
//# sourceMappingURL=index.d.ts.map