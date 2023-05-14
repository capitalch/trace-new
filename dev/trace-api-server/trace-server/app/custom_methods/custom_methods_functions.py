from app import AppHttpException, Messages, utils
from app.vendors import status
from app.db.helpers.db_helper_psycopg2 import exec_sql
from app.db import SqlQueriesAuth


async def change_password(params):
    userId = params.get('userId', None)
    pwd = params.get('password', None)
    if (userId is None or pwd is None):
        raise AppHttpException(detail=Messages.err_invalid_user_id_or_password,
                               status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, error_code='e1017')
    hash = utils.getPasswordHash(pwd)
    sql = SqlQueriesAuth.change_password
    try:
        exec_sql(sql=sql, sqlArgs={'hash': hash, 'id': userId, })
    except Exception as e:
        raise AppHttpException(detail=Messages.err_updating_password_hash,
                               status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, error_code='e1018')
