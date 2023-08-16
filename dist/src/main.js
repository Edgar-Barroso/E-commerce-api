"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseRepositoryFactory_1 = require("./infra/factory/DatabaseRepositoryFactory");
const FastifyAdapter_1 = require("./infra/http/FastifyAdapter");
const RouteConfig_1 = require("./infra/http/RouteConfig");
const http = new FastifyAdapter_1.FastifyAdapter();
const repositoryFactory = new DatabaseRepositoryFactory_1.DatabaseRepositoryFactory();
new RouteConfig_1.RouteConfig(http, repositoryFactory);
http.listen(7777);
