from app.vendors import Depends,  jwt, OAuth2PasswordRequestForm, OAuth2PasswordBearer, status, ValidationError
from app import AppHttpException, messages, settings
from .helper import get_login_payload_bundle, get_super_admin_uid_email_from_config, is_super_admin_user
from .utils import create_access_token, create_refresh_token, get_hashed_password, verify_password
# from app.db.db_main import fetch_sql

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


async def app_login(formData: OAuth2PasswordRequestForm = Depends()):
    uidOrEmail = formData.username.strip()
    password = formData.password.strip()
    res = {
        'access_token': '',
        'refresh_token': ''
    }
    if ((not uidOrEmail) or (not password)):
        raise AppHttpException(
            detail=messages.err_uid_password_empty, status_code=status.HTTP_400_BAD_REQUEST)

    if (is_super_admin_user(uidOrEmail, password)):
        superAdminUid, superAdminEmail = get_super_admin_uid_email_from_config()
        accessToken = create_access_token({
            "uid": superAdminUid,
            "email": superAdminEmail,
            "userType": "superAdmin"
        })
        refreshToken = create_refresh_token({
            "uid": superAdminUid,
            "email": superAdminEmail,
            "userType": "superAdmin"
        })
        res.update({'access_token': accessToken,
                   'refresh_token': refreshToken})
    # elif await is_admin_user(uidOrEmail, password):
    #     pass

    return res


async def get_current_user(token: str = Depends(reuseable_oauth)):
    try:
        if (not token.strip()):
            raise Exception
        payload = jwt.decode(token, settings.ACCESS_TOKEN_SECRET_KEY,
                             algorithms=[settings.ALGORITHM])
        return (payload)
    except (Exception):
        raise AppHttpException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=messages.err_invalid_credentials
        )


async def renew_access_token_from_refresh_token(token: str = Depends(reuseable_oauth)):
    try:
        if (not token.strip()):
            raise Exception
        payload = jwt.decode(token, settings.REFRESH_TOKEN_SECRET_KEY,
                             algorithms=[settings.ALGORITHM])
        accessToken = create_access_token(payload.get('sub'))
        return {
            'access_token': accessToken
        }

    except (Exception):
        raise AppHttpException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=messages.err_renew_access_token
        )
