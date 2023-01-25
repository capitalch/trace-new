import psycopg2
import psycopg2.extras
from psycopg2 import pool
from app import AppHttpException,  Config , Messages
from app.vendors import make_conninfo, status
poolStore = {}
dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}

def get_connection_pool(connInfo: str, dbName: str):
    
    connPool = poolStore.get(dbName)
    if (connPool is None):
        connPool = pool.ThreadedConnectionPool(1, 500,connInfo)
    #     poolStore[dbName] = pool
    return (connPool)

def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str,str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str,str] = {}):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    db_params.update({'dbname': dbName})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **dbParams)
    
    records = None
    try:
        connPool = get_connection_pool(connInfo,dbName)
        conn  = connPool.getconn()
        # conn = psycopg2.connect(connInfo)
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
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