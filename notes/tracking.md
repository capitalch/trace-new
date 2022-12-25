## To do for layout
1. Breadcrumb in content
2. Header login / logout mechanism
3. If isSuperAdmin then show superadmin menu in sidebar and superadmin dashboard
4. If isAdmin then show admin menu in sidebar and admin dashboard
5. if isUser then show normal user menu in sidebar and user dashboard
6. Logout mechanism
7. Modal dialog

## Login mechanism
if logged in
	Show logout icon with name of logged in user
	Show drop down log out in header
		Drop down menu
		if super admin
			Show super admin menu in sidebar
			Change uid
			Change pwd
			Logout
		else if admin
			Admin menu
			Accounts menu
			Change uid
			Change pwd
			Logout
		else
			Show accounts menu in sidebar
			change uid
			change pwd
			Logout
else
	show nil in sidebar
	show clean header
	show login UI