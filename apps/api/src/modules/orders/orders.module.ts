import { Module, Controller, Get, Post, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  async getOrders() {
    return [
      { id: '#AMZ-28471', platform: 'A', platformName: 'Amazon', platformColor: '#FF9900', sku: 'SKU-0041', product: 'Cotton Kurti - Blue XL', qty: 2, amount: 1198, status: 'Label Ready', date: '08 Sep 12:34', customer: 'Aarav Sharma', city: 'Mumbai, MH', fee: 167, netProfit: 450 },
      { id: '#FLK-19284', platform: 'F', platformName: 'Flipkart', platformColor: '#2874F0', sku: 'SKU-0088', product: 'Steel Water Bottle 1L', qty: 1, amount: 549, status: 'Processing', date: '08 Sep 12:28', customer: 'Priya Patel', city: 'Ahmedabad, GJ', fee: 76, netProfit: 210 },
      { id: '#MSH-44712', platform: 'M', platformName: 'Meesho', platformColor: '#9B1FE8', sku: 'SKU-0021', product: 'Printed Saree - Green', qty: 1, amount: 899, status: 'Label Ready', date: '08 Sep 12:10', customer: 'Vikram Singh', city: 'Jaipur, RJ', fee: 45, netProfit: 390 },
      { id: '#SHO-77123', platform: 'S', platformName: 'Shopify', platformColor: '#96BF48', sku: 'SKU-0064', product: 'Ceramic Coffee Mug', qty: 3, amount: 1047, status: 'Shipped', date: '08 Sep 11:55', customer: 'Ananya Roy', city: 'Kolkata, WB', fee: 31, netProfit: 520 },
    ];
  }

  @Post('sync')
  async syncOrders() {
    return { success: true, message: 'Platform sync triggered', syncedCount: 42, timestamp: new Date().toISOString() };
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return {
      id,
      platform: 'Amazon',
      status: 'Label Ready',
      customer: { name: 'Aarav Sharma', address: 'House #102, Green Park Avenue', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', phone: '+91 98200 11223' },
      items: [{ name: 'Cotton Kurti - Blue XL', sku: 'SKU-0041', qty: 2, price: 1198 }],
      financials: { sellingPrice: 1198, platformFee: 167, shipping: 85, cogs: 496, netProfit: 450 },
    };
  }
}

@Module({
  controllers: [OrdersController],
})
export class OrdersModule {}
