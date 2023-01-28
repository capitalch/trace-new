---
layout: default
title: Server tips
parent: Cloud setup
nav_order: 5
has_children: false
---

## 1. CORS with graphql

{: .highlight}
CORS is very important to implement in _fastapi_. You _graphql_ endpoints would work well with _postman_ but they would not work with local React application served from say http://localhost:3000. I wasted lot of time debugging because CORS was not implemented in _fastapi_. Its very simple
```python
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_route('/graphql/', GraphQLApp)
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

We used _ariadne_ _graphql_ framework. You need to provide additional separate CORS setting for this framework to work from _React_ local at http://localhost:3000

```python
GraphQLApp: GraphQL = CORSMiddleware(    
    GraphQL(schema), allow_origins=['http://localhost:3000'], allow_methods=['*'], allow_headers=['*'],allow_credentials=True
)
```

**Very important**
In ```app.add_route('/graphql/', GraphQLApp)```. See the _"/graphql/"_. The trailing '/' is required for CORS to work correctly. Many hours were spent to resolve this issue. Without the trailing '/' the CORS did not work and authorization failed always.
