import { StockEntry } from "@/domain/entity/StockEntry";
import { StockCalculator } from "@/domain/services/StockCalculator";

test("Deva calcular o estoque disponivel para um item",()=>{
    const calculator = new StockCalculator();

    const stockEntries = [
        new StockEntry(1,'in',10,new Date("2022-07-01T10:O0:00")),
        new StockEntry(1,'out',5,new Date("2022-07-02T10:O0:00"))

    ]

    const total = calculator.calculate(stockEntries)
    expect(total).toBe(5)
})