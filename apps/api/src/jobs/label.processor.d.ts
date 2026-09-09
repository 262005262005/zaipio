import { Job } from 'bull';
export declare const LABEL_QUEUE = "label-queue";
export declare const LABEL_AUTO_DOWNLOAD_JOB = "auto-download";
export declare const LABEL_CROP_JOB = "crop";
export interface LabelJobData {
    sellerId: string;
    platform: string;
    date: string;
}
export declare class LabelProcessor {
    private readonly logger;
    handleAutoDownload(job: Job<LabelJobData>): Promise<void>;
    handleCrop(job: Job<{
        sellerId: string;
        fileUrl: string;
        orderId: string;
    }>): Promise<void>;
}
//# sourceMappingURL=label.processor.d.ts.map