from app.vendors import BaseModel, Depends, jwt, OAuth2PasswordRequestForm, OAuth2PasswordBearer, Request, status, ValidationError
from app import AppHttpException, Config, CustomErrorCodes, logger, Messages
from .auth_helper import get_super_admin_bundle, get_other_user_bundle
from .auth_utils import create_access_token
from jwt.exceptions import ExpiredSignatureError, InvalidSignatureError, InvalidTokenError

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
            detail=Messages.err_invalid_uid, status_code=status.HTTP_401_UNAUTHORIZED, error_code=CustomErrorCodes.e1002
        )

    return (bundle)


async def get_current_user(token: str = Depends(reuseable_oauth)):
    try:
        if (not token.strip()):
            raise Exception
        payload = jwt.decode(token, Config.ACCESS_TOKEN_SECRET_KEY,
                             algorithms=[Config.ALGORITHM])
        return (payload)
    except Exception as e:
        logger.error(e)
        raise AppHttpException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=Messages.err_invalid_credentials,
            error_code=CustomErrorCodes.e1003
        )


class Item(BaseModel):
    token: str


async def renew_access_token_from_refresh_token(item: Item):
    '''
    A new access token is returned as payload against the refresh token
    '''
    try:
        itemDict = item.dict()
        token = itemDict.get('token')
        if (not token.strip()):
            raise Exception
        payload = jwt.decode(token, Config.REFRESH_TOKEN_SECRET_KEY,
                             algorithms=[Config.ALGORITHM])
        accessToken = create_access_token(payload.get('sub'))
        return {
            'accessToken': accessToken
        }

    except Exception as e:
        logger.error(e)
        raise AppHttpException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=Messages.err_renew_access_token,
            error_code='e1004'
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
    except ExpiredSignatureError as e:
        logger.error(e)
        raise AppHttpException(
            detail=Messages.err_access_token_signature_expired, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1013'
        )
    except InvalidSignatureError as e:
        logger.error(e)
        raise AppHttpException(
            detail=Messages.err_access_token_signature_invalid, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1014'
        )
    except InvalidTokenError as e:
        logger.error(e)
        raise AppHttpException(
            detail=Messages.err_access_token_invalid, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1015'
        )
    except Exception as e:
        logger.error(e)
        raise AppHttpException(
            detail=Messages.err_access_token_invalid, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1015'
        )
