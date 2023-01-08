from app.vendors import GraphQL,JSONResponse, load_schema_from_path, make_executable_schema, MutationType, QueryType,Request, jsonable_encoder
from app import AppHttpException
from app.db.psycopg_handler import get_psycopg_data_async

type_defs = load_schema_from_path('app/db')
query = QueryType()


@query.field('user')
async def resolve_user(*_):
    # raise HTTPException(400,'Test exception')
    # raise AppHttpException('test')
    return ('Sushant')

@query.field('apsycopg')
async def resolve_psycopg(*_):
    data  = await get_psycopg_data_async('')
    data1 = jsonable_encoder(data)
    return(data1)


schema = make_executable_schema(type_defs, query)
GraphQLApp: GraphQL = GraphQL(schema)

