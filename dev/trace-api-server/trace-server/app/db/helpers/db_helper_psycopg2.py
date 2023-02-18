from app import Config, Messages
from app.vendors import Any, jsonable_encoder, status
# import psycopg2
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
    pool1 = poolStore.get(dbName)

    def doReconnect():
        nonlocal pool1
        pool1 = ThreadedConnectionPool(5, 500, **connInfo)
        poolStore[dbName] = pool1
    if (toReconnect):
        doReconnect()
    else:
        if ((pool1 is None) or pool1.closed):
            doReconnect()
    return (pool1)


def get_conn_info(dbName: str, db_params: dict[str, str]) -> str:
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    db_params.update({'database': dbName})
    # creates connInfo from dict object
    connInfo = db_params
    return (connInfo)


# , execSqlObject: Any = None, sqlObject: Any = None):
def exec_generic_query(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = None, sqlArgs: dict[str, str] = {}, toReconnect=False):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: ThreadedConnectionPool = get_connection_pool(
        connInfo, dbName, toReconnect)
    records = None
    with apool.getconn() as aconn:
        with aconn.cursor(cursor_factory=RealDictCursor) as acur:
            acur.execute(f'set search_path to {schema}')
            acur.execute(sql, sqlArgs)
            if (acur.rowcount > 0):
                records = acur.fetchall()
            # acur.close()
    aconn.close()
    return (jsonable_encoder(records))


def get_cursor(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public'):
    connInfo = get_conn_info(dbName, db_params)
    pool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
    cur = None
    conn = pool.getconn()
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    return (pool, conn, cur)


def execute_sql(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', sql: str = ''):
    connInfo = get_conn_info(dbName, db_params)
    pool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
    conn = pool.getconn()
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute(sql)
    cursor.close()
    # conn.close()
    pool.closeall()

# def get_connection(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public'):
#     connInfo = get_conn_info(dbName, db_params)
#     pool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
#     conn = pool.getconn()
#     conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
#     return(conn)


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


def exec_generic_update(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public',  execSqlObject: Any = process_details, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: ThreadedConnectionPool = get_connection_pool(connInfo, dbName)
    records = None
    with apool.getconn() as aconn:
        with aconn.cursor(cursor_factory=RealDictCursor) as acur:
            acur.execute(f'set search_path to {schema}')
            records = execSqlObject(sqlObject, acur)
    aconn.close()
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
    def getUpdateKeyValues(dataCopy):
        dataCopy.pop('id')  # remove id property
        str = ''
        for it in dataCopy:
            str = str + f''' "{it}" = %s, '''
        str = (str.strip())[:-1]  # strip last comma
        valuesList = list(dataCopy.values())
        valuesTuple = tuple(valuesList)
        return (str, valuesTuple)

    str, valuesTuple = getUpdateKeyValues(xData.copy())
    sql = f'''update "{tableName}" set {str}
        where id = {xData['id']} returning {"id"}
    '''
    return (sql, valuesTuple)


def process_deleted_ids(sqlObject, acur: Any):
    deletedIdList: list = sqlObject.get('deletedIds', None)
    tableName = sqlObject.get('tableName')
    if ((deletedIdList is None) or (deletedIdList.count == 0)):
        return
    if (None in deletedIdList):
        raise AppHttpException(
            detail=Messages.err_none_in_deletedids, error_code='e1009', status_code='501')

    ret1 = ','.join(str(i) for i in deletedIdList)
    ret = f'''({ret1})'''
    sql = f'''delete from "{tableName}" where id in{ret}'''
    acur.execute(sql)
