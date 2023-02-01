from app.vendors import json, jsonable_encoder, unquote
from app import AppHttpException, CustomErrorCodes,logger, Messages
from .sql_queries_auth import SqlQueriesAuth
from .helpers.db_helper_asyncpg import generic_update as generic_update_asyncpg
from .helpers.db_helper_asyncpg import exec_generic_query as generic_query_asyncpg


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
        sqlArgs = valueDict.get('sqlArgs', None)
        data = await generic_query_asyncpg(sql=sql, sqlArgs=sqlArgs)
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
        data = await generic_update_asyncpg(sqlObject=sqlObj)
    except Exception as e:
        error['detail'] = Messages.err_query_update
        error['errorCode'] = CustomErrorCodes.e1008
        data['error'] = error
        logger.error(e)
    return (data)
