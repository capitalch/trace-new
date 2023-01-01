from features import connect, FastAPI, GraphQL, load_schema_from_path, make_executable_schema, QueryType, Request, JSONResponse, status
from graphql_app.graphql_api import graphQLApp
from generic_classes import MyGenericException
import accounts.accounts_main
import lab.body_params

app = FastAPI()
app.include_router(accounts.accounts_main.router)
app.include_router(lab.body_params.router)


@app.exception_handler(MyGenericException)
async def my_generic_exception_handler(request: Request, exc: MyGenericException):
    return (JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": exc.name}))


@app.get('/')
async def root():
    return ({"message": "Hello world1"})

# @app.middleware('http')
# async def my_middleware(requext:Request, call_next):
#     print('middleware')
#     response = await call_next(requext)
#     response.headers['X-version'] = 'V1.2.12'
#     return(response)


@app.get('/db')
async def db():
    val = 'Check db'
    return (val)


app.mount('/graphql', graphQLApp)


# loop = asyncio.get_event_loop()
# loop.run_until_complete(run())
