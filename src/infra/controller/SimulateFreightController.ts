import { DefaultFreightCalculator } from "@/domain/services/DefaultFreightCalculator";
import { DatabaseRepositoryFactory } from "../factory/DatabaseRepositoryFactory";
import { SimulateFreight } from "@/application/usecase/simulate_freight/SimulateFreight";

export class SimulateFreightController {
  async execute(params: any, body: any) {
    const repositoryFactory = new DatabaseRepositoryFactory();
    const freightCalculator = new DefaultFreightCalculator();
    const simulateFreight = new SimulateFreight(
      repositoryFactory,
      freightCalculator
    );
    const input = body;
    return await simulateFreight.execute(input);
  }
}
