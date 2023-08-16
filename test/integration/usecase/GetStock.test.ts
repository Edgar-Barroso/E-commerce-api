import { GetStock } from "@/application/usecase/get_stock/GetStock";
import { GetStockInput } from "@/application/usecase/get_stock/GetStockInput";
import { SaveStock } from "@/application/usecase/save_stock/SaveStock";
import { SaveStockInput } from "@/application/usecase/save_stock/SaveStockInput";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";
import PgPromiseConnectionAdapter from "@/infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "@/infra/factory/DatabaseRepositoryFactory"
import { StockEntryRepositoryDatabase } from "@/infra/repository/database/StockEntryRepositoryDatabase";

let repositoryFactory:RepositoryFactory
let stockEntryRepository: StockEntryRepository



beforeAll(()=>{
    repositoryFactory = new DatabaseRepositoryFactory()
    stockEntryRepository = repositoryFactory.createStockEntryRepository()
})

afterEach(async ()=>{
    await stockEntryRepository.clear()
})

test("Deve obter o estoque de um item",async ()=>{
    const saveStock = new SaveStock(repositoryFactory)
    const saveStockInput = new SaveStockInput(1,"in",10)
    await saveStock.execute(saveStockInput)
    const getStock = new GetStock(repositoryFactory)
    const input = new GetStockInput(1)
    const total = await getStock.execute(input);
    expect(total).toBe(10)
})

