"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepositoryFactory = void 0;
const OrderRepositoryDatabase_1 = require("../repository/database/OrderRepositoryDatabase");
const SqliteConnectionAdapter_1 = require("../database/SqliteConnectionAdapter");
const CouponRepositoryDatabase_1 = require("../repository/database/CouponRepositoryDatabase");
const ItemRepositoryDatabase_1 = require("../repository/database/ItemRepositoryDatabase");
class DatabaseRepositoryFactory {
    constructor() {
        this.connection = SqliteConnectionAdapter_1.SqliteConnectionAdapter.getInstance();
    }
    createOrderRepository() {
        return new OrderRepositoryDatabase_1.OrderRepositoryDatabase(this.connection);
    }
    createItemRepository() {
        return new ItemRepositoryDatabase_1.ItemRepositoryDatabase(this.connection);
    }
    createCouponRepository() {
        return new CouponRepositoryDatabase_1.CouponRepositoryDatabase(this.connection);
    }
}
exports.DatabaseRepositoryFactory = DatabaseRepositoryFactory;
