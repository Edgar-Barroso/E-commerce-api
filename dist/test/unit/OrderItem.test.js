"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderItem_1 = require("@/domain/entity/OrderItem");
test("Deve criar um item do pedido", () => {
    const orderItem = new OrderItem_1.OrderItem(1, 1000, 10);
    expect(orderItem.getTotal()).toBe(10000);
});
