from app.vendors import APIRouter, Depends, HTTPException, status
from .auth_main import app_login, get_current_user, renew_access_token_from_refresh_token
router = APIRouter()


@router.post('/login', summary='Create access and refresh tokens for user')
async def resolve_login(bundle: app_login = Depends()):
    return (bundle)


@router.post('/check', summary='checks secured endpoint')
async def resolve_check(payload: get_current_user = Depends()):
    return payload


@router.post('/renew-token', summary='Creates new access_token from refresh_token')
async def renew_access_token(payload: renew_access_token_from_refresh_token = Depends()):
    return payload
