from app.vendors import Depends, GraphQL, jsonable_encoder, load_schema_from_path, make_executable_schema, MutationType, QueryType, unquote
# from .db_main import generic_update, generic_query
from .db_main_sync import generic_update
from app.authorization import auth_main
from fastapi.middleware.cors import CORSMiddleware
import json

type_defs = load_schema_from_path('app/db')
query = QueryType()
mutation = MutationType()


@query.field('user')
async def resolve_user(*_):
    return ('Sushant')


@query.field('genericQuery')
async def resolve_generic_query(_, info, value=None):
    sql = 'select * from "UserM"'
    # ret = await generic_query(sql=sql, sqlArgs={})
    # data1 = jsonable_encoder(ret)
    data1 = 'abcd'
    return (data1)


@mutation.field('genericUpdate')
async def resolve_generic_update(_, info, value=''):
    # await auth_main.validate_token(request)
    valueString = unquote(value)
    sqlObj = json.loads(valueString)

    ret = generic_update(sqlObject=sqlObj)
    return (ret)


schema = make_executable_schema(type_defs, query, mutation)

GraphQLApp: GraphQL = CORSMiddleware(
    GraphQL(schema), allow_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], allow_methods=['*'], allow_headers=['*'], allow_credentials=True
)