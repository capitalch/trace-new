from app.vendors import GraphQL, load_schema_from_path, make_executable_schema, MutationType, QueryType
from app import AppHttpException

type_defs = load_schema_from_path('app/graphql')
query = QueryType()


@query.field('user')
async def resolve_user(*_):
    # raise HTTPException(400,'Test exception')
    # raise AppHttpException('test')
    return ('Sushant')

schema = make_executable_schema(type_defs, query)
GraphQLApp = GraphQL(schema)


# @GraphQLApp.exception_handler(AppHttpException)
# async def app_custom_exception_handler(request: Request, exc: AppHttpException):
#     return JSONResponse(
#         status_code=exc.status_code,
#         content={
#             'detail': exc.detail
#         },
#         headers={"X-error": exc.detail}
#     )
