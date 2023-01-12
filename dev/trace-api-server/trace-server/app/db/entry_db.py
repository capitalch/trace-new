from app import AppHttpException, Messages
from app.vendors import status
from .psycopg_handler import exec_sql
from .sql_entry import Sqls
from .models_db import UserClass


async def generic_query(sql: str, sqlArgs: dict, dbName: str, dbParams: dict, schema: str, ):
    try:
        records = await exec_sql(sql=sql, sqlArgs=sqlArgs, db_name=dbName)
    except Exception as e:
        raise AppHttpException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_user_details(uidOrEmail: str):
    # isUserExsts: bool = False
    try:
        record = await exec_sql(sql=Sqls.get_user_details, sql_args={'uidOrEmail': uidOrEmail})
    except Exception as e:
        raise AppHttpException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    # user = None
    # if(records):
    #     user = UserClass()
    return (record)
