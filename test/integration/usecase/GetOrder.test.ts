import { OrderPlacedStockHandler } from "@/application/handler/OrderPlacedStockHandler";
import { GetOrder } from "@/application/query/get_order/GetOrder";
import { PlaceOrder } from "@/application/usecase/place_order/PlaceOrder";
import { OrderRepository } from "@/domain/repository/OrderRepository";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";
import { Broker } from "@/infra/broker/Broker";
import OrderDAODatabase from "@/infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "@/infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "@/infra/factory/DatabaseRepositoryFactory";


let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepository;
let stockEntryRepository:StockEntryRepository

beforeAll(()=>{
	const connection = PgPromiseConnectionAdapter.getInstance();
	const repositoryFactory = new DatabaseRepositoryFactory();
	orderRepository = repositoryFactory.createOrderRepository()
	stockEntryRepository = repositoryFactory.createStockEntryRepository()
	const orderDAO = new OrderDAODatabase(connection);
	const broker = new Broker()
    broker.register(new OrderPlacedStockHandler(repositoryFactory))
    placeOrder = new PlaceOrder(repositoryFactory,broker)
	getOrder = new GetOrder(orderDAO);
});

afterEach(async function () {
	await orderRepository.clear();
    await stockEntryRepository.clear();
});

test("Deve obter um pedido pelo código", async function () {
	const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 1, quantity: 1},
			{ idItem: 2, quantity: 1},
			{ idItem: 3, quantity: 3}
		],
		date: new Date("2021-12-10"),
		coupon: "VALE20"
	};
	const placeOrderOutput = await placeOrder.execute(input);
	const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
	expect(getOrderOutput.code).toBe("202100000001");
	expect(getOrderOutput.total).toBe(138);
});

