"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
class Coupon {
    constructor(code, percentage, expireDate = new Date()) {
        this.code = code;
        this.percentage = percentage;
        this.expireDate = expireDate;
    }
    isValid(date = new Date()) {
        return this.expireDate.getTime() >= date.getTime();
    }
    isExpired(date = new Date()) {
        return !this.isValid(date);
    }
    calculateDiscount(amount, date = new Date()) {
        if (this.isExpired(date))
            return 0;
        return (amount * this.percentage) / 100;
    }
}
exports.Coupon = Coupon;
