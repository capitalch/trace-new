xData = {
    'id':1,
    'name':'Sushant',
    'address':'12 JL',
    'phone':'555543454'
}
tableName = 'ClientM'
def getUpdateKeyValuesString(dataCopy):
    dataCopy.pop('id')
    lst = []
    for item in dataCopy:
        lst.append(f'''{item} = %s''')
    keyValueStr = ', '.join(lst)
    valuesTuple = tuple(dataCopy.values())
    return(keyValueStr, valuesTuple)

keyValueStr, valuesTuple = getUpdateKeyValuesString(xData.copy())
sql = f'''update "{tableName}" set {keyValueStr}
    where id = {xData['id']} returning "{"id"}"
'''
print(sql)
