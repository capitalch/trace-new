from app.vendors import GraphQL,load_schema_from_path, make_executable_schema, MutationType, QueryType,jsonable_encoder
# from app import AppHttpException
from app.db.psycopg_handler import exec_sql

type_defs = load_schema_from_path('app/db')
query = QueryType()


@query.field('user')
async def resolve_user(*_):
    return ('Sushant')

@query.field('apsycopg')
async def resolve_psycopg(*_):
    data  = await exec_sql(sql='select * from "UserM"')
    data1 = jsonable_encoder(data)
    return(data1)


schema = make_executable_schema(type_defs, query)
GraphQLApp: GraphQL = GraphQL(schema)


