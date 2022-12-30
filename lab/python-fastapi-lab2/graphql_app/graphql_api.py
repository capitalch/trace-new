from features import FastAPI, GraphQL, load_schema_from_path, make_executable_schema, PLAYGROUND_HTML, QueryType

# graphQLApp = FastAPI()
type_defs = load_schema_from_path('graphql_app')
query = QueryType()


@query.field('user')
def resolve_user(*_):
    return ('Sushant')


schema = make_executable_schema(type_defs, query)
graphQLApp = GraphQL(schema)
