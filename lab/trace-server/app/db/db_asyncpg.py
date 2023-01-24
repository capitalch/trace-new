# At present not using
from app import AppHttpException,  Config, Messages
from app.vendors import make_conninfo
from asyncpg import connect, Connection, create_pool, Record, Pool
from asyncpg.prepared_stmt import PreparedStatement

poolStore = {}
dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}


async def get_connection_pool(db_name: str, connInfo):
    pool = poolStore.get(db_name)
    if (pool is None):
        pool = await create_pool(**connInfo)
        poolStore[db_name] = pool
    return (pool)


# async def exec_sql(db_name: str, conn_info: dict, bu: str, sql: str, **args):
async def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str, str] = {}):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    # db_params.update({'dbname': dbName})
    db_params.update({'database': dbName})
    # creates connInfo from dict object
    # connInfo = make_conninfo('', **dbParams)
    records = None
    # db_name = 'capital_accounts'

    pool: Pool = await get_connection_pool(dbName, db_params)
    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(f'set search_path to {schema}')
            # await conn.execute(sql)
            # records = await conn.fetch('select * from "TranD"')
            # records = await conn.fetch('select * from "TranD" where (id < $1) and (id > $2)', 40000, 30000)
            params = (3,5) # {'a':1, 'b':2}
            sql1 = 'select 1; select 2;' # select * from "UserM"  # where id=$1 or id = $2
            records = await conn.fetch(sql1)
    return records
