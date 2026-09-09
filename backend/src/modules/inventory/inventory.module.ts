import { Module, Controller, Get, Put, Body } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {
  @Get()
  async getInventory() {
    return [
      { id: 'INV-001', sku: 'SKU-0041', name: 'Cotton Kurti - Blue XL', category: 'Apparel', totalStock: 45, amazon: 15, flipkart: 12, meesho: 10, shopify: 8, minAlert: 20, status: 'In Stock' },
      { id: 'INV-002', sku: 'SKU-0012', name: 'Silk Saree - Red Gold', category: 'Apparel', totalStock: 3, amazon: 1, flipkart: 1, meesho: 1, shopify: 0, minAlert: 10, status: 'Critical' },
      { id: 'INV-003', sku: 'SKU-0099', name: 'Denim Jacket - M Black', category: 'Apparel', totalStock: 8, amazon: 3, flipkart: 2, meesho: 1, shopify: 2, minAlert: 15, status: 'Low Stock' },
    ];
  }

  @Put('sync')
  async updateStock(@Body() body: any) {
    return { success: true, sku: body.sku, updatedStock: body.stock, syncLatencyMs: 12 };
  }
}

@Module({
  controllers: [InventoryController],
})
export class InventoryModule {}
