from app import AppHttpException,  Config, Messages
from app.vendors import Any, AsyncConnection, AsyncConnectionPool,  make_conninfo, status
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


def get_conn_info(dbName: str, db_params: dict[str, str]) -> str:
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    db_params.update({'dbname': dbName})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **dbParams)
    return (connInfo)


async def exec_generic_query(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str, str] = {}, execSqlObject: Any = None, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, dbName)
    records = None
    try:
        async with apool.connection() as aconn:
            async with aconn.cursor(row_factory=dict_row) as acur:
                await acur.execute(f'set search_path to {schema}')
                await acur.execute(sql, sqlArgs)
                if (acur.rowcount > 0):
                    records = await acur.fetchall()
    except Exception as e:
        raise AppHttpException(
            detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
        )

    return (records)


async def exec_generic_update(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public',  execSqlObject: Any = None, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, dbName)
    records = None
    try:
        async with apool.connection() as aconn:
            async with aconn.cursor(row_factory=dict_row) as acur:
                await acur.execute(f'set search_path to {schema}')
                records = await execSqlObject(sqlObject, acur)
    except Exception as e:
        raise AppHttpException(
            detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
        )

    return (records)
