from app import AppHttpException, Messages
from app.vendors import Any, status
from .sql_auth import SqlAuth
from .db_models import UserClass
from .db_psycopg import exec_generic_query, exec_generic_update


async def generic_query(sql: str, sqlArgs: dict[str, str], dbName: str = None, dbParams: dict = None, schema: str = None, ):
    records = await exec_generic_query(sql=sql, sqlArgs=sqlArgs, dbName=dbName, db_params=dbParams, schema=schema)
    return records


async def exec_sql_object(sqlObject: Any, acur: Any):
    ret = None
    try:
        tableName = sqlObject.get('tableName', None)
        ret = 'abcd'
        return (ret)
    except Exception as e:
        raise Exception()


async def generic_update(sqlObject: Any = {}):
    ret = await exec_generic_update(execSqlObject=exec_sql_object, sqlObject=sqlObject)
    return (ret)
