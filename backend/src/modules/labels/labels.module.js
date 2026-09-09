"use strict";
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
exports.LabelsModule = exports.LabelsController = void 0;
const common_1 = require("@nestjs/common");
let LabelsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('labels')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getDailyBatch_decorators;
    let _cropLabels_decorators;
    var LabelsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getDailyBatch_decorators = [(0, common_1.Get)('daily-batch')];
            _cropLabels_decorators = [(0, common_1.Post)('crop')];
            __esDecorate(this, null, _getDailyBatch_decorators, { kind: "method", name: "getDailyBatch", static: false, private: false, access: { has: obj => "getDailyBatch" in obj, get: obj => obj.getDailyBatch }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cropLabels_decorators, { kind: "method", name: "cropLabels", static: false, private: false, access: { has: obj => "cropLabels" in obj, get: obj => obj.cropLabels }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LabelsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async getDailyBatch() {
            return {
                batchTime: '12:00 PM IST',
                status: 'Ready',
                totalLabels: 2847,
                platforms: { amazon: 1240, flipkart: 890, meesho: 410, shopify: 307 },
            };
        }
        async cropLabels() {
            return {
                success: true,
                message: 'PDF Labels cropped and sorted by SKU successfully',
                downloadUrl: '/downloads/labels_cropped_batch_8847.pdf',
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return LabelsController = _classThis;
})();
exports.LabelsController = LabelsController;
let LabelsModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            controllers: [LabelsController],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LabelsModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LabelsModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return LabelsModule = _classThis;
})();
exports.LabelsModule = LabelsModule;
//# sourceMappingURL=labels.module.js.map