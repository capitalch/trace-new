from fastapi import Depends, FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from app.utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password
)

app = FastAPI()

@app.post('/login', summary='Create access and refresh tokens for user')
async def login(form_data:OAuth2PasswordRequestForm = Depends()):
    user = 'Sushant'
    if(user is None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect uid or password')
    
    hashed_pass = 'abcd'
    # if not verify_password(form_data.password, hashed_pass):
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Incorrect email or password"
    #     )
    return {
        "access_token": create_access_token(user),
        "refresh_token": create_refresh_token(user),
    }
