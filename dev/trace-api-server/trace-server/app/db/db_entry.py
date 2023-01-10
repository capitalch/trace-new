from .psycopg_handler import exec_sql
from .sql_app_entry import sqls

async def get_user_details_from_db():
    records = await exec_sql(sql=sqls.get_user_details)
    return(records)
