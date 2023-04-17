from app import AppHttpException, Config, CustomErrorCodes, Messages
from app.vendors import json, status
from .auth_utils import create_access_token, create_refresh_token, verify_password
from app.db import UserClass, SqlQueriesAuth
# from app.db.helpers.db_helper_asyncpg import exec_generic_query
from app.db.helpers.db_helper_psycopg2 import exec_sql


def get_bundle(user: UserClass):
    accessToken = create_access_token({
        'userId': user.userId
    })
    refreshToken = create_refresh_token({
        'userId': user.userId
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
    # details: list = await exec_generic_query(sql=SqlQueriesAuth.get_user_details, sqlArgs={'uidOrEmail': uidOrEmail})
    details: list = exec_sql(sql=SqlQueriesAuth.get_user_details, sqlArgs={'uidOrEmail': uidOrEmail})
    if (details):
        jsonResultDict = details[0]['jsonResult']
        # jsonResultDict = jsonResult #json.loads(jsonResult)
        userDetails = jsonResultDict.get('userDetails')
        businessUnits = jsonResultDict.get('businessUnits')
        role = jsonResultDict.get('role')

        if((userDetails is None)):
            raise AppHttpException(
                detail=Messages.err_invalid_uid, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1002'
            )

        userType = userDetails['userType']
        isActive = userDetails['isActive']
        if (not isActive):
            raise AppHttpException(
                detail=Messages.err_inactive_user, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1012')
        hash = userDetails['hash']
        isPwdVerified = verify_password(password, hash)
        if (not isPwdVerified):
            raise AppHttpException(
                detail=Messages.err_invalid_pwd, status_code=status.HTTP_401_UNAUTHORIZED, error_code='e1011')

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
            detail=Messages.err_config_file, status_code=status.HTTP_401_UNAUTHORIZED, error_code=CustomErrorCodes.e1006)
