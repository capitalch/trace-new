from app.vendors import json, unquote
from app import AppHttpException, CustomErrorCodes, logger, Messages
from .sql_queries_auth import SqlQueriesAuth
from .helpers.db_helper_asyncpg import exec_generic_update as generic_update_asyncpg
from .helpers.db_helper_asyncpg import exec_generic_query as generic_query_asyncpg

from .helpers.db_helper_psycopg_sync import exec_generic_update as generic_update_psycopg_sync
from .helpers.db_helper_psycopg_sync import exec_generic_query as generic_query_psycopg_sync

from .helpers.db_helper_psycopg_async import exec_generic_update as generic_update_psycopg_async
from .helpers.db_helper_psycopg_async import exec_generic_query as generic_query_psycopg_async

from .helpers.db_helper_psycopg2 import exec_generic_update as generic_update_psycopg2
from .helpers.db_helper_psycopg2 import exec_generic_query as generic_query_psycopg2


async def resolve_generic_query(value):
    error = {}
    data = {}
    try:
        valueString = unquote(value)
        valueDict = json.loads(valueString) if valueString else {}
        sqlId = valueDict.get('sqlId', None)
        if (not sqlId):
            raise AppHttpException('Bad sqlId', error_code='1001')
        sql = getattr(SqlQueriesAuth, sqlId)
        sqlArgs = valueDict.get('sqlArgs', {})
        # data = await generic_query_asyncpg(sql=sql, sqlArgs=sqlArgs)
        # data = await generic_query_psycopg_async(sql=sql, sqlArgs=sqlArgs)
        # data = generic_query_psycopg_sync(sql=sql, sqlArgs=sqlArgs)
        data = generic_query_psycopg2(sql=sql, sqlArgs=sqlArgs)
    except Exception as e:
        error['detail'] = Messages.err_query_execution
        error['errorCode'] = CustomErrorCodes.e1007
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
        data = generic_update_psycopg2(sqlObject=sqlObj)
        # print('success')
    except Exception as e:
        error['detail'] = Messages.err_query_update
        error['errorCode'] = CustomErrorCodes.e1008
        data['error'] = error
        logger.error(e)
    return (data)
