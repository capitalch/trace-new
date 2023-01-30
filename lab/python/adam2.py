xData = {
    "clientCode": "capital",
    "clientName": "Capital Chowringhee",
    "dbName": "capital_accounts"
}
fkeyName = 'parentId'
fkeyValue = 10
tableName = 'ClientM'
fieldNamesList = list(xData.keys())
valuesList = list(xData.values())

if (fkeyName and fkeyValue):
    fieldNamesList.append(fkeyName)
    valuesList.append(fkeyValue)
fieldsCount = len(fieldNamesList)
valuesTuple = tuple(valuesList)

for idx, name in enumerate(fieldNamesList):
    fieldNamesList[idx] = f''' "{name}" '''
fieldsString = ', '.join(fieldNamesList)

placeholdersList = [''] * fieldsCount
for idx, name in enumerate(placeholdersList):
    placeholdersList[idx] = f'${idx + 1}'
placeholdersString = ', '.join(placeholdersList)

sql = f'''insert into "{tableName}"
    ({fieldsString}) values( {placeholdersString} ) returning id
    '''
print(sql, valuesTuple)
