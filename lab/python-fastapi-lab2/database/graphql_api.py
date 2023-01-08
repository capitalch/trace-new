from features import GraphQL, load_schema_from_path, make_executable_schema, QueryType, jsonable_encoder
from database.db_handler import getAccounts
# from database.psycopg import get_accounts1, get_psycopg_data
from database.psycopg import get_psycopg_data_async
from database.asyncpg import get_asyncpg_data
# from features import jsonable_encoder

type_defs = load_schema_from_path('database')
query = QueryType()


@query.field('user')
def resolve_user(*_):
    return ('Sushant')


@query.field('accounts')
async def get_accounts(*_):
    data = await getAccounts()

    return (jsonable_encoder(data))


@query.field('accounts1')
async def resolve_psycopg(*_):
    # data = await get_accounts1()
    # data1 = jsonable_encoder(data)
    return ('acc')


@query.field('psycopg')
async def resolve_psycopg(*_):
    # data = get_psycopg_data()
    # data1 = jsonable_encoder(data)
    return ('psycopg')


@query.field('apsycopg')
async def resolve_psycopg(*_):
    # data = get_psycopg_data()
    data = await get_psycopg_data_async()
    data1 = jsonable_encoder(data)
    return (data1)


@query.field('asyncpg')
async def resolve_asyncpg(*_):
    # data = get_psycopg_data()
    data = await get_asyncpg_data()
    data1 = jsonable_encoder(data)
    return (data1)

schema = make_executable_schema(type_defs, query)
GraphQLApp = GraphQL(schema)
