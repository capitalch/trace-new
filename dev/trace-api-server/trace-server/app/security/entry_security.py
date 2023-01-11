from app.vendors import Depends,  jwt, OAuth2PasswordRequestForm, OAuth2PasswordBearer, status, ValidationError
from app import AppHttpException, Messages, Config
from .helper_security import  get_super_admin_details_from_config
from .utils_security import create_access_token, create_refresh_token, verify_password
# from .helper_security import get_login_payload_bundle
from app.db.utils_db import UserClass
from app.db.entry_db import get_user_details

# from app.db.db_main import fetch_sql

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

    def get_bundle(user: UserClass):
        accessToken = create_access_token({
            'userId': user.userId,
            'uid': user.uid,
            'email': user.email,
            'clientId': user.clientId
        })
        refreshToken = create_refresh_token({
            'userId': user.userId,
            'uid': user.uid,
            'email': user.email,
            'clientId': user.clientId
        })
        return ({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'userDetails': user
        })

    def check_super_admin_user():
        isSuperAdminUser = False
        user = None
        bundle = None
        superAdminUid, superAdminEmail, superAdminHash, superAdminMobileNo = get_super_admin_details_from_config()
        if ((uidOrEmail == superAdminUid) or (uidOrEmail == superAdminEmail)):
            isPwdVerified = verify_password(password, superAdminHash)
            if(isPwdVerified):
                user = UserClass(uid=superAdminUid, userEmail=superAdminEmail,
                                 mobileNo=superAdminMobileNo, userType='S')
                bundle= get_bundle(user)
            else:
                raise AppHttpException(status_code=status.HTTP_401_UNAUTHORIZED, detail=Messages.err_invalid_super_admin_password)
                
        return isSuperAdminUser, bundle

    async def check_other_user():
        isAdminUser = False
        isBusinessUser = False
        isUserExists = False
        userDetails = await get_user_details(uidOrEmail)
        return(userDetails)
        
    if ((not uidOrEmail) or (not password)):
        raise AppHttpException(
            detail=Messages.err_uid_password_empty, status_code=status.HTTP_400_BAD_REQUEST)

    userDetails = await check_other_user()
    # records = await get_login_payload_bundle(uidOrEmail, password)

    return ''


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
