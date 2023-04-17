from app.vendors import Any, json, unquote
from app import AppHttpException, CustomErrorCodes, logger, Messages, utils

from psycopg2.extras import RealDictCursor
from .sql_queries_auth import SqlQueriesAuth
from .sql_queries_client import SqlQueriesClient
from .helpers.db_helper_asyncpg import exec_generic_update as generic_update_asyncpg
from .helpers.db_helper_asyncpg import exec_generic_query as generic_query_asyncpg

from .helpers.db_helper_psycopg_sync import exec_generic_update as generic_update_psycopg_sync
from .helpers.db_helper_psycopg_sync import exec_generic_query as generic_query_psycopg_sync

from .helpers.db_helper_psycopg_async import exec_sql_object as exec_sql_object_psycopg_async
from .helpers.db_helper_psycopg_async import exec_sql as exec_sql_psycopg_async
from .helpers.db_helper_psycopg_async import execute_sql_dml as execute_sql_dml_psycopg_async

from .helpers.db_helper_psycopg2 import exec_sql_object as exec_sql_object_psycopg2
from .helpers.db_helper_psycopg2 import exec_sql as exec_sql_psycopg2
from .helpers.db_helper_psycopg2 import execute_sql_dml as execute_sql_dml_psycopg2


async def resolve_generic_query(info, value):
    error = {}
    data = {}
    try:
        valueString = unquote(value)
        valueDict = json.loads(valueString) if valueString else {}
        dbParams = valueDict.get('dbParams', None)
        schema = valueDict.get('buCode', None)
        toReconnect = valueDict.get('toReconnect', False)
        sqlId = valueDict.get('sqlId', None)
        request = info.context.get('request', None)
        requestJson = await request.json()
        operationName = requestJson.get('operationName', None)
        if (not sqlId):
            raise AppHttpException('Bad sqlId', error_code='1001')
        sqlQueryObject = utils.getSqlQueryObject(
            operationName)  # dbName is operationName
        sql = getattr(sqlQueryObject, sqlId)
        sqlArgs = valueDict.get('sqlArgs', {})
        # data = await generic_query_asyncpg(sql=sql, sqlArgs=sqlArgs)
        # data = await generic_query_psycopg_async(sql=sql, sqlArgs=sqlArgs)
        # data = generic_query_psycopg_sync(sql=sql, sqlArgs=sqlArgs)
        data = exec_sql_psycopg2(dbName=operationName, schema=schema,  sql=sql,
                                 sqlArgs=sqlArgs, db_params=dbParams, toReconnect=toReconnect)
        # data = await exec_sql_psycopg_async(
        #     dbName=operationName, sql=sql, sqlArgs=sqlArgs, db_params=dbParams, toReconnect=toReconnect)
    except Exception as e:
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.err_query_execution if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1007' if errorCode is None else errorCode
        data['error'] = error
        logger.error(e)
    return (data)


async def resolve_generic_update(info, value):
    error = {}
    data = {}
    try:
        valueString = unquote(value)
        request = info.context.get('request', None)
        requestJson = await request.json()
        operationName = requestJson.get('operationName', None)
        sqlObj = json.loads(valueString)
        # data = await generic_update_asyncpg(sqlObject=sqlObj)
        # data = await generic_update_psycopg_async(sqlObject=sqlObj)
        # data = generic_update_psycopg_sync(sqlObject=sqlObj)
        data = exec_sql_object_psycopg2(dbName=operationName, sqlObject=sqlObj)
        # data = await exec_sql_object_psycopg_async(dbName=operationName, sqlObject=sqlObj)
    except Exception as e:
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.err_query_update if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1008' if errorCode is None else errorCode
        data['error'] = error
        logger.error(error)
    return (data)


async def resolve_query_clients(info, value):
    error = {}
    data = {}
    try:
        valueString = unquote(value)
        valueDict = json.loads(valueString) if valueString else {}
        dbParams = valueDict.get('dbParams', None)
        toReconnect = valueDict.get('toReconnect', False)
        sqlId = valueDict.get('sqlId', None)
        request = info.context.get('request', None)
        requestJson = await request.json()
        operationName = requestJson.get('operationName', None)
        if (not sqlId):
            raise AppHttpException('Bad sqlId', error_code='1001')
        sql = getattr(SqlQueriesAuth, sqlId)
        sqlArgs = valueDict.get('sqlArgs', {})
        data: dict[str, Any] = exec_sql_psycopg2(
            dbName=operationName, sql=sql, sqlArgs=sqlArgs, db_params=dbParams, toReconnect=toReconnect)

        # data: dict[str, Any] = await exec_sql_psycopg_async(
        #     dbName=operationName, sql=sql, sqlArgs=sqlArgs, db_params=dbParams, toReconnect=toReconnect)

        for item in data:
            dbParamsEncrypted = item.get('dbParams', None)
            if (dbParamsEncrypted):
                dbParamsJson = utils.decrypt(dbParamsEncrypted)
                dbParamsObj = json.loads(dbParamsJson)
                item['dbParams'] = dbParamsObj

    except Exception as e:
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.err_query_execution if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1007' if errorCode is None else errorCode
        data['error'] = error
        logger.error(e)
    return (data)


async def resolve_update_client(info, value):
    error = {}
    data = {}
    try:
        valueString = unquote(value)
        request = info.context.get('request', None)
        requestJson = await request.json()
        operationName = requestJson.get('operationName', None)
        sqlObj = json.loads(valueString)
        xData = sqlObj.get('xData', None)
        if (xData):
            isExternalDb: bool = xData.get('isExternalDb', None)
            dbParams = xData.get('dbParams', None)
            if (dbParams):
                dbParamsEncrypted = utils.encrypt(dbParams)
                xData['dbParams'] = dbParamsEncrypted
                # Encrypt dbParams and set in xData
            dbToCreate = xData.get('dbName')
            if (not isExternalDb):
                if (dbToCreate):
                    dbNameInCatalog: str = exec_sql_psycopg2(  # Names of all databases in format [{'datname':'database1'}, {'datname':'database2'} ...]
                        dbName=operationName, sql=SqlQueriesAuth.get_database, sqlArgs={'datname': dbToCreate})
                    if (not dbNameInCatalog):
                        execute_sql_dml_psycopg2(
                            dbName=operationName, sql=f'CREATE DATABASE "{dbToCreate}"')
                        execute_sql_dml_psycopg2(dbName=dbToCreate,
                                                 sql=SqlQueriesAuth.drop_public_schema)
                        
        data = exec_sql_object_psycopg2(dbName=operationName, sqlObject=sqlObj)
    
    except Exception as e:
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.err_query_update if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1010' if errorCode is None else errorCode
        data['error'] = error
        logger.error(error)
    return (data)


async def resolve_update_user(info, value):
    error = {}
    data = {}
    try:
        valueString = unquote(value)
        request = info.context.get('request', None)
        requestJson = await request.json()
        operationName = requestJson.get('operationName', None)
        sqlObj = json.loads(valueString)
        xData = sqlObj.get('xData', None)
        toSendMail = False
        if (xData):
            uid = xData.get('uid', None)
            if (uid is None):
                xData['uid'] = utils.getRandomUserId()
                pwd = utils.getRandomPassword()
                tHash = utils.getPasswordHash(pwd)
                xData['hash'] = tHash
                toSendMail = True
        data = exec_sql_object_psycopg2(dbName=operationName, sqlObject=sqlObj)
        if (toSendMail):
            # code to send mail for uid and password
            pass
        # data = await generic_update_asyncpg(sqlObject=sqlObj)
        # data = await generic_update_psycopg_async(sqlObject=sqlObj)
        # data = generic_update_psycopg_sync(sqlObject=sqlObj)

        # data = await exec_sql_object_psycopg_async(dbName=operationName, sqlObject=sqlObj)
    except Exception as e:
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.err_query_execution if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1007' if errorCode is None else errorCode
        data['error'] = error
        logger.error(e)
    return (data)
