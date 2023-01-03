from features import connect, FastAPI, GraphQL, load_schema_from_path, make_executable_schema, QueryType, Request, JSONResponse, status
from features import SarletHttpException
from graphql_app.graphql_api import graphQLApp
from generic_classes import MyGenericException
import accounts.accounts_main
import lab.body_params

app = FastAPI(debug=False)
app.include_router(accounts.accounts_main.router)
app.include_router(lab.body_params.router)


@app.exception_handler(Exception)
async def my_generic_exception_handler(request: Request, exc: Exception):
    # return('xxx')
    return (JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Something unknown"}))

# @app.exception_handler(ArithmeticError)
# async def handle_exception(request: Request, exc: ArithmeticError):
#     return( JSONResponse(status_code=500, content={"message":"Unknown server error"} ))

# @app.middleware("http")
# async def exception_handling(request: Request, call_next):
#     try:
#         return await call_next(request)
#     except Exception as exc:
#         return JSONResponse(status_code=500, content="some content1")

@app.get('/')
async def root():
    # s = 1/0
    raise ArithmeticError('Division by zero')
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
