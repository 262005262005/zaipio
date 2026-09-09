import { Module, Controller, Get } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  @Get('reconcile')
  async getReconciliation() {
    return {
      totalSettledMonth: 485400,
      pendingSettlements: 62180,
      platformFees: 68240,
      discrepancyAlerts: 0,
      recentBatches: [
        { id: 'PAY-8910', date: '08 Sep 2026', platform: 'Amazon', gross: '₹14,250', commission: '₹1,995', shipping: '₹850', netSettlement: '₹11,405', status: 'Settled' },
        { id: 'PAY-8911', date: '07 Sep 2026', platform: 'Flipkart', gross: '₹22,100', commission: '₹3,094', shipping: '₹1,320', netSettlement: '₹17,686', status: 'Settled' },
      ],
    };
  }
}

@Module({
  controllers: [PaymentsController],
})
export class PaymentsModule {}
