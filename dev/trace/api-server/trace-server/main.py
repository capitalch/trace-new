from fastapi import FastAPI
from redirect import GraphQL
app = FastAPI()

@app.get("/api")
async def home():
    return {"message": "Hello World for api"}