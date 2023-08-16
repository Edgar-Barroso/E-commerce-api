"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrderController = void 0;
const PlaceOrder_1 = require("@/application/usecase/place_order/PlaceOrder");
class PlaceOrderController {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    async execute(params, body) {
        const placeOrder = new PlaceOrder_1.PlaceOrder(this.repositoryFactory);
        const input = body;
        input.date = new Date(input.date);
        return await placeOrder.execute(input);
    }
}
exports.PlaceOrderController = PlaceOrderController;
