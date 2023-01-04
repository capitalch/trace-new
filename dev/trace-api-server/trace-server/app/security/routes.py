from app.vendors import Any, APIRouter, Depends, OAuth2PasswordRequestForm, JSONResponse
from .deps import app_login, get_current_user
router = APIRouter()

@router.post('/login', summary='Create access and refresh tokens for user')
async def resolve_login(tokens: app_login = Depends()):
    # ret = await app_login(form_data)
    return (tokens)


@router.post('/check', summary='check secured endpoint')
async def resolve_check(payload: get_current_user = Depends()):
    return payload
