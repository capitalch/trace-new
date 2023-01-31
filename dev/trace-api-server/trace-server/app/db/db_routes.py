from app.vendors import Depends, GraphQL, jsonable_encoder, load_schema_from_path, make_executable_schema, MutationType, QueryType, unquote
from app import AppHttpException
# from .db_main import generic_update, generic_query
# from .db_main_sync import generic_update as generic_udate_sync
from .db_main_asyncpg import generic_update as generic_update_asyncpg
from .db_asyncpg import exec_generic_query as generic_query_asyncpg
# from app.authorization import auth_main
from .sql_auth import SqlAuth
from fastapi.middleware.cors import CORSMiddleware
import json

type_defs = load_schema_from_path('app/db')
query = QueryType()
mutation = MutationType()


@query.field('genericQuery')
async def resolve_generic_query(_, info, value=''):
    error = {}
    data = None
    try:
        valueString = unquote(value)
        valueDict = json.loads(valueString) if valueString else {}
        # valueDict = json.loads(valueString)
        sqlId = valueDict.get('sqlId', None)
        if (not sqlId):
            raise AppHttpException('Bad sqlId', error_code='1001')
        sql = getattr(SqlAuth, sqlId)
        sqlArgs = valueDict.get('sqlArgs', None)
        data = await generic_query_asyncpg(sql=sql, sqlArgs=sqlArgs)
    except Exception as e:
        error['detail'] = 'Custo details'
        error['errorCode'] = '1001'
        data = error
    result = jsonable_encoder(data)
    return (result)


@mutation.field('genericUpdate')
async def resolve_generic_update(_, info, value=''):
    valueString = unquote(value)
    sqlObj = json.loads(valueString)

    ret = generic_update_asyncpg(sqlObject=sqlObj)
    return (ret)


schema = make_executable_schema(type_defs, query, mutation)

GraphQLApp: GraphQL = CORSMiddleware(
    GraphQL(schema), allow_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], allow_methods=['*'], allow_headers=['*'], allow_credentials=True
)

# @mutation.field('genericUpdateAsyncPg')
# async def resolve_generic_update(_, info, value=''):
#     valueString = unquote(value)
#     sqlObj = json.loads(valueString)

#     ret = await generic_update_asyncpg(sqlObject=sqlObj)
#     return (ret)

# sql = 'select * from "TestM" where id > %(id)s'
# value= {"id":232}

# @query.field('user')
# async def resolve_user(*_):
#     return ('Sushant')
