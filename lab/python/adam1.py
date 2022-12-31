import asyncpg
import asyncio

async def run():
    conn = await asyncpg.connect(user='', password='', port=1, host='chisel.cloudjiffy.net', database='demo_accounts')
    values = await conn.fetch(
        'select * from "demounit1"."AccM"'
    )
    await conn.close()

async def run1():
    async with asyncpg.create_pool(user='', password='', port=0, host='chisel.cloudjiffy.net', database='demo_accounts') as pool:
        result = await pool.fetch('select * from "demounit1"."AccM"')
        print(result)

async def run2():
    pool = await asyncpg.create_pool(user='', password='', port=0, host='chisel.cloudjiffy.net', database='demo_accounts')
    conn = await pool.acquire()
    result = await conn.fetch('select * from "demounit1"."AccM"')
    print(result)
    await conn.close()
    await pool.close()

# run()
loop = asyncio.get_event_loop()
loop.run_until_complete(run2())