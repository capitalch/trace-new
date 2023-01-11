from app import AppHttpException, Messages, Config
from app.vendors import status
from .utils_security import verify_password
from app.db.entry_db import get_user_details

# async def get_login_payload_bundle(uidOrEmail: str, password: str):
#     records = await get_user_details()
#     return (records)

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


# def is_super_admin_user(uidOrEmail, password) -> bool:
#     ret = False
#     superAdminUid, superAdminEmail = get_super_admin_uid_email_from_config()
#     superAdminHash = Config.SUPER_ADMIN_HASH
#     if ((uidOrEmail == superAdminUid) or (uidOrEmail == superAdminEmail)):
#         ret = verify_password(password, superAdminHash)
#     return (ret)
