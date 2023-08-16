"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepositoryDatabase = void 0;
class OrderRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    async save(order) {
        const [orderData] = await this.connection.query("insert into ccca_order (code,cpf,issue_date,freight,sequence,coupon) values ($1, $2, $3, $4, $5, $6) returning *", [
            order.getCode(),
            order.getCpf(),
            order.date,
            order.getFreight(),
            order.sequence,
            order.coupon?.code,
        ]);
        for (const orderItem of order.getOrderItems()) {
            await this.connection.query("insert into ccca_order_item (id_item,id_order,price,quantity) values ($1, $2, $3, $4)", [orderItem.idItem, orderData.id, orderItem.price, orderItem.quantity]);
        }
    }
    async count() {
        const [orderData] = await this.connection.query("SELECT CAST(count(*) AS INT) AS count FROM ccca_order;", []);
        return orderData.count;
    }
    async clear() {
        await this.connection.query("delete from ccca_order_item", []);
        await this.connection.query("delete from ccca_order", []);
    }
}
exports.OrderRepositoryDatabase = OrderRepositoryDatabase;
