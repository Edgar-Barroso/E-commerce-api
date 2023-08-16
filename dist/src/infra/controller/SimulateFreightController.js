"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulateFreightController = void 0;
const DefaultFreightCalculator_1 = require("@/domain/entity/DefaultFreightCalculator");
const DatabaseRepositoryFactory_1 = require("../factory/DatabaseRepositoryFactory");
const SimulateFreight_1 = require("@/application/usecase/simulate_freight/SimulateFreight");
class SimulateFreightController {
    async execute(params, body) {
        const repositoryFactory = new DatabaseRepositoryFactory_1.DatabaseRepositoryFactory();
        const freightCalculator = new DefaultFreightCalculator_1.DefaultFreightCalculator();
        const simulateFreight = new SimulateFreight_1.SimulateFreight(repositoryFactory, freightCalculator);
        const input = body;
        return await simulateFreight.execute(input);
    }
}
exports.SimulateFreightController = SimulateFreightController;
