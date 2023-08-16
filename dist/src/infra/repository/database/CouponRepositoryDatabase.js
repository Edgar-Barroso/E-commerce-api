"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRepositoryDatabase = void 0;
const Coupon_1 = require("@/domain/entity/Coupon");
class CouponRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    async findByCode(code) {
        const [couponData] = await this.connection.query("select * from ccca_coupon where code = $1", [code]);
        if (!couponData)
            return undefined;
        return new Coupon_1.Coupon(couponData.code, couponData.percentage, new Date(couponData.expire_date));
    }
}
exports.CouponRepositoryDatabase = CouponRepositoryDatabase;
