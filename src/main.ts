import { OrderPlacedStockHandler } from "./application/handler/OrderPlacedStockHandler";
import { Broker } from "./infra/broker/Broker";
import OrderDAODatabase from "./infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import { FastifyAdapter } from "./infra/http/FastifyAdapter";
import { RouteConfig } from "./infra/http/RouteConfig";
import dotenv from 'dotenv';
dotenv.config();

const http = new FastifyAdapter()
const repositoryFactory = new DatabaseRepositoryFactory()
const connection = PgPromiseConnectionAdapter.getInstance();
const orderDAO = new OrderDAODatabase(connection);
const broker = new Broker()
broker.register(new OrderPlacedStockHandler(repositoryFactory))
new RouteConfig(http,repositoryFactory,orderDAO,broker)
http.listen(7777)
