import PgPromiseConnectionAdapter from "@/infra/database/PgPromiseConnectionAdapter"


test("Deve criar uma conexão com banco de dados",async ()=>{
    const connection = PgPromiseConnectionAdapter.getInstance()
    const itemsData = await connection.query("select * from ccca.item",[])
    expect(itemsData).toHaveLength(6)
    
})