import { OrderPlacedStockHandler } from "@/application/handler/OrderPlacedStockHandler"
import { GetStock } from "@/application/usecase/get_stock/GetStock"
import { PlaceOrder } from "@/application/usecase/place_order/PlaceOrder"
import { PlaceOrderInput } from "@/application/usecase/place_order/PlaceOrderInput"
import { OrderRepository } from "@/domain/repository/OrderRepository"
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository"
import { Broker } from "@/infra/broker/Broker"
import PgPromiseConnectionAdapter from "@/infra/database/PgPromiseConnectionAdapter"
import { DatabaseRepositoryFactory } from "@/infra/factory/DatabaseRepositoryFactory"
import OrderRepositoryDatabase from "@/infra/repository/database/OrderRepositoryDatabase"

let placeOrder:PlaceOrder
let getStock:GetStock
let orderRepository:OrderRepository
let stockEntryRepository:StockEntryRepository

beforeAll(()=>{
    const repositoryFactory = new DatabaseRepositoryFactory()
    orderRepository = repositoryFactory.createOrderRepository()
    stockEntryRepository = repositoryFactory.createStockEntryRepository()
    const broker = new Broker()
    broker.register(new OrderPlacedStockHandler(repositoryFactory))
    placeOrder = new PlaceOrder(repositoryFactory,broker)
    getStock = new GetStock(repositoryFactory)

})

afterEach(async () => {
	await orderRepository.clear();
    await stockEntryRepository.clear();
})
test("Deve fazer um pedido",async ()=>{
    const input = new PlaceOrderInput(
        "839.435.452-10",
        [
            {idItem:1 ,quantity:1},
            {idItem:2 ,quantity:1},
            {idItem:3 ,quantity:3},
        ],
        new Date("2023-01-11"),
        "VALE20"
    )
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(138)
})

test("Deve fazer um pedido com cálculo de frete",async ()=>{
    const input = {
        cpf:"839.435.452-10",
        orderItems:[
            {idItem:4 ,quantity:1},
            {idItem:5 ,quantity:1},
            {idItem:6 ,quantity:3},
        ],
        date:new Date("2023-01-01"),
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(6350)
})

test("Deve fazer um pedido com código",async ()=>{
    const input = {
        cpf:"839.435.452-10",
        orderItems:[
            {idItem:4 ,quantity:1},
            {idItem:5 ,quantity:1},
            {idItem:6 ,quantity:3},
        ],
        date:new Date("2023-10-01"),
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe("202300000001")
})


test("Deve fazer um pedido e retirar do estoque",async ()=>{
    const input = {
        cpf:"839.435.452-10",
        orderItems:[
            {idItem:4 ,quantity:1},
            {idItem:5 ,quantity:1},
            {idItem:6 ,quantity:3},
        ],
        date:new Date("2023-10-01"),
    }
    await placeOrder.execute(input)
    const total = await getStock.execute({idItem:4})
    expect(total).toBe(-1)

})

