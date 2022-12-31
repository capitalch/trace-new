---
layout: default
title: Fastapi graphql tips
parent: Useful articles
nav_order: 3
has_children: false
---

We use `FastApi` as web application server and `GraphQl` driven by `ariadne` framework for api.

## Tutorial for Python FastApi server with GraphQL

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

## Automatic documentation
`localhost:8000/docs` provide auto documentation of your api

## Fastapi routing is just like blueprints in Flask
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

## Using GraphQL with fastapi
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