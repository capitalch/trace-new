from app.vendors import Depends, FastAPI, JSONResponse, Request
from app.auth import auth_routes, auth_main
from app import AppHttpException, Messages
from app.db.db_routes import GraphQLApp

app = FastAPI()

# Routers
app.include_router(auth_routes.router,)

# Exception handling

# app.add_route('/graphql', GraphQLApp)

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
    
def my_dep(req:Request):
    raise AppHttpException('Test1 exception', status_code=500)
    return('test depend')

@app.get("/api")
async def home(ret:str = Depends(my_dep)):
    return {"message": ret}


# @app.middleware("http")
# async def exception_handling(request:Request, call_next ):
#     try:
#         path = request.url.path
#         if(path.find('graphql') != -1):
#             await auth_main.validate_token(request)
#         return await call_next(request)
#     except (Exception) as e:
#         return JSONResponse(status_code=getattr(e,'status_code', None) or 500, content={
#             'detail': getattr(e,'detail',None) or str(e)
#         }, headers={"X-error": Messages.err_unknown_server_error})

# Load graphQL as separate app
app.mount('/graphql', GraphQLApp)



