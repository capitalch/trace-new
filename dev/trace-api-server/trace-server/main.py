from app.vendors import FastAPI, JSONResponse, Request
from app.security import routes


app = FastAPI()
app.include_router(routes.router,)

@app.get("/api")
async def home():
    return {"message": "Hello World for api"}

@app.middleware("http")
async def exception_handling(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        return JSONResponse(status_code=500, content="Unknown error at server")