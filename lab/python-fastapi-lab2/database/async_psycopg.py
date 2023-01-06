import psycopg
from psycopg import connect, Connection, Cursor
from psycopg_pool import AsyncConnectionPool, ConnectionPool

poolStore = {}


def get_connection_pool(dbName: str) -> ConnectionPool:
    pool = poolStore.get(dbName)
    if (pool is None):
        pool = ConnectionPool(conninfo='',open=False)
        poolStore[dbName] = pool
    return (pool)


def get_connection(dbName: str) -> Connection:
    pool = get_connection_pool(dbName)
    pool.open()
    conn = pool.connection()
    return(conn)

def get_accounts2():
    conn: Connection = get_connection('demo_accounts')
    conn.connect('user=webadmin password=NAFacr72163 port=11107 host=chisel.cloudjiffy.net dbname=demo_accounts')
    conn.execute('set search_path to demounit1')
    cur = conn.execute('select * from "AccM"')
    records = cur.fetchall()
    return(records)

async def get_accounts1():
    async with await psycopg.AsyncConnection.connect("user=webadmin password=NAFacr72163 port=11107 host=chisel.cloudjiffy.net dbname=demo_accounts") as aconn:
        async with aconn.cursor() as acur:
            await acur.execute('set search_path to demounit1')
            await acur.execute('select * from "AccM"')
            records = await acur.fetchall()
            return (records)
    # conn:Connection = psycopg.connect("user=webadmin password=NAFacr72163 port=11107 host=chisel.cloudjiffy.net dbname=demo_accounts")
    # cur:Cursor = conn.cursor()
    # records = cur.execute('select * from "demounit1"."AccM"')
    # records1 = cur.fetchall()
    # return(records1)

    # with psycopg.connect("user=webadmin password=NAFacr72163 port=11107 host=chisel.cloudjiffy.net dbname=demo_accounts") as conn:
    #     with conn.cursor() as cur:
    #         cur.execute('select * from "demounit1"."AccM"')
    #         records = cur.fetchall()
    #         return(records)
