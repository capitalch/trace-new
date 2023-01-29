from app import AppHttpException, Messages
from app.vendors import Any, status
from .sql_auth import SqlAuth
from .db_models import UserClass
from .db_psycopg_sync import exec_generic_query, exec_generic_update


def generic_query(sql: str, sqlArgs: dict[str, str], dbName: str = None, dbParams: dict = None, schema: str = None, ):
    records = exec_generic_query(sql=sql, sqlArgs=sqlArgs, dbName=dbName, db_params=dbParams, schema=schema)
    return records


def process_details(sqlObject: Any, acur: Any, fkeyValue=None):
    ret = None
    try:
        if ('deletedIds' in sqlObject):
            processDeletedIds(sqlObject, acur)
        xData = sqlObject.get('xData', None)
        tableName = sqlObject.get('tableName', None)
        fkeyName = sqlObject.get('fkeyName', None)
        if (xData):
            if (type(xData) is list):
                for item in xData:
                    ret = process_data(item, acur, tableName, fkeyName, fkeyValue)
            else:
                ret = process_data(xData, acur, tableName, fkeyName, fkeyValue)
        return (ret)
    except Exception as e:
        raise Exception()


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
    return(id)


def get_sql(xData, tableName, fkeyName, fkeyValue):
    sql = None
    valuesTuple = None
    if(xData.get('id', None)): # update
        pass
    else: # insert
        sql, valuesTuple = get_insert_sql(xData, tableName, fkeyName, fkeyValue)
    return (sql, valuesTuple)


def get_insert_sql(xData, tableName, fkeyName, fkeyValue):
    fieldNamesList = list(xData.keys())
    if (fkeyName and fkeyValue):
        fieldNamesList.append(fkeyName)
    fieldsCount = len(fieldNamesList)

    for idx, name in enumerate(fieldNamesList):
        fieldNamesList[idx] = f''' "{name}" ''' # surround fields with ""
    fieldsString =  ','.join(fieldNamesList) #    f'''({','.join( fieldNamesList   )})'''

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


def generic_update(sqlObject: Any = {}):
    ret = exec_generic_update(execSqlObject=process_details, sqlObject=sqlObject)
    return (ret)


def processDeletedIds(sqlObject, acur: Any):
    deletedIdList = sqlObject.get('deletedIds')
    tableName = sqlObject.get('tableName')

    ret = '('
    for x in deletedIdList:
        ret = ret + str(x) + ','
    ret = ret.rstrip(',') + ')'
    sql = f'''delete from "{tableName}" where id in{ret}'''
    acur.execute(sql)
