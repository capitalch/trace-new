from app.vendors import Depends, jwt, OAuth2PasswordRequestForm, OAuth2PasswordBearer, Request, status, ValidationError
from app import AppHttpException, Messages, Config
from .auth_helper import get_super_admin_bundle, get_other_user_bundle
from .auth_utils import create_access_token
# from app.utils import get_reusable_oauth

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


async def app_login(formData: OAuth2PasswordRequestForm = Depends()):
    '''
        returns access and refresh token along with user details. Raises exception if user does not exist
    '''
    uidOrEmail = formData.username.strip()
    password = formData.password.strip()

    if ((not uidOrEmail) or (not password)):
        raise AppHttpException(
            detail=Messages.err_uid_password_empty, status_code=status.HTTP_400_BAD_REQUEST)

    bundle = get_super_admin_bundle(uidOrEmail, password)
    if (bundle is None):
        bundle = await get_other_user_bundle(uidOrEmail, password)
    if (bundle is None):
        raise AppHttpException(
            detail=Messages.err_invalid_uid, status_code=status.HTTP_401_UNAUTHORIZED
        )

    return (bundle)


# async def get_current_user(token: str = Depends(reuseable_oauth)):
async def get_current_user(token: str = Depends(reuseable_oauth)):
    try:
        if (not token.strip()):
            raise Exception
        payload = jwt.decode(token, Config.ACCESS_TOKEN_SECRET_KEY,
                             algorithms=[Config.ALGORITHM])
        return (payload)
    except (Exception):
        raise AppHttpException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=Messages.err_invalid_credentials
        )


async def renew_access_token_from_refresh_token(token: str = Depends(reuseable_oauth)):
    '''
    A new access token is returned as payload against the refresh token
    '''
    try:
        if (not token.strip()):
            raise Exception
        payload = jwt.decode(token, Config.REFRESH_TOKEN_SECRET_KEY,
                             algorithms=[Config.ALGORITHM])
        accessToken = create_access_token(payload.get('sub'))
        return {
            'access_token': accessToken
        }

    except (Exception):
        raise AppHttpException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=Messages.err_renew_access_token
        )


async def validate_token(request: Request):
    try:
        err = None
        auth: str = request.headers['Authorization']
        if (auth):
            token = auth.split()[1].strip()
            jwt.decode(token, Config.ACCESS_TOKEN_SECRET_KEY,
                       algorithms=[Config.ALGORITHM])
        else:
            err = True
        if (err):
            raise Exception
        return (True)
    except (Exception):
        raise AppHttpException(
            detail=Messages.err_invalid_access_token, status_code=status.HTTP_401_UNAUTHORIZED
        )
