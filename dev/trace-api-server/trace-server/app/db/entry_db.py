from .psycopg_handler import exec_sql
from .sql_app_entry import Sqls
from .utils_db import UserClass

async def get_user_details(uidOrEmail: str):
    # isUserExsts: bool = False
    records = await exec_sql(sql=Sqls.get_user_details, sql_args={'uidOrEmail': uidOrEmail})
    # user = None
    # if(records):
    #     user = UserClass()
    return(records)
