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
exports.InventoryModule = exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
let InventoryController = (() => {
    let _classDecorators = [(0, common_1.Controller)('inventory')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getInventory_decorators;
    let _updateStock_decorators;
    var InventoryController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getInventory_decorators = [(0, common_1.Get)()];
            _updateStock_decorators = [(0, common_1.Put)('sync')];
            __esDecorate(this, null, _getInventory_decorators, { kind: "method", name: "getInventory", static: false, private: false, access: { has: obj => "getInventory" in obj, get: obj => obj.getInventory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateStock_decorators, { kind: "method", name: "updateStock", static: false, private: false, access: { has: obj => "updateStock" in obj, get: obj => obj.updateStock }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            InventoryController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async getInventory() {
            return [
                { id: 'INV-001', sku: 'SKU-0041', name: 'Cotton Kurti - Blue XL', category: 'Apparel', totalStock: 45, amazon: 15, flipkart: 12, meesho: 10, shopify: 8, minAlert: 20, status: 'In Stock' },
                { id: 'INV-002', sku: 'SKU-0012', name: 'Silk Saree - Red Gold', category: 'Apparel', totalStock: 3, amazon: 1, flipkart: 1, meesho: 1, shopify: 0, minAlert: 10, status: 'Critical' },
                { id: 'INV-003', sku: 'SKU-0099', name: 'Denim Jacket - M Black', category: 'Apparel', totalStock: 8, amazon: 3, flipkart: 2, meesho: 1, shopify: 2, minAlert: 15, status: 'Low Stock' },
            ];
        }
        async updateStock(body) {
            return { success: true, sku: body.sku, updatedStock: body.stock, syncLatencyMs: 12 };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return InventoryController = _classThis;
})();
exports.InventoryController = InventoryController;
let InventoryModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            controllers: [InventoryController],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InventoryModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            InventoryModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return InventoryModule = _classThis;
})();
exports.InventoryModule = InventoryModule;
//# sourceMappingURL=inventory.module.js.map