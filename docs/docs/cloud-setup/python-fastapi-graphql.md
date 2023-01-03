---
layout: default
title: Fastapi graphql server
parent: Cloud setup
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

But the above exception handling process does not catch the unknown type of exceptions such as `division by 0`. To take care of any sort of exception use `middleware` like this in the `main.py`:
```python
@app.middleware("http")
async def exception_handling(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        return JSONResponse(status_code=500, content="some unknown error")
```

The above will catch any sort of unspecified error universally, happening anywhere in the codebase, in any file, at any execution stage. Only keep this middleware before anything else in `main.py`

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

## 11. JWT Token based security in fastapi

{: .note}
`fastapi` provides two dependencies for security. These two dependencies are mainly for the purpose of auto documentation provided by `fastapi`. That is by using `/docs` as documentation you can use security model in the `fastapi` based apps.
a) `OAuth2PasswordRequestForm`: This expects user name and password in `html form url encoded` with strict spelling of `username` and `password` respectively and outputs `username` and `password`.
b) `OAuth2PasswordBearer`: This has arguments `tokenUrl` and `scheme_name`. `tokenUrl` is relative url which expects username, password and outputs token. `scheme_name` is 'JWT' in most cases.

### Flow for login, tokens and authentication

- In login screen user clicks submit button. `username` and `password` are form fields with `urlencoded` which submits to `login` endpoint

- `login` endpoint validates the `username` and compares the hash of `password` from database. If validation fails then `HTTPException` is raised by server; otherwise `access_token` and `refresh_token` is returned. The `access_token` is short lived and `refresh_token` is long lived. The `refresh_token` is used to create a new `access_token` when that expires.

- For every *secured / protected* resource the client embeds `Autorization` header with value `Bearer access_token` in the request. At server endpoint say `check` the `access_token` is validated and user info is retrieved from `access_token`. For successful validations the user info is sent back to client; otherwise `token expired` or `invalid access token` errors are thrown by serevr as `HTTPException`. When client sees `token expired` exception, it retrieves `refresh_token` from its store and hits the `refresh` endpoint of server.

- The `refresh` endpoint at server validates the `refresh_token` and gets user related informationfrom the `refresh_token`. It then creates a new short lived`access_token` from the information obtained from `refresh_token` and sends it back to client.

- The client now uses the new `access_token` to communicate with protected resources.


### Implementation of security model in `fastapi`
a) endpoint `/login`:
Inputs username and password and outputs access_token and refresh_token. The refresh_token is used to create new access_token when expired, without doing a fresh login.
```python
@app.post('/login', summary='Create access and refresh tokens for user')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users.get(form_data.username, None)
    if (user is None):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect uid or password')

    hashed_pass = user.get('hash', None)
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    return {
        "access_token": create_access_token(user.get('email')),
        "refresh_token": create_refresh_token(user.get('email')),
    }
```

b) A secured endpoint `/check`: For any endpoint you want to secure, use the dependency `get_current_user` as below:

```python
reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)

async def get_current_user(token:str = Depends(reuseable_oauth)):
    try:
        payload = jwt.decode(token, JWT_REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        return(payload)
    
    except(ValidationError, Exception):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
```

```python
@app.post('/check', summary='Check secured endpoint')
async def resolve_check(payload: Any = Depends(get_current_user)):
    try:
        return (payload)

    except (ValidationError, Exception):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
```

c) Refresh endpoint `/refresh`: Used to create a new access_token from the refresh_token and expired access_token.

```python
@app.post('/refresh', summary='Issue access token from refresh token')
async def resolve_refresh(payload: Any = Depends(get_current_user)):
    try:
        access_token = create_access_token(payload.get('sub'))
        return ({
            "access_token": access_token
        })

    except (ValidationError, Exception):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
```

## 12. For creation of random secret key

{: .note}
> In command prompt
openssl rand -hex 32

## 13. Configuration in fastapi
Create a `config.py` file

```python
from app.vendors import BaseModel
class Settings(BaseModel):
    authentication: dict = {
        "super_admin": {
            "uid": "superAdmin",
            "email":"capitalch@gmail.com",
            "hash": ""
        },
        "jwt": {
            "ACCESS_TOKEN_SECRET": "",
            "algorithm": "HS256",
            "ACCESS_TOKEN_EXPIRE_HOURS": "",
            "REFRESH_TOKEN_SECRET": "",
            "REFRESH_TOKEN_EXPIRE_WEEKS":"4"
        }
    },
    db_connection: dict = {
        "user": "webadmin",
        "password": "",
        "host": "",
        "port": "",
        "database": ""
    }


settings = Settings()
```

Now import settings in different files and use it.
