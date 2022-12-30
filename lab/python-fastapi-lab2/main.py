from features import FastAPI, GraphQL, load_schema_from_path, make_executable_schema, QueryType
from fastapi import APIRouter
import accounts.accounts_main
app = FastAPI()
app.include_router(accounts.accounts_main.router)


@app.get('/')
async def root():
    return ({"message": "Hello world1"})

type_defs = load_schema_from_path('graphql')
query = QueryType()


@query.field('user')
def resolve_user(*_):
    return ('Sushant')


schema = make_executable_schema(type_defs, query)
app = GraphQL(schema)

