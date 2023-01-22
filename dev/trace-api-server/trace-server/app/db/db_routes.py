from app.vendors import Depends, GraphQL,load_schema_from_path, make_executable_schema, MutationType, QueryType,jsonable_encoder
from app.db.db_psycopg import exec_sql
from app.utils import get_reusable_oauth

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
async def resolve_psycopg(_,info):
    data  = await exec_sql(sql='select * from "UserM"')
    data1 = jsonable_encoder(data)
    return(data1)


schema = make_executable_schema(type_defs, query)
GraphQLApp: GraphQL = GraphQL(schema)


