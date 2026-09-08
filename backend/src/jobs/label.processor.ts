// ============================================================
// ZAIPIO — Label Auto-Download Job
// Runs daily at 12:00 IST (06:30 UTC) via BullMQ
// ============================================================

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

export const LABEL_QUEUE = 'label-queue';
export const LABEL_AUTO_DOWNLOAD_JOB = 'auto-download';
export const LABEL_CROP_JOB = 'crop';

export interface LabelJobData {
  sellerId: string;
  platform: string;
  date: string;
}

@Processor(LABEL_QUEUE)
export class LabelProcessor {
  private readonly logger = new Logger(LabelProcessor.name);

  @Process(LABEL_AUTO_DOWNLOAD_JOB)
  async handleAutoDownload(job: Job<LabelJobData>) {
    const { sellerId, platform, date } = job.data;
    this.logger.log(`[Label] Auto-download started | seller=${sellerId} platform=${platform} date=${date}`);

    try {
      // Step 1: Fetch label PDF URLs from platform API
      // Step 2: Download PDFs and store in Cloudflare R2
      // Step 3: Update order records with label file URLs
      // Step 4: Mark label status as 'downloaded'
      // Step 5: Send WhatsApp/Telegram notification to seller

      // TODO: Implement per platform (Shopify first)
      this.logger.log(`[Label] Auto-download complete | seller=${sellerId}`);
    } catch (error) {
      this.logger.error(`[Label] Auto-download FAILED | seller=${sellerId} | ${error}`);
      throw error; // BullMQ will retry based on job options
    }
  }

  @Process(LABEL_CROP_JOB)
  async handleCrop(job: Job<{ sellerId: string; fileUrl: string; orderId: string }>) {
    const { sellerId, fileUrl, orderId } = job.data;
    this.logger.log(`[Label] Crop started | seller=${sellerId} order=${orderId}`);

    try {
      // Step 1: Download PDF from R2
      // Step 2: Use pdf-lib to crop label area
      // Step 3: Save cropped PDF back to R2
      // Step 4: Update order label status to 'cropped'

      // TODO: Implement cropping logic with pdf-lib
      this.logger.log(`[Label] Crop complete | order=${orderId}`);
    } catch (error) {
      this.logger.error(`[Label] Crop FAILED | order=${orderId} | ${error}`);
      throw error;
    }
  }
}
