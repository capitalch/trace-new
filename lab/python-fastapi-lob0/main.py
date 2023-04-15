from fastapi import FastAPI, Request

app = FastAPI()

@app.get('/api')
async def api():
    return({"message":"ok"})

@app.middleware("http")
async def process(request:Request, call_next):
    response = await call_next(request)
    return(response)