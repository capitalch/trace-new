from fastapi import Depends, FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import RedirectResponse
# from app.schemas import UserOut, UserAuth, TokenSchema

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/items")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
