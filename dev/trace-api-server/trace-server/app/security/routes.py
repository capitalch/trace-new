from app.vendors import APIRouter, Depends, OAuth2PasswordRequestForm, JSONResponse
from .utils import app_login
router = APIRouter()


@router.post('/login', summary='Create access and refresh tokens for user')
async def resolve_login(tokens: app_login = Depends()):
    # ret = await app_login(form_data)
    return (tokens)
