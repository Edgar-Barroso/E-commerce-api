"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryRepositoryFactory = void 0;
const OrderRepositoryMemory_1 = require("../repository/memory/OrderRepositoryMemory");
const ItemRepositoryMemory_1 = require("../repository/memory/ItemRepositoryMemory");
const CouponRepositoryMemory_1 = require("../repository/memory/CouponRepositoryMemory");
class MemoryRepositoryFactory {
    createOrderRepository() {
        return new OrderRepositoryMemory_1.OrderRepositoryMemory();
    }
    createItemRepository() {
        return new ItemRepositoryMemory_1.ItemRepositoryMemory();
    }
    createCouponRepository() {
        return new CouponRepositoryMemory_1.CouponRepositoryMemory();
    }
}
exports.MemoryRepositoryFactory = MemoryRepositoryFactory;
