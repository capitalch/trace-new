from app.vendors import FastAPI, JSONResponse, Request, jsonable_encoder, HTTPException, status
from app.authorization import auth_routes, auth_main
from app import AppHttpException, logger, Messages
from app.db.db_routes import GraphQLApp
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   'http://127.0.0.1:3000', "http://localhost:3001",'*'],
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


@app.get("/api")
async def home(request: Request):
    print(request.headers)
    return {"message": 'abcd'}


@app.middleware("http")
async def handle_middleware(request: Request, call_next):
    try:
        path = request.url.path
        accessControl = request.headers.get('access-control-request-headers')
        # Uncomment below line to enable authentication
        # if (path.find('graphql') != -1):
        #     if (accessControl is None):
        #         await auth_main.validate_token(request)
        return await call_next(request)
    except (Exception) as e:
        logger.error(e)
        return JSONResponse(
            status_code=500,
            content={"detail": Messages.err_unknown_server_error},)
       