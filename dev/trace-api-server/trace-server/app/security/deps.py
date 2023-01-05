from app.vendors import Depends,  jwt, OAuth2PasswordRequestForm, OAuth2PasswordBearer, status, ValidationError
from app import AppHttpException, messages, settings
from .utils import create_access_token, create_refresh_token, get_hashed_password, verify_password

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


def get_super_admin_uid_email_from_config():
    try:
        superAdminUid = settings.SUPER_ADMIN_UID
        superAdminEmail = settings.SUPER_ADMIN_EMAIL
        return superAdminUid, superAdminEmail
    except Exception:
        raise AppHttpException(
            message=messages.err_config_file, statusCode=status.HTTP_401_UNAUTHORIZED)


def is_super_admin(uidOrEmail, password) -> bool:
    ret = False
    superAdminUid, superAdminEmail = get_super_admin_uid_email_from_config()
    superAdminHash = settings.SUPER_ADMIN_HASH
    if ((uidOrEmail == superAdminUid) or (uidOrEmail == superAdminEmail)):
        ret = verify_password(password, superAdminHash)
    return (ret)


async def app_login(formData: OAuth2PasswordRequestForm = Depends()):
    uidOrEmail = formData.username.strip()
    password = formData.password.strip()
    res = {
        'access_token': '',
        'refresh_token': ''
    }
    if ((not uidOrEmail) or (not password)):
        raise AppHttpException(
            message=messages.err_uid_password_empty, statusCode=status.HTTP_400_BAD_REQUEST)

    if (is_super_admin(uidOrEmail, password)):
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

    return res


async def get_current_user(token: str = Depends(reuseable_oauth)):
    try:
        payload = jwt.decode(token, settings.ACCESS_TOKEN_SECRET_KEY,
                             algorithms=[settings.ALGORITHM])
        return (payload)
    except (ValidationError):
        raise AppHttpException(
            statusCode=status.HTTP_403_FORBIDDEN,
            message=messages.err_invalid_credentials
        )
