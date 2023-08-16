"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const Cpf_1 = require("./Cpf");
const DefaultFreightCalculator_1 = require("./DefaultFreightCalculator");
const OrderCode_1 = require("./OrderCode");
const OrderItem_1 = require("./OrderItem");
class Order {
    constructor(cpf, date = new Date(), freightCalculator = new DefaultFreightCalculator_1.DefaultFreightCalculator(), sequence = 1) {
        this.date = date;
        this.freightCalculator = freightCalculator;
        this.sequence = sequence;
        this.cpf = new Cpf_1.Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
        this.code = new OrderCode_1.OrderCode(date, sequence);
    }
    getOrderItems() {
        return [...this.orderItems];
    }
    getCpf() {
        return this.cpf.value;
    }
    getCode() {
        return this.code.value;
    }
    addItem(item, quantity) {
        this.freight += this.freightCalculator.calculate(item) * quantity;
        this.orderItems.push(new OrderItem_1.OrderItem(item.idItem, item.price, quantity));
    }
    addCoupon(coupon) {
        if (!coupon.isValid(this.date))
            return;
        this.coupon = coupon;
    }
    getFreight() {
        return this.freight;
    }
    getTotal() {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= this.coupon.calculateDiscount(total, this.date);
        }
        total += this.getFreight();
        return total;
    }
}
exports.Order = Order;
