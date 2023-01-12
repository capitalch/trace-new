from app import AppHttpException, Messages, Config
from app.vendors import status
from .utils_security import create_access_token, create_refresh_token, verify_password
from app.db import get_user_details, UserClass


def get_bundle(user: UserClass):
    accessToken = create_access_token({
        'userId': user.userId,
        'clientId': user.clientId
    })
    refreshToken = create_refresh_token({
        'userId': user.userId,
        'clientId': user.clientId
    })
    return ({
        'accessToken': accessToken,
        'refreshToken': refreshToken,
        'payload': user
    })


def get_super_admin_bundle(uidOrEmail: str, password: str):
    isSuperAdminUser = False
    user = None
    bundle = None
    superAdminUid, superAdminEmail, superAdminHash, superAdminMobileNo = get_super_admin_details_from_config()
    if ((uidOrEmail == superAdminUid) or (uidOrEmail == superAdminEmail)):
        isSuperAdminUser = verify_password(password, superAdminHash)
        if (isSuperAdminUser):
            user = UserClass(uid=superAdminUid, email=superAdminEmail,
                             mobileNo=superAdminMobileNo, userType='S')
            bundle = get_bundle(user)
    return bundle


async def get_other_user_bundle(uidOrEmail, password):
    user = None
    bundle = None
    userType = None
    details: list = await get_user_details(uidOrEmail)
    if (details):
        jsonResult = details[0]['jsonResult']
        userDetails = jsonResult.get('userDetails')
        businessUnits = jsonResult.get('businessUnits')
        role = jsonResult.get('role')

        userType = userDetails['userType']
        isActive = userDetails['isActive']
        if (not isActive):
            raise AppHttpException(
                detail=Messages.err_inactive_user, status_code=status.HTTP_401_UNAUTHORIZED)
        hash = userDetails['hash']
        isPwdVerified = verify_password(password, hash)
        if (not isPwdVerified):
            raise AppHttpException(
                detail=Messages.err_invalid_pwd, status_code=status.HTTP_401_UNAUTHORIZED)

        user = UserClass(userType=userType,
                         uid=userDetails['uid'],
                         clientId=userDetails['clientId'],
                         email=userDetails['userEmail'],
                         mobileNo=userDetails['mobileNo'],
                         userName=userDetails['userName'],
                         userId=userDetails['userId'],
                         role=role,
                         businessUnits=businessUnits
                         )
        bundle = get_bundle(user)
    return (bundle)


def get_super_admin_details_from_config():
    try:
        superAdminUid = Config.SUPER_ADMIN_UID
        superAdminEmail = Config.SUPER_ADMIN_EMAIL
        superAdminHash = Config.SUPER_ADMIN_HASH
        superAdminMobileNo = Config.SUPER_ADMIN_MOBILE_NO
        return superAdminUid, superAdminEmail, superAdminHash, superAdminMobileNo
    except Exception:
        raise AppHttpException(
            detail=Messages.err_config_file, status_code=status.HTTP_401_UNAUTHORIZED)
