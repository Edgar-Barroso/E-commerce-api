"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCoupon = void 0;
const ValidateCoupontOutput_1 = require("./ValidateCoupontOutput");
class ValidateCoupon {
    constructor(repositoryFactory) {
        this.couponRepository = repositoryFactory.createCouponRepository();
    }
    async execute(input) {
        const coupon = await this.couponRepository.findByCode(input.code);
        if (!coupon)
            throw new Error("Coupon not found");
        const isValid = coupon.isValid(new Date());
        const output = new ValidateCoupontOutput_1.ValidateCouponOutput(isValid);
        return output;
    }
}
exports.ValidateCoupon = ValidateCoupon;
