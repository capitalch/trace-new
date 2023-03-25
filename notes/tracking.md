## Logic for permissions
1. Get array from securedControls. Map it to an object with SecuredControlId and {controlName, controlType}
2. Get all rows from X against the roleId
3. for all rows in 2 merge the isEnabled in 1
4. convert 1 to an array
5. use 4 for consumption in ag-grid
6. in onSubmit, use id of X for update or insert
7. Provide start as Reader, Manager buttons
																											1. Validations

																											4. Submit button disabled
																											5. Astrix for required field
## To do
																											Global modal, alert, snap-box message
																											1. Search box
																											2. Refresh
																											4. grid lines
																											5. Grid alternate color
																											6. Grid filters
																											7. Grid summary
																											8. Grid title
																											8. Id swap, show index
																											11. Loading indicator
																											12. In utils ShowModalA
																											11. Remove row
																											17. Remove  eddit delete and remove icons from bottom row
																											18. No of rows
																											9. Edit
																											10. Delete
																											
																											13. Client error handling
																											14. Server error handling
																											15. Server update script
																											16. Server delete functionality
																											
																											12. Edit external database
																											13. Password treatement for ext database
																											13. New form for external database
																			
																											16. No of rows for grid																																						
																											!!. Responsive hide some controls
																											16. Transfer table names to ClientM


																											19. Show proper fields in Clients grid
																											20. In the modal window show 'Test database connection' button
																											15. Column filters implement
																											21. Implement test database connection functionality

																											14. Server script for database create
																											15. dbParams entry in DB encrypted
																											16. Server separate route
																											18. Generalize toolbar
																											10. Unique client validation from server
																											11. Optimized no of connections
																											12. Organized different function of GraphQL under useAppGraphQL()
																											13. In created database remove schema public
14. ag-grid filter for boolean
																											15. Exec_sql update implementation
																											15. Test database connection disable button and show waiting
																											1. Edit
																											2. New
3. Permissions
## Logic for Super admin
1. Global roles: Reader(0), Manager(1), Accountant(2). Grid entry with add roles. These three roles cannot be deleted. others can be deleted
2. Client change names: Protected controls -> Secured controls, Global roles -> special roles
3. Screen for secured control: ControlNo, Name, type(menu / button). Remove weight
4. Admin users screen: roleId, branchIds, lastUsedBranchId and lastUsdBuId is null. isAdmin is true
	Random password created and its hash stored in db
	Password mail is sent use when updated or inserted user
	User can login with password and als can change passord from login screen
	Clicking on link in email will validate the user and activate it
	validateUser url create at server outside of graphql
5. Select icons at client end

## Dashboard functionality
1. No of connections
2. No of clients ( Active / Inactive)
3. Clients with databases grid. Shows unused databases etc.
4. Help for Different steps guiding the user for entire Super Admin

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
### Client side
1. Logout does not clear the appStore data. 
	Reproduce:
	logout as admin
	login as super admin
	still the roles of admin are visible
### Server side
																											1. Sometimes database server not working. Error connection
																											2. AppHttpException of type custom exception not working
																											3. Server side graphql authentication

																											4. get_other_user_bundle error


## 08-03-2023 - 25-03-2023
OFF

## 06-03-2023 - 07-03-2023
1. Admin menu
2. Admin business unit

## 24-02-2023 - 05-03-2023
1. Completed main portions of Super admin
## 22-02-2023 - 23-02-2023
1. Working on Roles
2. Edit, view and New implemented

## 11-02-2023 - 21-02-2023
1. Clients completed
2. server sql helper with CRUD completed
3. Research on db drivers and finalized on psycopg async
4. Left menu for Super admin and its icons finalized

## 10-02-2023
1. New client and new client with ext database

## 06-02-2023 - 09-02-2023
1. Implemented Insert, Update, Delete, Remove in Ag-grid

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

