from psycopg import AsyncConnection, connect, Connection, Cursor
from psycopg_pool import AsyncConnectionPool, ConnectionPool

poolStore = {}
sql ='''
with cte1 as(--business user
            select u."id", "uid", "parentId", c."id" as "clientId", "clientCode", "clientName", 
                "lastUsedBuCode", "lastUsedBranchId",
                array_agg("entityName") as "entityNames"                
				, (select array_agg(row_to_json(pb)) from 
					(select "buCode", "permissions"
						from "ClientEntityRole" r
							join "ClientEntityRoleBuUserX" x1
								on r."id" = x1."clientEntityRoleId"
							join "ClientEntityBu" c
								on c.id = x1."clientEntityBuId"
						where u.id = x1."userId"
                        order by "buCode"
					) pb
				) as "buCodesWithPermissions" 
                    from "TraceUser" u
                        join "ClientEntityX" x
                            on x."userId" = u."parentId"
                        join "TraceEntity" e
                            on e."id" = x."entityId"
                        join "TraceClient" c
                            on c."id" = x."clientId"
                        where ("uid" = 'sales' or "userEmail" = 'capitalch@gmail.com')
                                and u."isActive" = true
                                    and c."isActive" = true
                group by u."id", c."id")
				select * from cte1
'''


# def get_connection_pool(connInfo: str, db_name: str):  # -> ConnectionPool:
#     pool = poolStore.get(db_name)
#     if (pool is None):
#         pool = ConnectionPool(conninfo=connInfo, open=True)
#         poolStore[db_name] = pool
#     return (pool)


async def get_connection_pool_async(connInfo: str, db_name: str):
    pool = poolStore.get(db_name)
    if (pool is None):
        pool = AsyncConnectionPool(connInfo, open=True)
        poolStore[db_name] = pool
    return(pool)


# def get_psycopg_data():
#     connInfo = 'user= password=port=11107 host= dbname='
#     pool = get_connection_pool(connInfo, 'capital_accounts')
#     records = None
#     with pool.connection() as conn:
#         conn.execute('set search_path to capitalchowringhee')
#         cur = conn.execute(
#             'select * from "TranD"')
#         records = cur.fetchall()
#     return (records)


async def get_psycopg_data_async():
    connInfo = "user=web password=NA port=11 host=ch dbname=tr"
    apool: AsyncConnectionPool = await get_connection_pool_async(connInfo, 'tr')
    records = None
    async with apool.connection() as aconn:
        async with aconn.cursor() as acur:
            # await acur.execute('set search_path to capitalchowringhee')
            # await acur.execute('select * from "TranD"')
            await acur.execute(sql)
            records = await acur.fetchall()
    return(records)
