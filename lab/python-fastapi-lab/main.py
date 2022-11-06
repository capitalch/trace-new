from fastapi import FastAPI
from data_handler.handler import router
from data_handler.graphql_main import graphqlRouter
from ariadne import QueryType, make_executable_schema, load_schema_from_path
from ariadne.asgi import GraphQL


# app = FastAPI()
# app.include_router(router)
# app.include_router(graphqlRouter)

# @app.get("/api")
# async def home():
#     return {"message": "Hello World for api"}

type_defs = load_schema_from_path("schema.graphql")

query = QueryType()
@query.field("blogs")
def resolve_hello(*_):
    return "Hello world!"

schema = make_executable_schema(type_defs, query)
app = GraphQL(schema, debug=True)
