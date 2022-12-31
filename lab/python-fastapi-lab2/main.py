from features import connect, FastAPI, GraphQL, load_schema_from_path, make_executable_schema, PLAYGROUND_HTML, QueryType
from graphql_app.graphql_api import graphQLApp
import asyncio
import asyncpg
import accounts.accounts_main

async def run():
    conn = await asyncpg.connect(user='webadmin', password='NAFacr72163', port=11107, host='chisel.cloudjiffy.net', database='capital_accounts')
    values = await conn.fetch(
        'select * from "capitalchowringhee"."TranD"'
    )
    await conn.close()
    return (values)

app = FastAPI()
app.include_router(accounts.accounts_main.router)


@app.get('/')
async def root():
    return ({"message": "Hello world1"})

@app.get('/db')
async def db():
    val = await run()
    return(val)
        

app.mount('/graphql', graphQLApp)



# loop = asyncio.get_event_loop()
# loop.run_until_complete(run())
