"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyAdapter = void 0;
const fastify_1 = __importDefault(require("fastify"));
class FastifyAdapter {
    constructor() {
        this.app = (0, fastify_1.default)();
    }
    on(url, method, fn) {
        this.app[method](url, async (req, res) => {
            const output = await fn(req.params, req.body);
            return res.send(output);
        });
    }
    listen(port) {
        this.app
            .listen({
            port: port,
        })
            .then(() => {
            console.log("🚀 HTTP Server Running!");
        });
    }
    close() {
        this.app.close().then(() => {
            console.log("Server closed.");
        });
    }
}
exports.FastifyAdapter = FastifyAdapter;
