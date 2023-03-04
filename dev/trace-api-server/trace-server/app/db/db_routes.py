from app.vendors import GraphQL, load_schema_from_path, make_executable_schema, MutationType, QueryType
from fastapi.middleware.cors import CORSMiddleware
from .db_main import resolve_generic_query, resolve_generic_update, resolve_query_clients, resolve_update_client, resolve_update_user

type_defs = load_schema_from_path('app/db')
query = QueryType()
mutation = MutationType()


@query.field('genericQuery')
async def generic_query(_, info, value=''):
    return (resolve_generic_query(info, value))


@mutation.field('genericUpdate')
async def generic_update(_, info, value=''):
    return (resolve_generic_update(info, value))


@query.field('queryClients')
async def query_client(_, info, value=''):
    return (resolve_query_clients(info, value))


@mutation.field('updateClient')
async def update_client(_, info, value=''):
    return (resolve_update_client(info, value))

@mutation.field('updateUser')
async def update_user(_,info, value):
    return(resolve_update_user(info, value))


schema = make_executable_schema(type_defs, query, mutation)

GraphQLApp: GraphQL = CORSMiddleware(
    GraphQL(schema), allow_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], allow_methods=['*'], allow_headers=['*'], allow_credentials=True
)
