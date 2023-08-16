import { SimulateFreight } from "@/application/usecase/simulate_freight/SimulateFreight"
import { SimulateFreightInput } from "@/application/usecase/simulate_freight/SimulateFreightInput"
import { DefaultFreightCalculator } from "@/domain/services/DefaultFreightCalculator"
import { DatabaseRepositoryFactory } from "@/infra/factory/DatabaseRepositoryFactory"

test("Deve simular o frete dos itens",async ()=>{
    const freightCalculator = new DefaultFreightCalculator()
    const repositoryFactory = new DatabaseRepositoryFactory()
    const simulateFreight = new SimulateFreight(repositoryFactory,freightCalculator)
    const input = new SimulateFreightInput(
        [
            {idItem:4 ,quantity:1},
            {idItem:5 ,quantity:1},
            {idItem:6 ,quantity:3},
        ]
    )
    const output = await simulateFreight.execute(input)
    expect(output.amount).toBe(260)
})