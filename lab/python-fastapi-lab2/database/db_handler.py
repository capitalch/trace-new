from features import create_pool, jsonable_encoder

async def getAccounts():
    pool = await create_pool(user='webadmin', password='NAFacr72163', port=11107, host='chisel.cloudjiffy.net', database='demo_accounts')
    conn = await pool.acquire()
    result = await conn.fetch('select * from "demounit1"."AccM"')
    await conn.close()
    await pool.close()
    data = jsonable_encoder(result)
    return(data)

# loop = asyncio.get_event_loop()
# loop.run_until_complete(run())
