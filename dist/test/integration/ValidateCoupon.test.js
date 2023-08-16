"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateCoupon_1 = require("@/application/usecase/validate_coupom/ValidateCoupon");
const ValidateCouponInput_1 = require("@/application/usecase/validate_coupom/ValidateCouponInput");
const DatabaseRepositoryFactory_1 = require("@/infra/factory/DatabaseRepositoryFactory");
let validateCoupon;
beforeEach(() => {
    const repositoryFactory = new DatabaseRepositoryFactory_1.DatabaseRepositoryFactory();
    validateCoupon = new ValidateCoupon_1.ValidateCoupon(repositoryFactory);
});
test("Deve validar um cupom de desconto válido", async () => {
    const input = new ValidateCouponInput_1.ValidateCouponInput("VALE20");
    const output = await validateCoupon.execute(input);
    expect(output.isValid).toBe(true);
});
test("Deve validar um cupom de desconto expirado", async () => {
    const input = new ValidateCouponInput_1.ValidateCouponInput("VALE20_EXPIRED");
    const output = await validateCoupon.execute(input);
    expect(output.isValid).toBe(false);
});
test("Deve levantar um erro ao receber um cupom que não existe", async () => {
    const input = new ValidateCouponInput_1.ValidateCouponInput("COUPOM_NOT_FOUND");
    await expect(validateCoupon.execute(input)).rejects.toThrow(new Error("Coupon not found"));
});
