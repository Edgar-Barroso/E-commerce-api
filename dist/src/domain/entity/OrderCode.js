"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCode = void 0;
class OrderCode {
    constructor(date, sequence) {
        this.value = this.generateCode(date, sequence);
    }
    generateCode(date, sequence) {
        const year = date.getFullYear();
        return `${year}${sequence.toString().padStart(8, "0")}`;
    }
}
exports.OrderCode = OrderCode;
