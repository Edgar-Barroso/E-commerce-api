import { StockEntry } from "@/domain/entity/StockEntry";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";

    export class StockEntryRepositoryMemory implements StockEntryRepository{
        stockEntries: StockEntry[];
        constructor(){
            this.stockEntries = []
        }
        async getByIdItem(idItem: number): Promise<StockEntry[]> {
            return await this.stockEntries.filter(item=>item.idItem===idItem)
        }
        async save(stockEntry: StockEntry): Promise<void> {
            this.stockEntries.push(stockEntry)
        }

        async clear(): Promise<void> {
            this.stockEntries=[]
        }


    }