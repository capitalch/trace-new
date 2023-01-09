from features import jsonable_encoder
from asyncpg import create_pool

async def getAccounts():
    pool = await create_pool(user='web', password='NA', port=11, host='chisel', database='demo')
    conn = await pool.acquire()
    result = await conn.fetch('select * from "demounit1"."AccM"')
    await conn.close()
    await pool.close()
    data = jsonable_encoder(result)
    return(data)

# loop = asyncio.get_event_loop()
# loop.run_until_complete(run())
