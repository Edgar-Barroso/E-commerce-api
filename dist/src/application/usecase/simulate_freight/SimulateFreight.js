"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulateFreight = void 0;
const SimulateFreightOutput_1 = require("./SimulateFreightOutput");
class SimulateFreight {
    constructor(repositoryFactory, freightCalculator) {
        this.freightCalculator = freightCalculator;
        this.itemRepository = repositoryFactory.createItemRepository();
    }
    async execute(input) {
        let amount = 0;
        for (const inputItem of input.orderItems) {
            const item = await this.itemRepository.findById(inputItem.idItem);
            if (!item)
                throw new Error("Item not found");
            amount += this.freightCalculator.calculate(item) * inputItem.quantity;
        }
        const output = new SimulateFreightOutput_1.SimulateFreightOutput(amount);
        return output;
    }
}
exports.SimulateFreight = SimulateFreight;
