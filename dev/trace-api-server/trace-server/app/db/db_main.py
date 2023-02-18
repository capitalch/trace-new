from app.vendors import Any, json, unquote
from app import AppHttpException, CustomErrorCodes, logger, Messages, utils

from psycopg2.extras import RealDictCursor
from .sql_queries_auth import SqlQueriesAuth
from .helpers.db_helper_asyncpg import exec_generic_update as generic_update_asyncpg
from .helpers.db_helper_asyncpg import exec_generic_query as generic_query_asyncpg

from .helpers.db_helper_psycopg_sync import exec_generic_update as generic_update_psycopg_sync
from .helpers.db_helper_psycopg_sync import exec_generic_query as generic_query_psycopg_sync

from .helpers.db_helper_psycopg_async import exec_generic_update as generic_update_psycopg_async
from .helpers.db_helper_psycopg_async import exec_generic_query as generic_query_psycopg_async

from .helpers.db_helper_psycopg2 import exec_generic_update as generic_update_psycopg2
from .helpers.db_helper_psycopg2 import exec_generic_query as generic_query_psycopg2
from .helpers.db_helper_psycopg2 import get_cursor, execute_sql


async def resolve_generic_query(info, value):
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
        # data = await generic_query_asyncpg(sql=sql, sqlArgs=sqlArgs)
        # data = await generic_query_psycopg_async(sql=sql, sqlArgs=sqlArgs)
        # data = generic_query_psycopg_sync(sql=sql, sqlArgs=sqlArgs)
        data = generic_query_psycopg2(
            dbName=operationName, sql=sql, sqlArgs=sqlArgs, db_params=dbParams, toReconnect=toReconnect)
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
        data = generic_update_psycopg2(dbName=operationName, sqlObject=sqlObj)
        # print('success')
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
        data: dict[str, Any] = generic_query_psycopg2(
            dbName=operationName, sql=sql, sqlArgs=sqlArgs, db_params=dbParams, toReconnect=toReconnect)
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
                # dbParamsJson = json.dumps(dbParams)
                dbParamsEncrypted = utils.encrypt(dbParams)
                xData['dbParams'] = dbParamsEncrypted
                # Encrypt dbParams and set in xData
            dbToCreate = xData.get('dbName')
            if (not isExternalDb):
                if (dbToCreate):
                    dbNameInCatalog: str = generic_query_psycopg2(  # Names of all databases in format [{'datname':'database1'}, {'datname':'database2'} ...]
                        dbName=operationName, sql=SqlQueriesAuth.get_database, sqlArgs={'datname': dbToCreate})
                    # if db not exists ceate it
                    if (not dbNameInCatalog):
                        execute_sql(dbName=operationName, sql=f'CREATE DATABASE "{dbToCreate}"')
                        execute_sql(dbName=dbToCreate,
                                    sql=SqlQueriesAuth.drop_public_schema)

        # data = await generic_update_asyncpg(sqlObject=sqlObj)
        # data = await generic_update_psycopg_async(sqlObject=sqlObj)
        # data = generic_update_psycopg_sync(sqlObject=sqlObj)
        data = generic_update_psycopg2(dbName=operationName, sqlObject=sqlObj)
        # print('success')
    except Exception as e:
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.err_query_update if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1010' if errorCode is None else errorCode
        data['error'] = error
        logger.error(error)
    return (data)
