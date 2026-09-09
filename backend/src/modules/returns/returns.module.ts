import { Module, Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiResponse } from '@zaipio/shared';

@Controller('returns')
export class ReturnsController {
  @Get()
  async getReturns(): Promise<ApiResponse<any[]>> {
    const returnsList = [
      { id: 'RET-401', orderId: '#AMZ-28471', customer: 'Aarav Sharma', sku: 'SKU-0041', reason: 'Size too small', status: 'RTO In-Transit', platform: 'Amazon', date: '08 Sep 2026', refundAmount: 1198, videoProofAttached: true },
      { id: 'RET-402', orderId: '#FK-92812', customer: 'Priya Patel', sku: 'SKU-0012', reason: 'Defective item', status: 'Received & Inspected', platform: 'Flipkart', date: '07 Sep 2026', refundAmount: 549, videoProofAttached: true },
      { id: 'RET-403', orderId: '#MSH-11029', customer: 'Vikram Singh', sku: 'SKU-0099', reason: 'Customer non-contactable', status: 'RTO Initiated', platform: 'Meesho', date: '06 Sep 2026', refundAmount: 899, videoProofAttached: false },
      { id: 'RET-404', orderId: '#SHO-77111', customer: 'Ananya Roy', sku: 'SKU-0039', reason: 'Damaged in transit', status: 'Claim Filed', platform: 'Shopify', date: '05 Sep 2026', refundAmount: 1450, videoProofAttached: true },
    ];
    return { success: true, data: returnsList };
  }

  @Post('claims/submit')
  async submitClaim(@Body() body: { returnId: string; reason: string; videoUrl?: string }): Promise<ApiResponse<{ claimId: string; status: string }>> {
    return {
      success: true,
      message: 'Damage claim filed successfully with VMS video proof attachment.',
      data: {
        claimId: `CLM-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'PENDING_APPROVAL',
      },
    };
  }

  @Get('claims')
  async getClaims(): Promise<ApiResponse<any[]>> {
    return {
      success: true,
      data: [
        { claimId: 'CLM-882109', orderId: '#AMZ-28471', platform: 'Amazon', amount: 1198, status: 'APPROVED', date: '08 Sep 2026', videoProof: 'VMS_PROOF_AMZ_28471.mp4' },
        { claimId: 'CLM-991204', orderId: '#SHO-77111', platform: 'Shopify', amount: 1450, status: 'UNDER_REVIEW', date: '05 Sep 2026', videoProof: 'VMS_PROOF_SHO_77111.mp4' },
      ],
    };
  }
}

@Module({
  controllers: [ReturnsController],
})
export class ReturnsModule {}
