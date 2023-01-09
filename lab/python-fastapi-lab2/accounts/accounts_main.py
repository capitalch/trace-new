from features import APIRouter
# from features import FastAPI, GraphQL, load_schema_from_path, make_executable_schema, PLAYGROUND_HTML, QueryType

router = APIRouter()


@router.get('/route')
async def resolve_route():
    return ({"message": "Hello routes"})

