from app.vendors import Depends, FastAPI, JSONResponse, Request
from app.authorization import auth_routes, auth_main
from app import AppHttpException, logger, Messages
from app.db.db_routes import GraphQLApp
from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", 'http://127.0.0.1:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(auth_routes.router,)
app.add_route('/graphql/', GraphQLApp)
# logger.info('inside main.py')

# Exception handling
@app.exception_handler(AppHttpException)
async def app_custom_exception_handler(request: Request, exc: AppHttpException):
    return JSONResponse(
        status_code=exc.statusCode,
        content={
            'detail': exc.detail,
            'errorCode': exc.errorCode,
        },
        headers={"X-error": exc.detail}
    )


@app.post("/api")
async def home(request: Request):
    print(request.headers)
    return {"message": 'abcd'}


@app.middleware("http")
async def handle_middleware(request: Request, call_next):
    try:
        path = request.url.path
        accessControl = request.headers.get('access-control-request-headers')
        if (path.find('graphql') != -1):
            if (accessControl is None):
                await auth_main.validate_token(request)
        return await call_next(request)
    except (Exception) as e:
        logger.error(e)
        return JSONResponse(status_code=getattr(e, 'status_code', None) or 500, content={
            'detail': getattr(e, 'detail', None) or str(e) or Messages.err_unknown_server_error,
            'errorCode': 'e1001'
        }, headers={"X-error": Messages.err_unknown_server_error})

# Load graphQL as separate app
# app.mount('/graphql', GraphQLApp)
# uvicorn.run('main:app')

# print(request.headers)
# auth = request.headers.get('authorization', None)
# if(path.find('graphql') != -1):
        # if(auth is None):
        #     pass
        # else:
        # await auth_main.validate_token(request)
