from app.vendors import APIRouter, Depends, HTTPException, status, BaseModel, jsonable_encoder
from .auth_main import app_login, get_current_user, handle_forgot_pwd, renew_access_token_from_refresh_token
from app import AppHttpException, Messages
from app.utils import getFinalAppHttpException
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
    try:
        email = getattr(payload, 'email', None)
        if(email is None):
            raise AppHttpException(Messages.err_email_not_provided,'e1022', status.HTTP_404_NOT_FOUND)
        return(await handle_forgot_pwd(email))
    except Exception as e:
        # Accumulate exception
        raise getFinalAppHttpException(e)
    
@router.get('/reset-password', summary='logic for when user click activation url for reset password in email message')
async def reset_password():
    pass