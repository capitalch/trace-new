## To do for layout


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
1. Client login submit
2. Server login endpoint returns access_token, refresh_token, userKind and roleWeight
3. Server exception handling
4. Client stores refresh_token in local store
5. Server protected endpoint mechanism
6. Server refresh token endpoint
7. Client handling of authentication errors and display
8. Server architecture setup
	a. Folder hierarchy
	b. GraphQL
	c. Logging
	d. Exception handling
	e. AsyncDB database handling
	f. Security model

### Server
1. login(username, password)-> returns access token, refresh token
	a) get password_hash_from_db for user, email from testing service; hashes password; compares password
	b) If anything wrong; raise exception
	c) otherwise create tokens and return
2. Secured function call: verifies the token. If failure then raises exception; otherwise returns user
3. Testing: Create user service which returns password_hash_from_db, email against a username

## Client
1. Login screen to hit /login
2. Any other call to api will activate the secured function call

## Tables
1. ClientM: id, clientCode, clientName, isActive, timestamp

2. BuM: id, clientId, buCode, buName, timestamp

3. RoleM: id, roleName, clientId, descr

4. UserM: id, roleId, buId, uid, userEmail, hash, isActive, parentId, descr, userName, branchIds, lastUsedBuId, lastUsedBranchId, timestamp

5. SecuredControlM: id, controlName, weight

6. RoleSecuredControlX: id, securedControlId, roleId

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

