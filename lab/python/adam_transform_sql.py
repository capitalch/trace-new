def transform_to_native_sql(sql:str, params:dict):
    cnt = 0
    paramsTuple = ()

    def getNewParamName():
        nonlocal cnt
        cnt = cnt + 1
        return(f'${cnt}')
        
    for prop in params:
        sprop = f'%({prop})s'
        sql = sql.replace(sprop,getNewParamName())
        paramsTuple = paramsTuple + (params[prop],)
    
    return(sql, paramsTuple)

sql = 'select * from "UserM" where uid = %(arg1)s or uid = %(arg2)s'
params = {
    'arg1': 'sales',
    'arg2':'capitalch'
}

sql1, paramsTuple = transform_to_native_sql(sql,params)

print(sql1, paramsTuple)