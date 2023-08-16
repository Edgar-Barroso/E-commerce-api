"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepositoryMemory = void 0;
class OrderRepositoryMemory {
    constructor() {
        this.items = [];
    }
    async count() {
        return this.items.length;
    }
    async save(order) {
        this.items.push(order);
    }
    async clear() {
        this.items = [];
    }
}
exports.OrderRepositoryMemory = OrderRepositoryMemory;
