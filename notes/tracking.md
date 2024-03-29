## Test script for security
																					1. Authentication as superAdmin
																					2. Check dashboard
																					3. Clients CRUD
																					4. New Client with external db CRUD
																					5. Roles CRUD
																					6. Secured controls CRUD
																					7. Admin users CRUD
																					8. EMAIL fire when new admin user created or modified

																					9. Authentication as Admin
																					10. Admin dashboard
																					11. Business Units CRUD
11.1. Business unit create in server as schema
12. Admin Roles CRUD
																					13. Business USERS CRUD
																					13.1. Business users email while new/modify
																					13.2. server validate email. And also give a meaningful message for email failure
																					14. Email fire when Business user create or modify
																					15. Admin user change uid and email
																					16. Admin user change password and email

17. token storage in browser for access token and refresh token
18. create new access token from refresh token once expired
19. Check complete lifecycle of tokens

																					20. Business users change UID and email
21. Business users change password and email
22. Any user forgot pwd
23. Server side proper error handling
24. Server side proper management of imports etc.

## Logic for forgot pwd
1. Not secured url's as /forgotpwd and /pwd-activation, 
2. UI captures email, hex it and sends to /forgotpwd url as post request by axios
3. server /forgotpwd code checks and if email exists. if exists then sends /pwd-activation url + id = json token expirable within 30 min's (contains email id) as activation url to 	the client email.
4. Client click the activation url
5. /pwd-activation checks jwt, finds email, creates a new pwd, stores the hash of pwd in db and email the new pwd to client email
6. Client can now change pwd by normal way, after log in from resetted pwd.

## Logic for change UID: Secured
1. Display ModalA, defaultdata has old uid
2. Modal shows one text box to capture new UId. Old UID is shown in disabled text box
3. Submit, creates new uid at server and confirms the creation through email of user

## Logic for change password: Secured
1. Display ModalA, Three text boxes with password astrix
2. Old pwd, new pwd, verify new pwd
3. Submit runs code to set the password logic

## Testing
# Normal 24 hrs, 4 weeks 
	accessToken:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE4NDAzMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.VTWtthqySK2qYYQ7sU3hLriiV6Gx3vdNDgnESWGIyCU
	refreshToken:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQxNzMxMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.-cB660n02CVIlKMfSaVcnYVCyMTLyMe4KaYG899Y2VU
# expired 
	expired accessToken:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE3NTQxMTQsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.oU2x1K_voqRPl0HErXe-opmkvm5oGNLpo9ZLx-bq1RA
	normal refreshToken:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQxNzMxMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.-cB660n02CVIlKMfSaVcnYVCyMTLyMe4KaYG899Y2VU
# Invalid
	invalid accessToken:eylhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE4NDAzMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.VTWtthqySK2qYYQ7sU3hLriiV6Gx3vdNDgnESWGIyCU
	valid refreshToken:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQxNzMxMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.-cB660n02CVIlKMfSaVcnYVCyMTLyMe4KaYG899Y2VU
# Invalid
	invalid accessToken:eylhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE4NDAzMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.VTWtthqySK2qYYQ7sU3hLriiV6Gx3vdNDgnESWGIyCU
	invalid refreshToken:eyJhbGcmOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQxNzMxMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.-cB660n02CVIlKMfSaVcnYVCyMTLyMe4KaYG899Y2VU

## Security algorithm
1. AppLogin submit button sends uid, password in urlencoded form using axios to /login endpoint
#. Find the dynamic url for login as for graphql
2. Server validates username, password.
3. If validation OK then server returns accessToken and refreshToken
	4. Client stores accessToken at appStore and stores refreshtoken at browser's memory
	5. For every secured resource client puts bearer + accessToken in authorization header
	6. At every secured endpoint at server the accesstoken is validated. If validation fine then proceeds to serve the resource
	7. If client receives invalid accesstoken or accessToken not present then it throws login screen
	8. If client receives accesstoken expired then it retrieves refresh token from browser memory
	9. Client sends refreshToken at create accesstoken endpoint
	10. The server creates accesstoken and sends to client
	11. Client stores accesstoken at appStore
	12. Client retrieves the resource with new accesstoken
13. If login fails, error is shown to client at login screen

## Concluding Auth
1. Dashboard for admin users
2. In login component code for three buttons of Super admin admin, admin and business user login instead of fixed one
#. After login, populate clientId, clientCode etc. in appStaticStore
3. Validate all items of super admin
4. Validate all items of admin user
5. Implement email for validation purpose
6. Admin user change UID, Change Password, Show admin menu, Show accounts menu
7. Business user Change UID, Change password
8. Check and research SMS gateway

## Logic for business users
1. For new business user capture multiple buIds and on submit store it in UserBuX table
2. Multiple branches are to be captured against individual Bu
3. On Branches button click, opens a modal dialog showing all Bu's against the user. In each row there is button as "Assign branches". There is a column showing all the branches for the user and Bu
4. On click of "Assign branches" button the accounts database is queried and all branches against Bu<->Schema are displayed in a new Modal dialog
5. In new modal dialog you can select multiple branches against a user and Bu and click submit button. Data of branchIds is saved in UserBuX table
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

### Server side

## 25-05-2023
1. Change password with email to user

## 21-05-2023
1. Complete QA of Auth started
2. Fixed New client with external database
3. Fixed Super admin roles update
4. Fixed Super admin secured controls update
5. Fixed Super admin-> Admin user CRUD
6. Email when new admin user created / updated
7. Fixed isActive of business unit CRUD

## 03-05-2023 - 20-05-2023: Few hours. One week only given. Started Netwove project on 8th May
1. Completed security
																											
## 25-04-2023 - 02-05-2023
1. Conversion back from DeepSignals to Signals with Types also in picture
2. Organized the project properly
## 13-04-2023 - 24-04-2023
2. Tried out a new library HookState
3. Resorted to Original @preact/signals-react and discarded the DeepSignal
## 11-04-2023 - 13-04-2023
1. Completed user management for admin users
## 31-03-2023 - 10-04-2023
No work done

## 29-03-2023 - 30-03-2023
No work done

## 26-03-2023 - 28-03-2023
1. Business users view
2. New / edit business user -- part
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

