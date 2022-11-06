from core_dependencies import APIRouter, PLAYGROUND_HTML
from ariadne.asgi import GraphQL

graphqlRouter = APIRouter()

@graphqlRouter.get('/graphql')
async def graphql_playground():
    return PLAYGROUND_HTML, 200