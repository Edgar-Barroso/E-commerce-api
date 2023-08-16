"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrder = void 0;
const Order_1 = require("@/domain/entity/Order");
const PlaceOrderOutput_1 = require("./PlaceOrderOutput");
const DefaultFreightCalculator_1 = require("@/domain/entity/DefaultFreightCalculator");
class PlaceOrder {
    constructor(repositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
    }
    async execute(input) {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order_1.Order(input.cpf, input.date, new DefaultFreightCalculator_1.DefaultFreightCalculator(), sequence);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            if (!item)
                throw new Error("Item not Found");
            order.addItem(item, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon);
            if (coupon)
                order.addCoupon(coupon);
        }
        await this.orderRepository.save(order);
        const total = order.getTotal();
        const output = new PlaceOrderOutput_1.PlaceOrderOutput(order.getCode(), total);
        return output;
    }
}
exports.PlaceOrder = PlaceOrder;
