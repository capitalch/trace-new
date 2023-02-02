from app import AppHttpException, Config, Messages
from app.vendors import Any, status
from psycopg_pool import AsyncConnectionPool
from psycopg.conninfo import make_conninfo
from psycopg.rows import dict_row

poolStore = {}
dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}


def get_connection_pool(connInfo: str, dbName: str) -> AsyncConnectionPool:
    global poolStore
    pool: AsyncConnectionPool = poolStore.get(dbName)
    if ((pool is None) or pool.closed):
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
    apool: AsyncConnectionPool = get_connection_pool(connInfo, dbName)
    records = None
    
    async with apool.connection() as aconn:
        async with aconn.cursor(row_factory=dict_row) as acur:
            await acur.execute(f'set search_path to {schema}')
            await acur.execute(sql, sqlArgs)
            if (acur.rowcount > 0):
                records = await acur.fetchall()
   
    return (records)


async def process_details(sqlObject: Any, acur: Any, fkeyValue=None):
    ret = None
    
    if ('deletedIds' in sqlObject):
        await process_deleted_ids(sqlObject, acur)
    xData = sqlObject.get('xData', None)
    tableName = sqlObject.get('tableName', None)
    fkeyName = sqlObject.get('fkeyName', None)
    if (xData):
        if (type(xData) is list):
            for item in xData:
                ret = await process_data(item, acur, tableName,
                                    fkeyName, fkeyValue)
        else:
            ret = await process_data(xData, acur, tableName, fkeyName, fkeyValue)
    return (ret)
   


async def exec_generic_update(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public',  execSqlObject: Any = process_details, sqlObject: Any = None):
    connInfo = get_conn_info(dbName, db_params)
    schema = 'public' if schema is None else schema
    apool: AsyncConnectionPool = get_connection_pool(connInfo, dbName)
    records = None
    
    async with apool.connection() as aconn:
        async with aconn.cursor(row_factory=dict_row) as acur:
            await acur.execute(f'set search_path to {schema}')
            records = await execSqlObject(sqlObject, acur)
    
    return (records)


async def process_data(xData, acur, tableName, fkeyName, fkeyValue):
    xDetails = None
    id = None
    records = None
    if ('xDetails' in xData):
        xDetails = xData.pop('xDetails')
    sql, tup = get_sql(xData, tableName, fkeyName, fkeyValue)
    if (sql):
        await acur.execute(sql, tup)
        if (acur.rowcount > 0):
            records = await acur.fetchone()
            id = records.get('id')
    if (xDetails):
        for item in xDetails:
            await process_details(item, acur, id)
    return (id)


def get_sql(xData, tableName, fkeyName, fkeyValue):
    sql = None
    valuesTuple = None
    if (xData.get('id', None)):  # update
        pass
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
        fieldNamesList[idx] = f''' "{name}" '''  # surround fields with ""
    fieldsString = ','.join(
        fieldNamesList)  # f'''({','.join( fieldNamesList   )})'''

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


# def generic_query(sql: str, sqlArgs: dict[str, str], dbName: str = None, dbParams: dict = None, schema: str = None, ):
#     records = exec_generic_query(
#         sql=sql, sqlArgs=sqlArgs, dbName=dbName, db_params=dbParams, schema=schema)
#     return records


# def generic_update(sqlObject: Any = {}):
#     ret = exec_generic_update(
#         execSqlObject=process_details, sqlObject=sqlObject)
#     return (ret)


def process_deleted_ids(sqlObject, acur: Any):
    deletedIdList = sqlObject.get('deletedIds')
    tableName = sqlObject.get('tableName')

    ret = '('
    for x in deletedIdList:
        ret = ret + str(x) + ','
    ret = ret.rstrip(',') + ')'
    sql = f'''delete from "{tableName}" where id in{ret}'''
    acur.execute(sql)
