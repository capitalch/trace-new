from app import AppHttpException, Messages
from app.vendors import Any, status
from .db_psycopg import exec_sql
from .sql_auth import SqlAuth
from .db_models import UserClass


async def generic_query(sql: str, sqlArgs: dict[str, str], dbName: str = None, dbParams: dict = None, schema: str = None, ):
    try:
        records = await exec_sql(sql=sql, sqlArgs=sqlArgs, dbName=dbName, db_params=dbParams, schema=schema)
    except Exception as e:
        raise AppHttpException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return records

async def exec_sql_object(sqlObject: Any):
    ret = None
    try:
        tableName = sqlObject.get('tableName', None)
        
    except Exception as e:
        pass
    pass