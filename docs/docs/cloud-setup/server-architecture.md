---
layout: default
title: Server architecture
parent: Cloud setup
nav_order: 4
has_children: false
---

## 1. Hierarchical json bundle for server consumption

{: .highlight}
Client sends data to the server which is to be inserted in multiple tables. 
These tables are in parent child relationships nested at arbitrary levels. In order to minimize the server trips, complete data along with foreign key information and different associated table names is formatted in a particular json format and sent to server as  a bundle in one go. This json bundle has complete information of a) Associated tables where insert, update or delete operation is to take place, b) Foreign keys in hierarchy, c) Data to be inserted in tables. Server creates multiple sql statements from the json bundle and executes them against respective databases.

- ### Json bundle format
The json bundle consists of two sections, a) _details_, b) _data_. The bundle starts with _details_ section. Both the the _details_ and _data_ sections contain miscellaneous data which is named as _meta_

> **details**: {meta, [data]} that means meta and array of _data_

> **data**: {meta, [details]} that means meta and array of _details_

> _details_ section can contain _tableName_ (table name), deletedIds (an array of deleted id's), _fkeyName_ (foreign key name) and _data_ section. _data_ section can contain column names, values and _details_ section

{: .highlight}
_data_ is an object of meta and array of _details_. _details_ is an object of meta and array of _data_. The bundle starts with _details_ section

- Json sample format for master details. Python _generic_update_master_details_ method at server consumes this data format

```json
{
	tableName: 'name of table',
	deletedIds: [1,2,3...]
	data: [
		{
			col1: 'col1 value',
			col2: 'col2 value'
			details: [
				tableName: 'name of table'
				fkeyName: 'tranHeaderId',
				deletedIds: [1,2,3...]
				data: [
					...
				]
			]
		}
		...
	]
}

```
This format is like

```
{
    meta,
    data
}
```
meta is "tableName", "fkeyName"

_data_ is array of "colname", "colvalue" pairs and "details"

_details_ in turn is again an array of

```
{
    meta,
    data
}
```

- Sample data for payment voucher is

```json
[
  {
    "tableName": "TranH",
    "data": [
      {
        "tranDate": "2021-08-17",
        "userRefNo": null,
        "remarks": null,
        "tags": null,
        "jData": "{}",
        "finYearId": 2020,
        "branchId": 1,
        "posId": "1",
        "autoRefNo": null,
        "details": [
          {
            "tableName": "TranD",
            "fkeyName": "tranHeaderId",
            "data": [
              {
                "accId": 118,
                "instrNo": "",
                "amount": 5000,
                "dc": "C"
              },
              {
                "accId": 129,
                "amount": "5000.00",
                "dc": "D",
                "details": [
                  {
                    "tableName": "ExtGstTranD",
                    "fkeyName": "tranDetailsId",
                    "data": {
                      "gstin": "07AADCB2230M1ZV",
                      "hsn": "45",
                      "cgst": 267.85714285714283,
                      "sgst": 267.85714285714283,
                      "igst": 0,
                      "rate": "12.00",
                      "isInput": true
                    }
                  }
                ]
              }
            ]
          }
        ],
        "tranTypeId": "2"
      }
    ]
  }
]

```