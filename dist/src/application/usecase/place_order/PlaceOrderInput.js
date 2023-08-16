"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrderInput = void 0;
class PlaceOrderInput {
    constructor(cpf, orderItems, date, coupon) {
        this.cpf = cpf;
        this.orderItems = orderItems;
        this.date = date;
        this.coupon = coupon;
    }
}
exports.PlaceOrderInput = PlaceOrderInput;
