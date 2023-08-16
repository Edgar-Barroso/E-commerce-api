"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepositoryMemory = void 0;
const Item_1 = require("@/domain/entity/Item");
class ItemRepositoryMemory {
    constructor() {
        this.items = [
            new Item_1.Item(1, "Música", "CD", 30),
            new Item_1.Item(2, "Vídeo", "DVD", 50),
            new Item_1.Item(3, "Vídeo", "VHS", 10),
            new Item_1.Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3),
            new Item_1.Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20),
            new Item_1.Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9),
        ];
    }
    async findById(idItem) {
        return this.items.find((item) => item.idItem === idItem);
    }
}
exports.ItemRepositoryMemory = ItemRepositoryMemory;
