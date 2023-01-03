from features.vendors import APIRouter, Depends, OAuth2PasswordRequestForm, JSONResponse
from .security_utils import app_login
router = APIRouter()

@router.post('/login', summary='Create access and refresh tokens for user')
async def resolve_login(form_data: OAuth2PasswordRequestForm = Depends()):
    ret = await app_login(form_data)
    return (ret)
