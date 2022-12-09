from fastapi import FastAPI
app = FastAPI()
@app.get("/api")
async def home():
    return {"message": "Hello World for api"}