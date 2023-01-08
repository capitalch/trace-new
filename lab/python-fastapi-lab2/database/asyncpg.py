from asyncpg import connect, Connection, create_pool, Record, Pool
from asyncpg.prepared_stmt import PreparedStatement

poolStore = {}


async def get_connection_pool(db_name: str, connInfo):
    pool = poolStore.get(db_name)
    if (pool is None):
        # pool = await create_pool(user='', password='', port=111, host='', database=db_name)
        pool = await create_pool(**connInfo)
        poolStore[db_name] = pool
    return (pool)


async def get_asyncpg_data():
    records = None
    db_name = 'capital_accounts'
    connInfo = {
        'user':'', 'password':'', 'port':1, 'host':'', 'database':db_name
    }
    pool: Pool = await get_connection_pool(db_name, connInfo)
    async with pool.acquire() as conn:
        async with conn.transaction():
            ret = await conn.execute('set search_path to capitalchowringhee')
            # records = await conn.fetch('select * from "TranD"')
            records = await conn.fetch('select * from "TranD" where (id < $1) and (id > $2)', (40000, 30000))
    return records
