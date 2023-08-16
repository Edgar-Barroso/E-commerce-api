"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepositoryDatabase = void 0;
const Item_1 = require("@/domain/entity/Item");
class ItemRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    async findById(idItem) {
        const [itemData] = await this.connection.query("select * from ccca_item where id_item = $1", [idItem]);
        if (!itemData)
            return undefined;
        return new Item_1.Item(itemData.id_item, itemData.category, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
    }
}
exports.ItemRepositoryDatabase = ItemRepositoryDatabase;
