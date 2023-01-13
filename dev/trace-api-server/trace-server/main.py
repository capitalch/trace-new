from app.vendors import FastAPI, JSONResponse, Request, set_event_loop_policy, WindowsSelectorEventLoopPolicy
from app.auth import routes_auth
from app import AppHttpException, Messages
from app.db.routes_db import GraphQLApp

# set_event_loop_policy(WindowsSelectorEventLoopPolicy())
app = FastAPI()

# Routers
app.include_router(routes_auth.router,)

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
        return await call_next(request)
    except (Exception, AppHttpException) as e:
        return JSONResponse(status_code=500, content={
            'detail': str(e)
        }, headers={"X-error": Messages.err_unknown_server_error})

# Load graphQL as separate app
app.mount('/graphql', GraphQLApp)

# uvicorn.run('main:app')
