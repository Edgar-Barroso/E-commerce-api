import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";
import { SaveStockInput } from "./SaveStockInput";
import { StockEntry } from "@/domain/entity/StockEntry";

export class SaveStock{
    stockEntryRepository: StockEntryRepository;
    constructor(readonly repositoryFactory:RepositoryFactory){
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
    }

    async execute(input:SaveStockInput):Promise<void>{
        const stockEntry = new StockEntry(input.idItem,input.operation,input.quantity,input.date)
        await this.stockEntryRepository.save(stockEntry)
    }
}