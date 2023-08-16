import fastify from "fastify";
import { Http } from "./Http";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export class FastifyAdapter implements Http {
  app: any;

  constructor() {
    this.app = fastify();
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async (req: FastifyRequest, res: FastifyReply) => {
      const output = await fn(req.params, req.body);
      return res.send(output);
    });
  }

  listen(port: number): void {
    this.app
      .listen({
        port: port,
      })
      .then(() => {
        console.log("🚀 HTTP Server Running!");
      });
  }

  close(): void {
    this.app.close().then(() => {
      console.log("Server closed.");
    });
  }
}
