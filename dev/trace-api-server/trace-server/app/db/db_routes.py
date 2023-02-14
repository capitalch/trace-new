from app.vendors import GraphQL, load_schema_from_path, make_executable_schema, MutationType, QueryType
from fastapi.middleware.cors import CORSMiddleware
from .db_main import resolve_generic_query, resolve_generic_update

type_defs = load_schema_from_path('app/db')
query = QueryType()
mutation = MutationType()


@query.field('genericQuery')
async def generic_query(_, info, value=''):
    return (resolve_generic_query(info, value))


@mutation.field('genericUpdate')
async def generic_update(_, info, value=''):
    return (resolve_generic_update(info, value))


schema = make_executable_schema(type_defs, query, mutation)

GraphQLApp: GraphQL = CORSMiddleware(
    GraphQL(schema), allow_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], allow_methods=['*'], allow_headers=['*'], allow_credentials=True
)
