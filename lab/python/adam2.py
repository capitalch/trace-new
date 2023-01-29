xData = {
    "clientCode": "capital",
    "clientName":"Capital Chowringhee",
    "dbName":"capital_accounts"
}
fkeyName = 'parentId'
fkeyValue = 10
tableName = 'ClientM'
fieldNamesList = list(xData.keys())

if (fkeyName and fkeyValue):
    fieldNamesList.append(fkeyName)
fieldsCount = len(fieldNamesList)

for idx, name in enumerate(fieldNamesList):
    fieldNamesList[idx] = f''' "{name}" ''' 
fieldsString =  ','.join(fieldNamesList)

valuesList = list(xData.values())

if fkeyName and fkeyValue:
    valuesList.append(str(fkeyValue))
for idx, name in enumerate(valuesList):
    valuesList[idx] = f''' "{name}" '''
valuesString = ','.join(valuesList)
    
sql = f'''insert into "{tableName}"
    ({fieldsString}) values({valuesString}) returning id
    '''
print(sql)