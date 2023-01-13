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


async def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str,str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str,str] = {}):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    db_params.update({'dbname': dbName})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **dbParams)
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, dbName)
    records = None
    async with apool.connection() as aconn:
        async with aconn.cursor(row_factory=dict_row) as acur:
            await acur.execute(f'set search_path to {schema}')
            await acur.execute(sql, sqlArgs)
            if (acur.rowcount > 0):
                records = await acur.fetchall()
    return (records)
    