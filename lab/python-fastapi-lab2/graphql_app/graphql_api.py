from features import GraphQL, load_schema_from_path, make_executable_schema, QueryType, jsonable_encoder
from database.db_handler import getAccounts
from database.async_psycopg import get_accounts1, get_accounts2
# from features import jsonable_encoder

type_defs = load_schema_from_path('graphql_app')
query = QueryType()

@query.field('user')
def resolve_user(*_):
    return ('Sushant')

@query.field('accounts')
async def get_accounts(*_):
    data = await getAccounts()
    
    return(jsonable_encoder(data))

@query.field('accounts1')
async def resolve_psycopg(*_):
    data = await get_accounts1()
    data1 = jsonable_encoder(data)
    return(data1)

@query.field('accounts2')
async def resolve_psycopg(*_):
    data = get_accounts2()
    data1 = jsonable_encoder(data)
    return(data1)

schema = make_executable_schema(type_defs, query)
graphQLApp = GraphQL(schema)
