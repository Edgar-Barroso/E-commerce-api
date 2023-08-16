"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteConfig = void 0;
const PlaceOrderController_1 = require("../controller/PlaceOrderController");
const SimulateFreightController_1 = require("../controller/SimulateFreightController");
class RouteConfig {
    constructor(http, repositoryFactory) {
        http.on("/orders", "post", async (params, body) => {
            const placeOrderController = new PlaceOrderController_1.PlaceOrderController(repositoryFactory);
            return await placeOrderController.execute(params, body);
        });
        http.on("/simulateFreight", "post", async (params, body) => {
            const simulateFreightController = new SimulateFreightController_1.SimulateFreightController();
            return await simulateFreightController.execute(params, body);
        });
    }
}
exports.RouteConfig = RouteConfig;
