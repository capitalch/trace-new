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

poolBuffer = None

async def get_connection_pool(db_name: str, connInfo):
    global poolBuffer
    if(poolBuffer is None):
        poolBuffer = await create_pool(**connInfo)
    return(poolBuffer)
    # pool = poolStore.get(db_name)
    # if (pool is None):
    #     pool = await create_pool(**connInfo)
    #     poolStore[db_name] = pool
    # return (pool)


async def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str, str] = {}):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    db_params.update({'database': dbName})
    records = None
    # creates connInfo from dict object
    # connInfo = make_conninfo('', **dbParams)
    # db_name = 'capital_accounts'

    pool: Pool = await get_connection_pool(dbName, db_params)
    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(f'set search_path to {schema}')
            sql1, paramsTuple = to_native_sql(sql, sqlArgs)
            records = await conn.fetch(sql1, *paramsTuple)
    return records


def to_native_sql(sql:str, params:dict):
    cnt = 0
    paramsTuple = ()

    def getNewParamName():
        nonlocal cnt
        cnt = cnt + 1
        return(f'${cnt}')
        
    for prop in params:
        sprop = f'%({prop})s'
        sql = sql.replace(sprop,getNewParamName())
        paramsTuple = paramsTuple + (params[prop],)
    
    return(sql, paramsTuple)