import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";
import { StockCalculator } from "@/domain/services/StockCalculator";
import { GetStockInput } from "./GetStockInput";

export class GetStock{
    stockEntryRepository:StockEntryRepository

    constructor(repositoryFactory:RepositoryFactory){
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
    }
    async execute(input:GetStockInput):Promise<number>{
        const stockEntries = await this.stockEntryRepository.getByIdItem(input.idItem)
        const calculator = new StockCalculator()
        return calculator.calculate(stockEntries)
    }
}