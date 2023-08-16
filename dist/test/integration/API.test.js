"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseRepositoryFactory_1 = require("@/infra/factory/DatabaseRepositoryFactory");
const FastifyAdapter_1 = require("@/infra/http/FastifyAdapter");
const RouteConfig_1 = require("@/infra/http/RouteConfig");
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
let http;
(0, vitest_1.beforeAll)(async () => {
    http = new FastifyAdapter_1.FastifyAdapter();
    new RouteConfig_1.RouteConfig(http, new DatabaseRepositoryFactory_1.DatabaseRepositoryFactory());
    http.listen(7777);
});
(0, vitest_1.afterAll)(() => {
    http.close();
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
    const response = await (0, supertest_1.default)("http://localhost:7777")
        .post("/orders")
        .send(input);
    (0, vitest_1.expect)(response.statusCode).toBe(200);
    (0, vitest_1.expect)(response.body.total).toBe(138);
});
test("Deve testar /simulateFreight (POST)", async () => {
    const input = {
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
    };
    const response = await (0, supertest_1.default)("http://localhost:7777")
        .post("/simulateFreight")
        .send(input);
    (0, vitest_1.expect)(response.statusCode).toBe(200);
    (0, vitest_1.expect)(response.body.amount).toBe(260);
});
