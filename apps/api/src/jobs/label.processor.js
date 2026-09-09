"use strict";
// ============================================================
// ZAIPIO — Label Auto-Download Job
// Runs daily at 12:00 IST (06:30 UTC) via BullMQ
// ============================================================
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelProcessor = exports.LABEL_CROP_JOB = exports.LABEL_AUTO_DOWNLOAD_JOB = exports.LABEL_QUEUE = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
exports.LABEL_QUEUE = 'label-queue';
exports.LABEL_AUTO_DOWNLOAD_JOB = 'auto-download';
exports.LABEL_CROP_JOB = 'crop';
let LabelProcessor = (() => {
    let _classDecorators = [(0, bull_1.Processor)(exports.LABEL_QUEUE)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleAutoDownload_decorators;
    let _handleCrop_decorators;
    var LabelProcessor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleAutoDownload_decorators = [(0, bull_1.Process)(exports.LABEL_AUTO_DOWNLOAD_JOB)];
            _handleCrop_decorators = [(0, bull_1.Process)(exports.LABEL_CROP_JOB)];
            __esDecorate(this, null, _handleAutoDownload_decorators, { kind: "method", name: "handleAutoDownload", static: false, private: false, access: { has: obj => "handleAutoDownload" in obj, get: obj => obj.handleAutoDownload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleCrop_decorators, { kind: "method", name: "handleCrop", static: false, private: false, access: { has: obj => "handleCrop" in obj, get: obj => obj.handleCrop }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LabelProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = (__runInitializers(this, _instanceExtraInitializers), new common_1.Logger(LabelProcessor.name));
        async handleAutoDownload(job) {
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
            }
            catch (error) {
                this.logger.error(`[Label] Auto-download FAILED | seller=${sellerId} | ${error}`);
                throw error; // BullMQ will retry based on job options
            }
        }
        async handleCrop(job) {
            const { sellerId, fileUrl, orderId } = job.data;
            this.logger.log(`[Label] Crop started | seller=${sellerId} order=${orderId}`);
            try {
                // Step 1: Download PDF from R2
                // Step 2: Use pdf-lib to crop label area
                // Step 3: Save cropped PDF back to R2
                // Step 4: Update order label status to 'cropped'
                // TODO: Implement cropping logic with pdf-lib
                this.logger.log(`[Label] Crop complete | order=${orderId}`);
            }
            catch (error) {
                this.logger.error(`[Label] Crop FAILED | order=${orderId} | ${error}`);
                throw error;
            }
        }
    };
    return LabelProcessor = _classThis;
})();
exports.LabelProcessor = LabelProcessor;
//# sourceMappingURL=label.processor.js.map