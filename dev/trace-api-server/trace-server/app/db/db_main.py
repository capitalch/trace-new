from app.vendors import Connection, connect, create_pool, PreparedStatement, Record, List, jsonable_encoder
from app import AppHttpException, settings
pool_store = {}


async def get_connection_pool(db_name: str):
    if (db_name in pool_store):
        return (pool_store[db_name])
    else:
        pool = await create_pool(user=settings.DB_USER, password=settings.DB_PASSWORD, port=settings.DB_PORT, host=settings.DB_HOST, database=db_name)
        pool_store[db_name] = pool
        return (pool)


async def get_connection(db_name: str) -> Connection:
    pool = await get_connection_pool(db_name)
    conn = await pool.acquire()
    return (conn)


async def fetch_sql(db_name: str) -> List[Record]:
    try:
        conn: Connection = await get_connection(db_name)
        st0: PreparedStatement = await conn.prepare('''set search_path to $1''')
        await st0.fetch('test_schema')
        st1: PreparedStatement = await conn.prepare('select * from "UserM"')
        # await st0.fetch()
        records = await st1.fetch()
        # temp = await conn.cursor('select * from "UserM"')
        # temp = await conn.execute('select * from "UserM"')
        # records: List[Record] = await conn.fetch('set search_path to public; select * from "UserM"')
        data = jsonable_encoder(records)
        await conn.close()
        return (data)
    except Exception as ex:
        print(ex)
        raise AppHttpException('Sql error')
