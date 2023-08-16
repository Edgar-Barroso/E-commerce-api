"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderCode_1 = require("@/domain/entity/OrderCode");
test("Deve criar um código de pedido", () => {
    const date = new Date("2023-10-01");
    const sequence = 1;
    const orderCode = new OrderCode_1.OrderCode(date, sequence);
    const value = orderCode.value;
    expect(value).toBe("202300000001");
});
