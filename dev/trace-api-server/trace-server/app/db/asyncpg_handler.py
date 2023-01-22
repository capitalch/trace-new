# At present not using
from asyncpg import connect, Connection, create_pool, Record, Pool
from asyncpg.prepared_stmt import PreparedStatement

poolStore = {}


async def get_connection_pool(db_name: str, connInfo):
    pool = poolStore.get(db_name)
    if (pool is None):
        pool = await create_pool(**connInfo)
        poolStore[db_name] = pool
    return (pool)


async def get_asyncpg_data(db_name: str, conn_info: dict, bu: str, sql: str, **args):
    records = None
    # db_name = 'capital_accounts'
    conn_info.update('database', db_name)
    # connInfo = {
    #     'user':'webadmin', 'password':'NAFacr72163', 'port':11107, 'host':'chisel.cloudjiffy.net', 'database':db_name
    # }
    pool: Pool = await get_connection_pool(db_name, conn_info)
    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(f'set search_path to {bu}')
            # records = await conn.fetch('select * from "TranD"')
            # records = await conn.fetch('select * from "TranD" where (id < $1) and (id > $2)', 40000, 30000)
            records = await conn.fetch(sql, args)
    return records
