from app.vendors import jsonable_encoder
from asyncpg import  Connection, create_pool, Pool
from asyncpg.transaction import Transaction
from app.vendors import Any
from app import Config

poolStore = {}

dbParams: dict = {
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT,
    'host': Config.DB_HOST,
}

async def get_connection_pool(connInfo: Any, dbName: str):
    pool = poolStore.get(dbName)
    if (pool is None):
        pool = await create_pool(**connInfo)
        poolStore[dbName] = pool
    return (pool)

async def exec_generic_query(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams,schema: str = 'public', sql:str = None, sqlArgs:dict[str,str]= {}):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    db_params.update({'database': dbName})
    records = None
    sql1, valuesTuple = to_native_sql(sql, sqlArgs)
    pool: Pool = await get_connection_pool(db_params, dbName)
    conn:Connection = await pool.acquire()
    status = await conn.is_closed()
    async with  conn.transaction():
        await conn.execute(f'set search_path to {schema}')
        records = await conn.fetch(sql1,*valuesTuple)
    # async with pool.acquire() as conn:
    #     async with conn.transaction():
    #         await conn.execute(f'set search_path to {schema}')
    #         records = await conn.fetch(sql1,*valuesTuple)
    return jsonable_encoder(records)

async def exec_generic_update(dbName: str = Config.DB_AUTH_DATABASE, db_params: dict[str, str] = dbParams, schema: str = 'public', execSqlObject: Any = None, sqlObject: Any = None):
    dbName = Config.DB_AUTH_DATABASE if dbName is None else dbName
    db_params = dbParams if db_params is None else db_params
    schema = 'public' if schema is None else schema
    db_params.update({'database': dbName})
    records = None
   
    pool: Pool = await get_connection_pool(db_params, dbName)
    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(f'set search_path to {schema}')
            records = await execSqlObject(sqlObject, conn)
    return records


def to_native_sql(sql: str, params: dict):
    cnt = 0
    paramsTuple = ()

    def getNewParamName():
        nonlocal cnt
        cnt = cnt + 1
        return (f'${cnt}')

    for prop in params:
        sprop = f'%({prop})s'
        sql = sql.replace(sprop, getNewParamName())
        paramsTuple = paramsTuple + (params[prop],)

    return (sql, paramsTuple)

async def process_details(sqlObject: Any, acur: Any, fkeyValue=None):
    ret = None
    try:
        if ('deletedIds' in sqlObject):
            await process_deleted_ids(sqlObject, acur)
        xData = sqlObject.get('xData', None)
        tableName = sqlObject.get('tableName', None)
        fkeyName = sqlObject.get('fkeyName', None)
        if (xData):
            if (type(xData) is list):
                for item in xData:
                    ret = await process_data(item, acur, tableName, fkeyName, fkeyValue)
            else:
                ret = await process_data(xData, acur, tableName, fkeyName, fkeyValue)
        return (ret)
    except Exception as e:
        raise Exception()


async def process_data(xData, acur, tableName, fkeyName, fkeyValue):
    xDetails = None
    id = None
    records = None
    if ('xDetails' in xData):
        xDetails = xData.pop('xDetails')
    sql, valuesTuple = get_sql(xData, tableName, fkeyName, fkeyValue)
    if (sql):
        ret = await acur.fetch(sql, *valuesTuple)
        if (len(ret) > 0):
            id = ret[0].get('id', None)
        # if (acur.rowcount > 0):
        #     records = await acur.fetchone()
        #     id = records.get('id')
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
    valuesList = list(xData.values())

    if (fkeyName and fkeyValue):
        fieldNamesList.append(fkeyName)
        valuesList.append(fkeyValue)
    fieldsCount = len(fieldNamesList)
    valuesTuple = tuple(valuesList)

    for idx, name in enumerate(fieldNamesList):
        fieldNamesList[idx] = f''' "{name}" '''
    fieldsString = ', '.join(fieldNamesList)

    placeholdersList = [''] * fieldsCount
    for idx, name in enumerate(placeholdersList):
        placeholdersList[idx] = f'${idx + 1}'
    placeholdersString = ', '.join(placeholdersList)

    sql = f'''insert into "{tableName}"
        ({fieldsString}) values( {placeholdersString} ) returning id
        '''
    return (sql, valuesTuple)


async def generic_update(sqlObject: Any = {}):
    ret = await exec_generic_update(execSqlObject=process_details, sqlObject=sqlObject)
    return (ret)


async def process_deleted_ids(sqlObject, acur: Any):
    deletedIdList = sqlObject.get('deletedIds')
    tableName = sqlObject.get('tableName')

    ret = '('
    for x in deletedIdList:
        ret = ret + str(x) + ','
    ret = ret.rstrip(',') + ')'
    sql = f'''delete from "{tableName}" where id in{ret}'''
    await acur.execute(sql)