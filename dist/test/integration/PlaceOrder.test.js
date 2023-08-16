"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = require("@/application/usecase/place_order/PlaceOrder");
const PlaceOrderInput_1 = require("@/application/usecase/place_order/PlaceOrderInput");
const SqliteConnectionAdapter_1 = require("@/infra/database/SqliteConnectionAdapter");
const DatabaseRepositoryFactory_1 = require("@/infra/factory/DatabaseRepositoryFactory");
const OrderRepositoryDatabase_1 = require("@/infra/repository/database/OrderRepositoryDatabase");
let placeOrder;
let orderRepository;
beforeEach(() => {
    const connection = SqliteConnectionAdapter_1.SqliteConnectionAdapter.getInstance();
    orderRepository = new OrderRepositoryDatabase_1.OrderRepositoryDatabase(connection);
    const repositoryFactory = new DatabaseRepositoryFactory_1.DatabaseRepositoryFactory();
    placeOrder = new PlaceOrder_1.PlaceOrder(repositoryFactory);
});
test("Deve fazer um pedido", async () => {
    const input = new PlaceOrderInput_1.PlaceOrderInput("839.435.452-10", [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
    ], new Date("2023-01-01"), "VALE20");
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(138);
});
test("Deve fazer um pedido com cálculo de frete", async () => {
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
        date: new Date("2023-01-01"),
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
});
test("Deve fazer um pedido com código", async () => {
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
        date: new Date("2023-10-01"),
    };
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202300000001");
});
afterEach(async () => {
    await orderRepository.clear();
});
