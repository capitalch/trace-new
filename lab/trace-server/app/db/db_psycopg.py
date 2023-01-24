from app import AppHttpException,  Config , Messages
from app.vendors import  AsyncConnection, AsyncConnectionPool, AsyncCursor,  make_conninfo, status
from psycopg.rows import dict_row
import psycopg
poolStore = {}
dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}


async def get_connection_pool_async(connInfo: str, dbName: str) -> AsyncConnectionPool:
    pool = AsyncConnectionPool(connInfo, open=True)
    # pool = poolStore.get(dbName)
    # if (pool is None):
    #     pool = AsyncConnectionPool(connInfo)
    #     poolStore[dbName] = pool
    return (pool)


# async def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str,str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str,str] = {}):
#     dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
#     db_params = dbParams if db_params is None else db_params
#     schema = 'public' if schema is None else schema
#     db_params.update({'dbname': dbName})
#     # creates connInfo from dict object
#     connInfo = make_conninfo('', **dbParams)
#     apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, dbName)
#     records = None
#     try:
#         async with apool.connection() as aconn:
#             async with aconn.cursor(row_factory=dict_row) as acur:
#                 await acur.execute(f'set search_path to {schema}')
#                 await acur.execute(sql, sqlArgs)
#                 if (acur.rowcount > 0):
#                     records = await acur.fetchall()
#     except Exception as e:
#         raise AppHttpException(
#             detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
#         )
#     return (records)

def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str,str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str,str] = {}):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    db_params.update({'dbname': dbName})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **dbParams)
    # apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, dbName)
    records = None
    try:
        conn = psycopg.Connection.connect(connInfo)
        cur = conn.cursor(row_factory=dict_row)
        cur.execute(f'set search_path to {schema}')
        cur.execute(sql, sqlArgs)
        if (cur.rowcount > 0):
                    records = cur.fetchall()
        
        cur.close()
        conn.close()
       
        # async with await psycopg.AsyncConnection.connect(connInfo) as aconn:
        #     async with aconn.cursor() as cur:
        #         await cur.execute(f'set search_path to {schema}')
        #         await cur.execute(sql, sqlArgs)
        #         if (cur.rowcount > 0):
        #             records = await cur.fetchall()
       
        
    except Exception as e:
        raise AppHttpException(
            detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
        )
    return (records)
    