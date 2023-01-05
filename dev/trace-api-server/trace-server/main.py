from app.vendors import FastAPI, JSONResponse, Request
from app.security import routes as security_routes
from app import AppHttpException, messages

app = FastAPI()
app.include_router(security_routes.router,)


@app.exception_handler(AppHttpException)
async def app_custom_exception_handler(request: Request, exc: AppHttpException):
    return JSONResponse(
        status_code=exc.statusCode,
        content={
            'detail': exc.detail
        },
        headers={"X-error": exc.detail}
    )


@app.get("/api")
async def home():
    return {"message": "Hello World for api"}


@app.middleware("http")
async def exception_handling(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        return JSONResponse(status_code=500, content={
            'message': messages.err_unknown_server_error
        }, headers={"X-error": messages.err_unknown_server_error})
