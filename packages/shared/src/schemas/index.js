"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockUpdateSchema = exports.LabelCropSchema = exports.SignupSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters').optional(),
});
exports.SignupSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().min(2, 'Name is required'),
    businessName: zod_1.z.string().min(2, 'Business name is required'),
    phone: zod_1.z.string().optional(),
});
exports.LabelCropSchema = zod_1.z.object({
    cropRatio: zod_1.z.enum(['1x1', '1x2', '2x2']).default('1x2'),
    sort: zod_1.z.enum(['SKU', 'ORDER_QTY', 'PLATFORM']).default('SKU'),
    pdfBuffer: zod_1.z.string().optional(),
});
exports.StockUpdateSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1, 'SKU is required'),
    stock: zod_1.z.number().int().min(0, 'Stock cannot be negative'),
    platform: zod_1.z.enum(['amazon', 'flipkart', 'meesho', 'shopify', 'all']).default('all'),
});
//# sourceMappingURL=index.js.map