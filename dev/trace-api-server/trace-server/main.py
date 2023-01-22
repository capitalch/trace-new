from app.vendors import Depends, FastAPI, JSONResponse, Request
from app.authorization import auth_routes, auth_main
from app import AppHttpException, Messages
from app.db.db_routes import GraphQLApp
from app.utils import get_reusable_oauth
from app.authorization.auth_main import get_current_user_from_req
app = FastAPI()

# Routers
app.include_router(auth_routes.router,)

# Exception handling


@app.exception_handler(AppHttpException)
async def app_custom_exception_handler(request: Request, exc: AppHttpException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            'detail': exc.detail,
            'error_code': exc.error_code,
        },
        headers={"X-error": exc.detail}
    )


@app.get("/api")
async def home():
    return {"message": "Hello World for api"}

# Internal server error handling


@app.middleware("http")
async def exception_handling(request: Request, call_next):
    try:
        path = request.url.path
        if(path.find('graphql')):
            auth_main.get_current_user_from_req(request)
        return await call_next(request)
    except (Exception, AppHttpException) as e:
        return JSONResponse(status_code=500, content={
            'detail': str(e)
        }, headers={"X-error": Messages.err_unknown_server_error})

# @app.middleware("http")
# async def exception_handling(request, call ):
#     try:
#         return request
        # path = request.url.path
        # if(path.find('graphql')):
        #     auth_main.get_current_user_from_req(request)
        # return await call_next(request)
    # except (Exception) as e:
    #     print(e)
        # return JSONResponse(status_code=500, content={
        #     'detail': str(e)
        # }, headers={"X-error": Messages.err_unknown_server_error})

# Load graphQL as separate app
app.mount('/graphql', GraphQLApp)

# uvicorn.run('main:app')
