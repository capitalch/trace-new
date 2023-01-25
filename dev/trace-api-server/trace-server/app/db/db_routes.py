from app.vendors import Depends, GraphQL, load_schema_from_path, make_executable_schema, MutationType, QueryType, jsonable_encoder
from app.db.db_psycopg import exec_sql

type_defs = load_schema_from_path('app/db')
query = QueryType()


@query.field('user')
async def resolve_user(*_):
    return ('Sushant')


@query.field('apsycopg')
async def resolve_psycopg(_, info):
    # data = exec_sql(sql='select * from "UserM"')
    data = await exec_sql(sql='select * from "UserM"')
    # data = await exec_sql(sql='select * from "UserM" where uid = %(arg1)s or uid = %(arg2)s', sqlArgs= {'arg1': 'sales', 'arg2':'capitalch'})
    data1 = jsonable_encoder(data)
    return (data1)


schema = make_executable_schema(type_defs, query)
GraphQLApp: GraphQL = GraphQL(schema)
