"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRepositoryMemory = void 0;
const Coupon_1 = require("@/domain/entity/Coupon");
class CouponRepositoryMemory {
    constructor() {
        this.items = [
            new Coupon_1.Coupon("VALE20", 20)
        ];
    }
    async findByCode(code) {
        return this.items.find(item => item.code === code);
    }
}
exports.CouponRepositoryMemory = CouponRepositoryMemory;
