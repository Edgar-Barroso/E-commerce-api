import { Http } from "./Http";
import { PlaceOrderController } from "../controller/PlaceOrderController";
import { SimulateFreightController } from "../controller/SimulateFreightController";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import OrderDAO from "@/application/dao/OrderDAO";
import { Broker } from "../broker/Broker";

export class RouteConfig {
  constructor(http: Http,repositoryFactory:RepositoryFactory,orderDAO:OrderDAO,readonly broker:Broker) {
    http.on("/orders", "post", async (params: any, body: any) => {  
      const placeOrderController = new PlaceOrderController(repositoryFactory,broker)
      return await placeOrderController.execute(params,body)
    });

    http.on("/simulateFreight", "post", async (params: any, body: any) => {
      const simulateFreightController = new SimulateFreightController()
      return await simulateFreightController.execute(params,body)
    });
    
		http.on("/orders", "get", async function (params: any, body: any) {
			const getOrdersController = new GetOrdersController(orderDAO);
			return getOrdersController.execute(params, body);
		});

		http.on("/orders/:code", "get", async function (params: any, body: any) {
			const getOrderController = new GetOrderController(orderDAO);
			return getOrderController.execute(params, body);
		});

  }
}
