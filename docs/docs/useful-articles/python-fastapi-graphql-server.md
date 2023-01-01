---
layout: default
title: Fastapi graphql tips
parent: Useful articles
nav_order: 3
has_children: false
---

We use `FastApi` as web application server and `GraphQl` driven by `ariadne` framework for api. Following concepts are intended to be used while creating the app server.

## 1. Using FastApi server with GraphQL

- Create python virtual environment, activate it in windows and install `fastapi` with `uvicorn` support and also install `ariadne` (GraphQL schema based implementation)
```python
> python -m venv env
> env\scripts\activate
> pip install fastapi[all] ariadne
```

- In `VS Code` using `command pellette` set the interpreter path as to the newly installed virtual environment `env`. In launch.json file for `fastapi` add for auto reload in dev environment
    ```
    "args": [
                "main:app", "--reload"
            ],
    ```
    
- Run the following `Hello world` code in `VS code` be selecting `FastApi` as type. Chect at url `localhost:8000`

    ```python
    from fastapi import FastAPI
    app = FastAPI()

    @app.get('/')
    async def root():
        return({"message": "Hello world"})
    ```

## 2. Automatic documentation
`localhost:8000/docs` provide auto documentation of your api
If you define tags in your path (i.e api end point), they will appear in the documentations as tags. The tags are for documentation purpose only.
```python
@app.get("/users/", tags=["users"])
async def read_users():
    return [{"username": "johndoe"}]
```

## 3. Fastapi routing is just like blueprints in Flask
- In the main file add line like
```
app.include_router(accounts.accounts_main.router)
```

- In a new file accounts/accounts_main.py add line like
```
from fastapi import APIRouter
router = APIRouter()
@router.get('/route')
async def resolve_route():
    return ({"message": "Hello routes"})
```

## 4. Using GraphQL with fastapi
We could not make use of router for enabling `GraphQL` in `fastapi`. The 'GraphQL' implementation is done using a new `fastapi` app and this new app is mounted in the main app. Following process was used:
- In a new folder say `graphql_app` created a file `gaphql_api.py`. Implement `graphql` in this file and mount the `graphql` app in `main.py` file
```python
from features import GraphQL, load_schema_from_path, make_executable_schema, QueryType
type_defs = load_schema_from_path('graphql_app')
query = QueryType()
@query.field('user')
def resolve_user(*_):
    return ('Sushant')
schema = make_executable_schema(type_defs, query)
graphQLApp = GraphQL(schema)
```
`main.py`
```python
from graphql_app.graphql_api import graphQLApp
app.mount('/graphql', graphQLApp)
```

## 5. Connect Postgresql with Fastapi using GraphQL
With `flask` we used `psycopg2`. But with `fastapi` we intend to use `asyncpg` which is supposed to be 3x faster. Following code is for `asyncpg`:
```python
from fastapi.encoders import jsonable_encoder # convert to json
from asyncpg import connect, create_pool

async def getAccounts():
    pool = await create_pool(user='*', password='**********', port=0, host='******', database='demo')
    conn = await pool.acquire()
    result = await conn.fetch('select * from "demounit1"."AccM"')
    await conn.close()
    await pool.close()
    data = jsonable_encoder(result)
    return(data)

@query.field('accounts')
async def get_accounts(*_):
    data = await getAccounts()
    return(data)
```

## 6. FastApi Middleware
Middlewares are used when a) You want to change the request before it is processed by an endpoint or b) You want to change response after it is returned by any end point. Sample code for a middleware is as follows:
```python
@app.middleware('http')
async def my_middleware(requext:Request, call_next):
    response = await call_next(requext)
    response.headers['X-version'] = 'V1.2.12'
    return(response)
```

## 7. Using Pydantic with fastApi
`pydantic` is useful for `type` provisions in `fastapi`. For example you can define a `pydantic` class in pur `python` and use this class as `type` in various places. `pydantic` is very useful for type casting in `fastapi` apps. Following code explains that:
```python
from typing import Union
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None
app = FastAPI()
@app.post("/items/")
async def create_item(item: Item):
    return item
```
remember to use `content-type` as `application/json`

## 8. Universal error handling
- Create a new exception class and use that class to raise custom exception from any part of the code
- Created an exception class
```python
class MyGenericException(Exception):
    def __init__(self, name):
        self.name = name
```
- Associated that exception class with `app`
```python
@app.exception_handler(MyGenericException)
async def my_generic_exception_handler(request: Request, exc: MyGenericException):
    return (JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": exc.name}))
```
- Raised the exception from code
```python
raise MyGenericException(name="This is generic exception raised")
```

## 9. Working with all types of parameters

{: .note}
There are chances that you send to server some data as one or many parameters inside query, url path, form, body and header. That may be as `query paramaters`, `url path parameters`, `html form parameters`, `some data in header` or in `html body parameters`. By using *fastapi* `Query`, `Path`, `Form`, `Header` and `Body` directives you can very easily isolate these parameters in python variables, is a single line of code and use them further.

```python
@router.get('/items/{item_id}')
async def resolve_item(item_id: str | None = Path(default=None), q:str | None = Query(default=None), x_token: str | None = Header(default=None), formParam:str|None = Form(default=None)):
    id = item_id
    return (id)
```
In above code I have not used body parameters but all other varieties are used. item_id is path parameter, q is some query parameter of kind `http://8000?q=something`, x_token is header 'X-token' and formParam is a key in url-encoded form

## 10. Dependency injection

{: .note}
Suppose you want a shared function which takes on some parameters, work upon them and returns some calculated or altered values. A use case is suppose all parameters for an endpoint, such as url parameters, path parameters, body parameters, form parameters and header parameters are to be collected and returned in JSON format; you can use dependency injection for that.

For that to achieve, write a Python function, wrap that in `Depends` directive and include it in the method for resolving the path in following manner

```python
async def params_injection(item_id: str | None = Path(default=None), q: str | None = Query(default=None), x_token: str | None = Header(default=None), formParam: str | None = Form(default=None)):
    return ({
        "itemId": item_id,
        "q": q,
        "x-token": x_token,
        "formParam": formParam
    })


@router.get('/items1/{item_id}')
async def resolve_item(inj = Depends(params_injection)):
    return (inj)
```

## 11. Token based security
