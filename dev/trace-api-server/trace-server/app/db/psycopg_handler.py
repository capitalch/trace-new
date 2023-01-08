from app import AppHttpException, messages
# from app.vendors import status
from fastapi import status
from psycopg import AsyncConnection, connect, Connection, Cursor
from psycopg_pool import AsyncConnectionPool, ConnectionPool

poolStore = {}


async def get_connection_pool_async(connInfo: str, db_name: str):
    pool = poolStore.get(db_name)
    if (pool is None):
        pool = AsyncConnectionPool(connInfo)
        poolStore[db_name] = pool
    return (pool)


async def get_psycopg_data_async(db_name: str):
    connInfo = f'user= password= port=1 host= dbname={db_name}'
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, db_name)
    records = None
    # try: does not work
    async with apool.connection() as aconn:
        async with aconn.cursor() as acur:
            await acur.execute('set search_path to ')
            # rec1 = await acur.fetchone()
            await acur.execute('select * from "TranD"')
            records = await acur.fetchall()
    return(records)
    # except Exception as ex:
    #     raise 
    #     raise AppHttpException(detail=messages.err_sql_execution_failed, error_code='sql_error', status_code=status.HTTP_501_NOT_IMPLEMENTED)
    
