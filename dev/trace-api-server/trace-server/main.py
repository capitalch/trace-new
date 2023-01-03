from features.vendors import FastAPI
from features.security import security_routes


app = FastAPI()
app.include_router(security_routes.router)


@app.get("/api")
async def home():
    return {"message": "Hello World for api"}
