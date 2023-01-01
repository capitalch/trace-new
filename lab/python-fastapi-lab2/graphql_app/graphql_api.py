from features import GraphQL, load_schema_from_path, make_executable_schema, QueryType
from database.db_handler import getAccounts
# from features import jsonable_encoder

type_defs = load_schema_from_path('graphql_app')
query = QueryType()

@query.field('user')
def resolve_user(*_):
    return ('Sushant')

@query.field('accounts')
async def get_accounts(*_):
    data = await getAccounts()
    return(data)

schema = make_executable_schema(type_defs, query)
graphQLApp = GraphQL(schema)
