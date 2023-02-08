sqlObject = {
    'tableName': 'TestM',
    'deletedIds': [1, 2]
}
deletedIdList:list = sqlObject.get('deletedIds', None)
tableName = sqlObject.get('tableName')
if((deletedIdList is None) or (deletedIdList.count == 0)):
    pass # return
if(None in deletedIdList):
    raise Exception()
ret1 = ','.join(str(i) for i in deletedIdList)
ret = f'''({ret1})'''
sql = f'''delete from "{tableName}" where id in{ret}'''

print(sql)
# arr = [None]
# arr1 = [item for item in arr if item is not None]
# ret = 'select'
# if (arr1.count != 0):
#     ret = ','.join(str(i) for i in arr1)
# ret1 = f'({ret})'
# print(ret1)
