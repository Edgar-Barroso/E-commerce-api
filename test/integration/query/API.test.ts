
import { OrderPlacedStockHandler } from "@/application/handler/OrderPlacedStockHandler";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { OrderRepository } from "@/domain/repository/OrderRepository";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";
import { Broker } from "@/infra/broker/Broker";
import OrderDAODatabase from "@/infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "@/infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "@/infra/factory/DatabaseRepositoryFactory";
import { FastifyAdapter } from "@/infra/http/FastifyAdapter";
import { Http } from "@/infra/http/Http";
import { RouteConfig } from "@/infra/http/RouteConfig";
import OrderRepositoryDatabase from "@/infra/repository/database/OrderRepositoryDatabase";
import request from "supertest";


let http:Http
let repositoryFactory:RepositoryFactory
let orderRepository:OrderRepository
let stockEntryRepository:StockEntryRepository

beforeAll(async ()=>{
  http = new FastifyAdapter()
  repositoryFactory = new DatabaseRepositoryFactory()
  const connection = PgPromiseConnectionAdapter.getInstance()
  orderRepository = repositoryFactory.createOrderRepository()
  stockEntryRepository = repositoryFactory.createStockEntryRepository()
  const orderDAO = new OrderDAODatabase(connection);
  const broker = new Broker()
  broker.register(new OrderPlacedStockHandler(repositoryFactory))
  new RouteConfig(http,repositoryFactory,orderDAO,broker)
  http.listen(7777)
})

afterAll(()=>{
  http.close()
})

afterEach(async () => {
	await orderRepository.clear();
  await stockEntryRepository.clear()
});

test("Deve testar /orders (POST)", async () => {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2023-01-01"),
    coupon: "VALE20",
  };
  const response = await request("http://localhost:7777")
    .post("/orders")
    .send(input);
  expect(response.statusCode).toBe(200);
  expect(response.body.total).toBe(138);
});

test("Deve testar /simulateFreight (POST)", async () => {
  const input = {
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
  };
  const response = await request("http://localhost:7777")
    .post("/simulateFreight")
    .send(input);
  expect(response.statusCode).toBe(200);
  expect(response.body.amount).toBe(260);
});
