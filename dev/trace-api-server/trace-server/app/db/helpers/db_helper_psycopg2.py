from app import Config, Messages
from app.vendors import Any, jsonable_encoder, status
import psycopg2
import psycopg2.extras
from psycopg2 import pool
from psycopg2.pool import ThreadedConnectionPool
from psycopg2.extras import RealDictCursor
from app import AppHttpException,  Config, Messages

poolStore = {}
dbParams: dict = {
    'host': Config.DB_HOST,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'user': Config.DB_USER,
}


def get_connection_pool(connInfo: str, dbName: str, toReconnect=False) -> ThreadedConnectionPool:    
    global poolStore
    pool = poolStore.get(dbName)

    def doReconnect():
        pool = ThreadedConnectionPool(5, 500, **connInfo)
        poolStore[dbName] = pool

    if (toReconnect):
        doReconnect()
    else:
        if ((pool is None) or pool.closed):
            doReconnect()
    return (poolStore[dbName])


def get_conn_info(dbName: str, db_params: dict[str, str]) -> str:
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    db_params.update({'database': dbName})
    # creates connInfo from dict object
    connInfo = db_params
    return (connInfo)


def exec_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str, str] = {}, toReconnect=False):
    connInfo = get_conn_info(dbName, db_params)
    pool: ThreadedConnectionPool = get_connection_pool(
        connInfo, dbName, toReconnect)
    records = []
    with pool.getconn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(f'set search_path to {schema}')            
            cursor.execute(sql, sqlArgs)
            if (cursor.rowcount > 0):
                records = cursor.fetchall()
            cursor.close()
    conn.close()
    return (jsonable_encoder(records))


# def exec_sqls(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sqls: list = [], sqlArgs: list[dict[str, str]] = [{}], toReconnect=False):
#     connInfo = get_conn_info(dbName, db_params)
#     schema = 'public' if schema is None else schema
#     pool: ThreadedConnectionPool = get_connection_pool(
#         connInfo, dbName, toReconnect)
#     records =[]
#     with pool.getconn() as conn:
#         with conn.cursor(cursor_factory=RealDictCursor) as cursor:            
#             cursor.execute(f'set search_path to {schema}')
#             for idx, sql in sqls:
#                 cursor.execute(sql, sqlArgs[idx])
#                 if (cursor.rowcount > 0):
#                     records.append(cursor.fetchall())
#             cursor.close()
#     conn.close()
#     # pool.putconn(conn)
#     # pool.closeall()
#     return (jsonable_encoder(records))


# def get_cursor(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public'):
#     connInfo = get_conn_info(dbName, db_params)
#     pool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
#     cur = None
#     conn = pool.getconn()
#     conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
#     cur = conn.cursor(cursor_factory=RealDictCursor)
#     return (pool, conn, cur)

def execute_sql_dml(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = '', sqlArgs: dict[str, str] = {}):
    connInfo = get_conn_info(dbName, db_params)
    conn = psycopg2.connect(**connInfo)
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute(f'set search_path to {schema}')
    cursor.execute(sql)
    cursor.close()
    conn.close()

# def execute_sql_no_transaction(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = ''):
#     connInfo = get_conn_info(dbName, db_params)
#     pool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
#     conn = pool.getconn()
#     conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
#     cursor = conn.cursor(cursor_factory=RealDictCursor)
#     cursor.execute(f'set search_path to {schema}')
#     cursor.execute(sql)
#     cursor.close()
#     conn.close()
#     # pool.putconn(conn)
#     pool.closeall()


def process_details(sqlObject: Any, acur: Any, fkeyValue=None):
    ret = None
    if ('deletedIds' in sqlObject):
        process_deleted_ids(sqlObject, acur)
    xData = sqlObject.get('xData', None)
    tableName = sqlObject.get('tableName', None)
    fkeyName = sqlObject.get('fkeyName', None)
    if (xData):
        if (type(xData) is list):
            for item in xData:
                ret = process_data(item, acur, tableName,
                                   fkeyName, fkeyValue)
        else:
            ret = process_data(xData, acur, tableName, fkeyName, fkeyValue)
        return (ret)


def exec_sql_object(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public',  execSqlObject: Any = process_details, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
    records = None
    with apool.getconn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as acur:
            acur.execute(f'set search_path to {schema}')
            records = execSqlObject(sqlObject, acur)
    conn.close()
    return (records)


def process_data(xData, acur, tableName, fkeyName, fkeyValue):
    xDetails = None
    id = None
    records = None
    if ('xDetails' in xData):
        xDetails = xData.pop('xDetails')
    sql, tup = get_sql(xData, tableName, fkeyName, fkeyValue)
    if (sql):
        acur.execute(sql, tup)
        if (acur.rowcount > 0):
            records = acur.fetchone()
            id = records.get('id')
    if (xDetails):
        for item in xDetails:
            process_details(item, acur, id)
    return (id)


def get_sql(xData, tableName, fkeyName, fkeyValue):
    sql = None
    valuesTuple = None
    if (xData.get('id', None)):  # update
        sql, valuesTuple = get_update_sql(xData, tableName)
    else:  # insert
        sql, valuesTuple = get_insert_sql(
            xData, tableName, fkeyName, fkeyValue)
    return (sql, valuesTuple)


def get_insert_sql(xData, tableName, fkeyName, fkeyValue):
    fieldNamesList = list(xData.keys())
    if (fkeyName and fkeyValue):
        fieldNamesList.append(fkeyName)
    fieldsCount = len(fieldNamesList)

    for idx, name in enumerate(fieldNamesList):
        fieldNamesList[idx] = f''' "{name}" '''
    fieldsString = ','.join(
        fieldNamesList)

    placeholderList = ['%s'] * fieldsCount
    placeholdersForValues = ', '.join(placeholderList)

    valuesList = list(xData.values())
    if fkeyName and fkeyValue:
        valuesList.append(fkeyValue)
    valuesTuple = tuple(valuesList)
    sql = f'''insert into "{tableName}"
        ({fieldsString}) values({placeholdersForValues}) returning id
        '''
    return (sql, valuesTuple)


def get_update_sql(xData, tableName):
    def getUpdateKeyValuesString(dataCopy):
        dataCopy.pop('id')
        lst = []
        for item in dataCopy:
            lst.append(f''' "{item}" = %s''')
        keyValueStr = ', '.join(lst)
        valuesTuple = tuple(dataCopy.values())
        return (keyValueStr, valuesTuple)

    keyValueStr, valuesTuple = getUpdateKeyValuesString(xData.copy())
    sql = f'''
        update "{tableName}" set {keyValueStr}
            where id = {xData['id']} returning "{"id"}"
    '''
    return (sql, valuesTuple)


def process_deleted_ids(sqlObject, acur: Any):
    deletedIdList = sqlObject.get('deletedIds')
    tableName = sqlObject.get('tableName')
    ret = '('
    for x in deletedIdList:
        ret = ret + str(x) + ','
    ret = ret.rstrip(',') + ')'
    sql = f'''delete from "{tableName}" where id in{ret}'''
    acur.execute(sql)
