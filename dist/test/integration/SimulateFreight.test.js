"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimulateFreight_1 = require("@/application/usecase/simulate_freight/SimulateFreight");
const SimulateFreightInput_1 = require("@/application/usecase/simulate_freight/SimulateFreightInput");
const DefaultFreightCalculator_1 = require("@/domain/entity/DefaultFreightCalculator");
const DatabaseRepositoryFactory_1 = require("@/infra/factory/DatabaseRepositoryFactory");
test("Deve simular o frete dos itens", async () => {
    const freightCalculator = new DefaultFreightCalculator_1.DefaultFreightCalculator();
    const repositoryFactory = new DatabaseRepositoryFactory_1.DatabaseRepositoryFactory();
    const simulateFreight = new SimulateFreight_1.SimulateFreight(repositoryFactory, freightCalculator);
    const input = new SimulateFreightInput_1.SimulateFreightInput([
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
    ]);
    const output = await simulateFreight.execute(input);
    expect(output.amount).toBe(260);
});
