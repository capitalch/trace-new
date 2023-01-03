from app.vendors import FastAPI
from app.security import routes


app = FastAPI()
app.include_router(routes.router)

@app.get("/api")
async def home():
    return {"message": "Hello World for api"}
