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
exports.OrdersModule = exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
let OrdersController = (() => {
    let _classDecorators = [(0, common_1.Controller)('orders')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getOrders_decorators;
    let _syncOrders_decorators;
    let _getOrderById_decorators;
    var OrdersController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getOrders_decorators = [(0, common_1.Get)()];
            _syncOrders_decorators = [(0, common_1.Post)('sync')];
            _getOrderById_decorators = [(0, common_1.Get)(':id')];
            __esDecorate(this, null, _getOrders_decorators, { kind: "method", name: "getOrders", static: false, private: false, access: { has: obj => "getOrders" in obj, get: obj => obj.getOrders }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _syncOrders_decorators, { kind: "method", name: "syncOrders", static: false, private: false, access: { has: obj => "syncOrders" in obj, get: obj => obj.syncOrders }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getOrderById_decorators, { kind: "method", name: "getOrderById", static: false, private: false, access: { has: obj => "getOrderById" in obj, get: obj => obj.getOrderById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OrdersController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async getOrders() {
            return [
                { id: '#AMZ-28471', platform: 'A', platformName: 'Amazon', platformColor: '#FF9900', sku: 'SKU-0041', product: 'Cotton Kurti - Blue XL', qty: 2, amount: 1198, status: 'Label Ready', date: '08 Sep 12:34', customer: 'Aarav Sharma', city: 'Mumbai, MH', fee: 167, netProfit: 450 },
                { id: '#FLK-19284', platform: 'F', platformName: 'Flipkart', platformColor: '#2874F0', sku: 'SKU-0088', product: 'Steel Water Bottle 1L', qty: 1, amount: 549, status: 'Processing', date: '08 Sep 12:28', customer: 'Priya Patel', city: 'Ahmedabad, GJ', fee: 76, netProfit: 210 },
                { id: '#MSH-44712', platform: 'M', platformName: 'Meesho', platformColor: '#9B1FE8', sku: 'SKU-0021', product: 'Printed Saree - Green', qty: 1, amount: 899, status: 'Label Ready', date: '08 Sep 12:10', customer: 'Vikram Singh', city: 'Jaipur, RJ', fee: 45, netProfit: 390 },
                { id: '#SHO-77123', platform: 'S', platformName: 'Shopify', platformColor: '#96BF48', sku: 'SKU-0064', product: 'Ceramic Coffee Mug', qty: 3, amount: 1047, status: 'Shipped', date: '08 Sep 11:55', customer: 'Ananya Roy', city: 'Kolkata, WB', fee: 31, netProfit: 520 },
            ];
        }
        async syncOrders() {
            return { success: true, message: 'Platform sync triggered', syncedCount: 42, timestamp: new Date().toISOString() };
        }
        async getOrderById(id) {
            return {
                id,
                platform: 'Amazon',
                status: 'Label Ready',
                customer: { name: 'Aarav Sharma', address: 'House #102, Green Park Avenue', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', phone: '+91 98200 11223' },
                items: [{ name: 'Cotton Kurti - Blue XL', sku: 'SKU-0041', qty: 2, price: 1198 }],
                financials: { sellingPrice: 1198, platformFee: 167, shipping: 85, cogs: 496, netProfit: 450 },
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return OrdersController = _classThis;
})();
exports.OrdersController = OrdersController;
let OrdersModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            controllers: [OrdersController],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OrdersModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OrdersModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return OrdersModule = _classThis;
})();
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map