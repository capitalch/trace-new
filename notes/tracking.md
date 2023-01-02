## To do for layout


## Access control
1. Builtin user roles: Reader, Manager, Accountant
2. Super admin can alter builtin user roles
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

## Check in FastAPI
1. Middleware
2. AsyncPG
3. socket-io
