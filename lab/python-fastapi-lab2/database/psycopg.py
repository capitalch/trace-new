from psycopg import AsyncConnection, connect, Connection, Cursor
from psycopg_pool import AsyncConnectionPool, ConnectionPool

poolStore = {}


# def get_connection_pool(connInfo: str, db_name: str):  # -> ConnectionPool:
#     pool = poolStore.get(db_name)
#     if (pool is None):
#         pool = ConnectionPool(conninfo=connInfo, open=True)
#         poolStore[db_name] = pool
#     return (pool)


async def get_connection_pool_async(connInfo: str, db_name: str):
    pool = poolStore.get(db_name)
    if (pool is None):
        pool = AsyncConnectionPool(connInfo, open=True)
        poolStore[db_name] = pool
    return(pool)


# def get_psycopg_data():
#     connInfo = 'user= password=port=11107 host= dbname='
#     pool = get_connection_pool(connInfo, 'capital_accounts')
#     records = None
#     with pool.connection() as conn:
#         conn.execute('set search_path to capitalchowringhee')
#         cur = conn.execute(
#             'select * from "TranD"')
#         records = cur.fetchall()
#     return (records)


async def get_psycopg_data_async():
    connInfo = ''
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, '')
    records = None
    async with apool.connection() as aconn:
        async with aconn.cursor() as acur:
            await acur.execute('set search_path to capitalchowringhee')
            await acur.execute('select * from "TranD"')
            records = await acur.fetchall()
    return(records)
