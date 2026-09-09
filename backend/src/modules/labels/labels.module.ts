import { Module, Controller, Get, Post } from '@nestjs/common';

@Controller('labels')
export class LabelsController {
  @Get('daily-batch')
  async getDailyBatch() {
    return {
      batchTime: '12:00 PM IST',
      status: 'Ready',
      totalLabels: 2847,
      platforms: { amazon: 1240, flipkart: 890, meesho: 410, shopify: 307 },
    };
  }

  @Post('crop')
  async cropLabels() {
    return {
      success: true,
      message: 'PDF Labels cropped and sorted by SKU successfully',
      downloadUrl: '/downloads/labels_cropped_batch_8847.pdf',
    };
  }
}

@Module({
  controllers: [LabelsController],
})
export class LabelsModule {}
