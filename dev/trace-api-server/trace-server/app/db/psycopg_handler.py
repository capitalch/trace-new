from app import AppHttpException, Messages, Config
# from app.vendors import status
# from fastapi import status
# from psycopg import AsyncConnection, connect, Connection, Cursor
from app.vendors import AsyncConnectionPool,  make_conninfo, status

pool_store = {}
db_params: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
    # 'dbname': Config.DB_DATABASE
}


async def get_connection_pool_async(connInfo: str, db_name: str) -> AsyncConnectionPool:
    pool = pool_store.get(db_name)
    if (pool is None):
        pool = AsyncConnectionPool(connInfo)
        pool_store[db_name] = pool
    return (pool)


async def exec_sql(db_name: str = Config.DB_ENTRY_DATABASE, db_params: dict = db_params, schema: str = 'public', sql: str = None, sql_args: dict = {}):
    db_params.update({'dbname': db_name})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **db_params)
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, db_name)
    records = None
    # try: does not work
    async with apool.connection() as aconn:
        async with aconn.cursor() as acur:
            await acur.execute(f'set search_path to {schema}')
            await acur.execute(sql, sql_args)
            if (acur.rowcount > 0):
                records = await acur.fetchall()
    return (records)
    # except Exception as ex:
    #     raise
    #     raise AppHttpException(detail=Messages.err_sql_execution_failed, error_code='sql_error', status_code=status.HTTP_501_NOT_IMPLEMENTED)
