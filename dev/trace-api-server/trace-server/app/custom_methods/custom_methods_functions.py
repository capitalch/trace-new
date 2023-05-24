from app import AppHttpException, Messages, utils
from app.vendors import status
from app.db.helpers.db_helper_psycopg2 import exec_sql
from app.db import SqlQueriesAuth
from app.event_triggers.mail import send_email


async def change_password(params):
    userId = params.get('userId', None)
    pwd = params.get('password', None)
    email = params.get('email', None)
    emailSubject = params.get('emailSubject', None)
    emailBody = params.get('emailBody', None)

    if (userId is None or pwd is None):
        raise AppHttpException(detail=Messages.err_invalid_user_id_or_password,
                               status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, error_code='e1017')
    hash = utils.getPasswordHash(pwd)
    sql = SqlQueriesAuth.change_password
    try:
        exec_sql(sql=sql, sqlArgs={'hash': hash, 'id': userId, })
        try:
            # send mail here
            await send_email(subject=emailSubject,
                       body=emailBody, recipients=[email])
        except Exception as e1:
            raise AppHttpException(detail=Messages.err_email_send_error_server,
                                   error_code='e1020', status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        error = {}
        errorCode = getattr(e, 'errorCode', None)
        detail = getattr(e, 'detail', None)
        error['detail'] = Messages.Messages.err_updating_password_hash if detail is None else detail
        error['exception'] = str(e)
        error['errorCode'] = 'e1018' if errorCode is None else errorCode
        raise AppHttpException(detail=error['detail'],
                               status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, error_code=error['errorCode'])
