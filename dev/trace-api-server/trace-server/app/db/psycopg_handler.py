from app import  Config
from app.vendors import AsyncConnectionPool,  make_conninfo
from psycopg.rows import dict_row

poolStore = {}
dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}


async def get_connection_pool_async(connInfo: str, dbName: str) -> AsyncConnectionPool:
    pool = poolStore.get(dbName)
    if (pool is None):
        pool = AsyncConnectionPool(connInfo)
        poolStore[dbName] = pool
    return (pool)


async def exec_sql(dbName: str = Config.DB_ENTRY_DATABASE, db_params: dict = dbParams, schema: str = 'public', sql: str = None, sql_args: dict = {}):
    db_params.update({'dbname': dbName})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **dbParams)
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, dbName)
    records = None
    async with apool.connection() as aconn:
        async with aconn.cursor(row_factory=dict_row) as acur:
            await acur.execute(f'set search_path to {schema}')
            await acur.execute(sql, sql_args)
            if (acur.rowcount > 0):
                records = await acur.fetchall()
    return (records)
    