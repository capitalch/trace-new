## To do
																											Global modal, alert, snap-box message
																											1. Search box
																											2. Refresh
3. Client error handling
																											4. grid lines
																											5. Grid alternate color
																											6. Grid filters
																											7. Grid summary
																											8. Grid title
8. Id swap, show index
9. Grid edit button
10. Grid delete row
11. Grid remove row
																											11. Loading indicator
!!. Responsive hide some controls
12. In utils ShowModalA

## comparison different grids
1. react-data-grid: dynamic row height missing
2. ag grid community: Aggregation missing
3. rsuite-table react: filter is missing
4. TanStack table: Good need to check
## react-data-grid check
1. edit, delete
2. Search
3. Export
4. Grouping
5. Edit
6. Select
7. Filter
8. refresh
9. No of rows
10. Value format

## Logic for login

## login test use case


## Access control
1. Builtin user roles: Reader, Manager, Accountant
2. Super admin can alter builtin user roles or create new universal roles
3. Protected controls: Has control weight, an absolute prime number
3. Every role has a weight which is product of each individual protected control weight
	If a control is enabled then its weight is taken into account
	Reader has role weight as 0
	Manager has role weight as 1
	Accountant has role weight based on calculations
3. Logic
	Every user has a role weight. 
		If role weight is 0, that is reader, then all protected controls are disabled
		If role weight is 1, that is manager, then all protected controls are enabled
		New roles can be defined by admin. Every protected control has weight as data-weight attribute. At run time user's role weight is divided by protected control's data-weight. If remainder is 0 then the contol is enabled otherwise disabled
		At server there is 'ProtectedControlM' table was id, controlName, weight, descr. When a new protected control is created at client side then super admin does corresponding entry in this table. The CRUD of this table is available in Super Admin menu

## Authentication

### Server

## Client


## Tables
1. ClientM: id, clientCode, clientName, isActive, timestamp

2. BuM: id, clientId, buCode, buName, timestamp

3. RoleM: id, roleName, clientId, descr

4. UserM: id, roleId, buId, uid, userEmail, hash, isActive, parentId, descr, userName, branchIds, lastUsedBuId, lastUsedBranchId, timestamp

5. SecuredControlM: id, controlName, weight

6. RoleSecuredControlX: id, securedControlId, roleId

## Bug fix
### Server side
1. Sometimes database server not working. Error connection
																											2. AppHttpException of type custome exception not working
																											3. Server side graphql authentication
																											4. get_other_user_bundle error
## 03-02-2023 - 05-02-2023
1. Implemented ag-grid for Super admin Clients with filter, global search, summary, alternate color, header color, state management etc.

## 01-02-2023 - 02-02-2023
1. Server error management finalized
2. Server logging finalized
3. Compared database drivers asyncpg, psycopg and psycopg2 and finalized on asyncpg and then psycopg2

## 24-01-2023 - 31-01-2023
1. Organized code at client and server
2. Error management at server
3. GraphQL genericQuery and genericUpdate completed
4. Did detailed comparison and implementation of asyncpg and psycopg in async mode
5. GraphQL error management
6. Renamed several files at server

## 20-01-2023 - 23-01-2023
1. Add client screen
2. Server side authentication rework

## 15-01-2023 - 19-01-2023
1. Research on React useMemo, useCallback and memo, ag-grid
2. Finalized on ag-grid
3. Started work on Super admin implementation

## 10-01-2023 - 14-01-2023
1. Changes in database
2. Completed login, payload bundle in server and finalised architecture
3. Started working at client architecture
4. Research on react-data-grid, abondoning material-ui

## 06-01-2022 - 09-01-2022
1. Database strategy

## 05-01-2023
1. Modified trace-access database
2. Created endpoint renew-token in fastapi

## 04-01-2023
1. Fastapi login and protected control logic

## 03-01-2023
1. Created configuration
2. Updated documentation for security model
3. Started implementing security in server

## 01-01-2023 - 02-01-2023
1. Security with access token and refresh token created in lab
2. GraphQL checked
3. Started trace-server coding
4. Worked on documentation of Security model

# Till 31st dec 2022
1. Client react setup done and login screen created
2. Fastapi checked and obtained basic training

