"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = require("@/domain/entity/Coupon");
test("Deve criar um cupom de desconto válido", () => {
    const coupon = new Coupon_1.Coupon("VALE20", 20, new Date("2023-01-01"));
    const today = new Date("2022-01-01");
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});
test("Deve criar um cupom de desconto expirado", () => {
    const coupon = new Coupon_1.Coupon("VALE20", 20, new Date("2022-01-01"));
    const isExpired = coupon.isExpired(new Date("2023-01-01"));
    expect(isExpired).toBeTruthy();
});
test("Deve criar um cupom de desconto válido e calcular o desconto", () => {
    const coupon = new Coupon_1.Coupon("VALE20", 20, new Date("2023-01-01"));
    const discount = coupon.calculateDiscount(1000, new Date("2022-01-01"));
    expect(discount).toBe(200);
});
