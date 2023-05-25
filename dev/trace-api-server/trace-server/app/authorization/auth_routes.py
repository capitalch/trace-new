from app.vendors import APIRouter, Depends, HTTPException, status, BaseModel
from .auth_main import app_login, get_current_user, handle_forgot_pwd, renew_access_token_from_refresh_token

router = APIRouter()

class Payload(BaseModel):
    email: str

@router.post('/login', summary='Create access and refresh tokens for user')
async def resolve_login(bundle: app_login = Depends()):
    return (bundle)


@router.post('/check', summary='checks secured endpoint')
async def resolve_check(payload = Depends(get_current_user)):
    return payload


@router.post('/renew', summary='Creates new access_token from refresh_token')
async def renew_access_token(payload: renew_access_token_from_refresh_token = Depends()):
    return payload

@router.post('/forgot-pwd', summary='logic for when user clicks forgot password in login screen')
async def forgot_pwd(payload: Payload):
    email = payload.email
    return(await handle_forgot_pwd(email))