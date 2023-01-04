from fastapi import Depends, FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from app.db import users
from app.utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password
)
from app.deps import get_current_user
from pydantic import ValidationError
from app.utils import (
    ALGORITHM,
    JWT_SECRET_KEY
)
from typing import Any
from jose import jwt
app = FastAPI()


@app.post('/login', summary='Create access and refresh tokens for user')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users.get(form_data.username, None)
    if (user is None):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect uid or password')

    hashed_pass = user.get('hash', None)
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    return {
        "access_token": create_access_token(user),
        "refresh_token": create_refresh_token(user),
    }


@app.post('/check', summary='Check secured endpoint')
async def resolve_check(payload: Any = Depends(get_current_user)):
    try:
        return (payload)

    except (ValidationError, Exception):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.post('/refresh', summary='Issue access token from refresh token')
async def resolve_refresh(payload: Any = Depends(get_current_user)):
    try:
        access_token = create_access_token(payload.get('sub'))
        return ({
            "access_token": access_token
        })

    except (ValidationError, Exception):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )