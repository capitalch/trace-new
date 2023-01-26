from app.vendors import Depends, GraphQL, load_schema_from_path, make_executable_schema, MutationType, QueryType, jsonable_encoder
from .db_main import generic_update, generic_query

type_defs = load_schema_from_path('app/db')
query = QueryType()
mutation = MutationType()

@query.field('user')
async def resolve_user(*_):
    return ('Sushant')


@query.field('genericQuery')
async def resolve_generic_query(_, info):
    sql = 'select * from "UserM"'
    ret = await generic_query(sql=sql, sqlArgs={})
    # data = exec_sql(sql='select * from "UserM"')
    # sql = '''insert into "Test"("name") values('my test value') returning "id" '''
    # data = await exec_sql(sql='select * from "UserM"')
    # data = await exec_sql(sql=sql)
    # data = await exec_sql(sql='select * from "UserM" where uid = %(arg1)s or uid = %(arg2)s', sqlArgs= {'arg1': 'sales', 'arg2':'capitalch'})
    data1 = jsonable_encoder(ret)
    return (data1)

@mutation.field('genericUpdate')
async def resolve_generic_update(_, info):
    ret = await generic_update(sqlObject={})
    return(ret)


schema = make_executable_schema(type_defs, query, mutation)
GraphQLApp: GraphQL = GraphQL(schema)
