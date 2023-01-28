from app.vendors import Depends, FastAPI, JSONResponse, Request
from app.db.db_routes import GraphQLApp
from fastapi.middleware.cors import CORSMiddleware
                                                                                                
app=FastAPI()
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # expose_headers=["*"]
)
# app = GraphQLApp
app.add_route('/graphql/', GraphQLApp)

@app.post("/api")
async def home(request: Request):
    print(request.headers)
    return {"message": 'abcd'}

@app.middleware('http')
async def handle_middleware(request:Request, call_next):
    print(request.headers)
    return await call_next(request)

# from app.vendors import Depends, GraphQL, load_schema_from_path, make_executable_schema, MutationType, QueryType, Request, jsonable_encoder
# from app.db.db_main import generic_update, generic_query
# from app.authorization import auth_main
# from fastapi.middleware.cors import CORSMiddleware

# type_defs = load_schema_from_path('app/db')
# query = QueryType()
# mutation = MutationType()


# @query.field('user')
# async def resolve_user(*_):
#     return ('Sushant')


# @query.field('genericQuery')
# async def resolve_generic_query(_, info):
#     sql = 'select * from "UserM"'
#     ret = await generic_query(sql=sql, sqlArgs={})
#     data1 = jsonable_encoder(ret)
#     return (data1)


# @mutation.field('genericUpdate')
# async def resolve_generic_update(_, info, value):
#     # await auth_main.validate_token(request)
#     ret = await generic_update(sqlObject={})
#     return (ret)


# schema = make_executable_schema(type_defs, query, mutation)

# app: GraphQL = CORSMiddleware(    
#     GraphQL(schema), allow_origins=['http://localhost:3000'], allow_methods=['*'], allow_headers=['*'],allow_credentials=True
# )
# # app:GraphQL = GraphQL(schema)
