import { StockEntry } from "../entity/StockEntry";

export class StockCalculator{

    calculate(stockEntries:StockEntry[]){
        let total = 0;
        for(const stockEntry of stockEntries){
            if(stockEntry.oparation==="in") total+=stockEntry.quantity
            if(stockEntry.oparation==="out") total-=stockEntry.quantity
        }
        return total
    }
}