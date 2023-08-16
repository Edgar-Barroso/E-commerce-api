"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqliteConnectionAdapter_1 = require("@/infra/database/SqliteConnectionAdapter");
test("Deve criar uma conexão com banco de dados", async () => {
    const connection = SqliteConnectionAdapter_1.SqliteConnectionAdapter.getInstance();
    const itemsData = await connection.query("select * from ccca_item", []);
    expect(itemsData).toHaveLength(6);
});
