from app import AppHttpException,  Config, Messages
from app.vendors import Any,  make_conninfo, status
from psycopg_pool import AsyncConnectionPool, ConnectionPool
from psycopg.rows import dict_row

poolStore = {}
dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}


def get_connection_pool(connInfo: str, dbName: str) -> ConnectionPool:
    global poolStore
    pool: ConnectionPool = poolStore.get(dbName)
    if ((pool is None) or pool.closed):
        pool = ConnectionPool(connInfo)
        poolStore[dbName] = pool
    return (pool)


def get_conn_info(dbName: str, db_params: dict[str, str]) -> str:
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    db_params.update({'dbname': dbName})
    # creates connInfo from dict object
    connInfo = make_conninfo('', **dbParams)
    return (connInfo)


def exec_generic_query(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str, str] = {}, execSqlObject: Any = None, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: ConnectionPool = get_connection_pool(connInfo, dbName)
    records = None
    try:
        with apool.connection() as aconn:
            with aconn.cursor(row_factory=dict_row) as acur:
                acur.execute(f'set search_path to {schema}')
                acur.execute(sql, sqlArgs)
                if (acur.rowcount > 0):
                    records = acur.fetchall()
    except Exception as e:
        raise AppHttpException(
            detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
        )

    return (records)


def exec_generic_update(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public',  execSqlObject: Any = None, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: ConnectionPool = get_connection_pool(connInfo, dbName)
    records = None
    try:
        with apool.connection() as aconn:
            with aconn.cursor(row_factory=dict_row) as acur:
                acur.execute(f'set search_path to {schema}')
                records = execSqlObject(sqlObject, acur)
    except Exception as e:
        raise AppHttpException(
            detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
        )

    return (records)
