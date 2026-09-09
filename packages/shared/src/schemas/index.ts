import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export const SignupSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name is required'),
  businessName: z.string().min(2, 'Business name is required'),
  phone: z.string().optional(),
});

export const LabelCropSchema = z.object({
  cropRatio: z.enum(['1x1', '1x2', '2x2']).default('1x2'),
  sort: z.enum(['SKU', 'ORDER_QTY', 'PLATFORM']).default('SKU'),
  pdfBuffer: z.string().optional(),
});

export const StockUpdateSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  platform: z.enum(['amazon', 'flipkart', 'meesho', 'shopify', 'all']).default('all'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type LabelCropInput = z.infer<typeof LabelCropSchema>;
export type StockUpdateInput = z.infer<typeof StockUpdateSchema>;
