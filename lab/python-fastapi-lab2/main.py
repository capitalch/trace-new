from features import FastAPI, GraphQL, load_schema_from_path, make_executable_schema, PLAYGROUND_HTML, QueryType
from graphql_app.graphql_api import graphQLApp
import accounts.accounts_main
app = FastAPI()
app.include_router(accounts.accounts_main.router)


@app.get('/')
async def root():
    return ({"message": "Hello world1"})

app.mount('/graphql', graphQLApp)
# app.mount('/graphql', GraphQL(schema=schema))
