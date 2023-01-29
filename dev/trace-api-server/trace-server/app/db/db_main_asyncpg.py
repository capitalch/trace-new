from app import AppHttpException, Messages
from app.vendors import Any,jsonable_encoder, status
from .sql_auth import SqlAuth
from .db_models import UserClass
from .db_asyncpg import exec_generic_update


# async def generic_query(sql: str, sqlArgs: dict[str, str], dbName: str = None, dbParams: dict = None, schema: str = None, ):
#     records = await exec_generic_query(sql=sql, sqlArgs=sqlArgs, dbName=dbName, db_params=dbParams, schema=schema)
#     return records


async def process_details(sqlObject: Any, acur: Any, fkeyValue=None):
    ret = None
    try:
        if ('deletedIds' in sqlObject):
            await processDeletedIds(sqlObject, acur)
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
    sql = get_sql(xData, tableName, fkeyName, fkeyValue)
    if (sql):
        ret = await acur.fetch(sql)
        if(len(ret) > 0):
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
        sql= get_insert_sql(
            xData, tableName, fkeyName, fkeyValue)
    return (sql)


def get_insert_sql(xData, tableName, fkeyName, fkeyValue):
    fieldNamesList = list(xData.keys())
    if (fkeyName and fkeyValue):
        fieldNamesList.append(fkeyName)
    fieldsCount = len(fieldNamesList)

    for idx, name in enumerate(fieldNamesList):
        fieldNamesList[idx] = f''' "{name}" '''
    fieldsString = ','.join(fieldNamesList)

    valuesList = list(xData.values())

    if fkeyName and fkeyValue:
        valuesList.append(str(fkeyValue))
    for idx, name in enumerate(valuesList):
        valuesList[idx] = f''' '{name}' '''
    valuesString = ','.join(valuesList)

    sql = f'''insert into "{tableName}"
        ({fieldsString}) values({valuesString}) returning id
        '''
    return (sql)


async def generic_update(sqlObject: Any = {}):
    ret = await exec_generic_update(execSqlObject=process_details, sqlObject=sqlObject)
    return(ret)


async def processDeletedIds(sqlObject, acur: Any):
    deletedIdList = sqlObject.get('deletedIds')
    tableName = sqlObject.get('tableName')

    ret = '('
    for x in deletedIdList:
        ret = ret + str(x) + ','
    ret = ret.rstrip(',') + ')'
    sql = f'''delete from "{tableName}" where id in{ret}'''
    await acur.execute(sql)
