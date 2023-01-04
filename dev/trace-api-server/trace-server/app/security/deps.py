from app.vendors import Depends, HTTPException,jwt, OAuth2PasswordRequestForm, OAuth2PasswordBearer, status, ValidationError
from app.config import settings
from .utils import create_access_token, create_refresh_token, get_hashed_password, verify_password

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


async def app_login(formData: OAuth2PasswordRequestForm = Depends()):
    uidOrEmail = formData.username
    password = formData.password

    configUid = settings.SUPER_ADMIN_UID
    configEmail = settings.SUPER_ADMIN_EMAIL

    def is_super_admin() -> bool:
        ret = False
        configHash = settings.SUPER_ADMIN_HASH
        if ((uidOrEmail == configUid) or (uidOrEmail == configEmail)):
            ret = verify_password(password, configHash)
        return (ret)

    if (is_super_admin()):
        accessToken = create_access_token({
            "uid": configUid,
            "email": configEmail,
            "userType": "superAdmin"
        })
        refreshToken = create_refresh_token({
            "uid": configUid,
            "email": configEmail,
            "userType": "superAdmin"
        })

    return {
        "access_token": accessToken,
        "refresh_token": refreshToken,
    }


async def get_current_user(token: str = Depends(reuseable_oauth)):
    try:
        payload = jwt.decode(token, settings.ACCESS_TOKEN_SECRET_KEY,
                            algorithms=[settings.ALGORITHM])
        return (payload)
    except(ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
