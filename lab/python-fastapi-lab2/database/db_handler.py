from features import connect
import asyncpg
import asyncio

async def run():
    conn = await connect(user='webadmin', password='NAFacr72163', port=11107, host='chisel.cloudjiffy.net', database='demo_accounts')
    values = await conn.fetch(
        'set search_path to demounit1; select * from "AccM"'
    )
    await conn.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(run())
