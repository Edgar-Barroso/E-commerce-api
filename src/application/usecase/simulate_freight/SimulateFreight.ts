import { ItemRepository } from "@/domain/repository/ItemRepository";
import { SimulateFreightInput } from "./SimulateFreightInput";
import { SimulateFreightOutput } from "./SimulateFreightOutput";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { FreightCalculator } from "@/domain/services/FreightCalculator";

export class SimulateFreight {
  itemRepository: ItemRepository
  freightCalculator:FreightCalculator

  constructor(
    repositoryFactory:RepositoryFactory,
    freightCalculator:FreightCalculator
  ) {
    this.freightCalculator = freightCalculator
    this.itemRepository = repositoryFactory.createItemRepository()
  }

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0;
    for (const inputItem of input.orderItems) {
      const item = await this.itemRepository.findById(inputItem.idItem);
      if (!item) throw new Error("Item not found")
      amount += this.freightCalculator.calculate(item) * inputItem.quantity;
      
    }

    const output = new SimulateFreightOutput(amount);
    return output;
  }
}
