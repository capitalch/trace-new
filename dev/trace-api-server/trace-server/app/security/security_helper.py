from app import AppHttpException, messages, settings
from app.vendors import status
from .security_utils import verify_password
from app.db.db_entry import get_user_details_from_db

async def get_login_payload_bundle(uidOrEmail: str, password: str):
    records = await get_user_details_from_db()
    return (records)

def get_super_admin_uid_email_from_config():
    try:
        superAdminUid = settings.SUPER_ADMIN_UID
        superAdminEmail = settings.SUPER_ADMIN_EMAIL
        return superAdminUid, superAdminEmail
    except Exception:
        raise AppHttpException(
            detail=messages.err_config_file, status_code=status.HTTP_401_UNAUTHORIZED)


def is_super_admin_user(uidOrEmail, password) -> bool:
    ret = False
    superAdminUid, superAdminEmail = get_super_admin_uid_email_from_config()
    superAdminHash = settings.SUPER_ADMIN_HASH
    if ((uidOrEmail == superAdminUid) or (uidOrEmail == superAdminEmail)):
        ret = verify_password(password, superAdminHash)
    return (ret)
