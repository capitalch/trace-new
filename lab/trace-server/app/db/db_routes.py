from app.vendors import Depends, GraphQL, graphql, HttpError, JSONResponse, load_schema_from_path, make_executable_schema, MutationType, QueryType, Request, jsonable_encoder
from app.db.db_psycopg import exec_sql
from app import AppHttpException
# from app.utils import get_reusable_oauth

type_defs = load_schema_from_path('app/db')
query = QueryType()


@query.field('user')
async def resolve_user(*_):
    return ('Sushant')

# @query.field('apsycopg')
# async def resolve_psycopg(*_):
#     data  = await exec_sql(sql='select * from "UserM"')
#     data1 = jsonable_encoder(data)
#     return(data1)


@query.field('apsycopg')
async def resolve_psycopg(_, info):
    # data = exec_sql(sql='select * from "UserM"')
    data = await exec_sql(sql='select * from "UserM"')
        # data = await exec_sql(sql='select * from "UserM" where uid = %(arg1)s or uid = %(arg2)s', sqlArgs= {'arg1': 'sales', 'arg2':'capitalch'})
    data1 = jsonable_encoder(data)
    return (data1)


@query.field('testexcep')
async def resolve_test_excep(_, info):
    raise HttpError('Graphql error')


schema = make_executable_schema(type_defs, query)

GraphQLApp: GraphQL = GraphQL(schema)


# @GraphQLApp.exception_handler(AppHttpException)
# async def app_custom_exception_handler(request: Request, exc: AppHttpException):
#     return JSONResponse(
#         status_code=exc.status_code,
#         content={
#             'detail': exc.detail,
#             'error_code': exc.error_code,
#         },
#         headers={"X-error": exc.detail}
#     )
