from fastapi import FastAPI, APIRouter
from ariadne import  load_schema_from_path, make_executable_schema, QueryType
from ariadne.asgi import GraphQL, graphql
from ariadne.constants import PLAYGROUND_HTML