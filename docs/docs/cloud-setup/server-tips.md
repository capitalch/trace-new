---
layout: default
title: Server tips
parent: Cloud setup
nav_order: 5
has_children: false
---

## 1. CORS

{: .highlight}
CORS is very important to implement in _fastapi_. You _graphql_ endpoints would work well with _postman_ but they would not work with local React application served from say http://localhost:3000. I wasted lot of time debugging because CORS was not implemented in _fastapi_. Its very simple
```python
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```