class SqlQueriesAuth:

    change_password = '''
        update "UserM" 
            set "hash" = %(hash)s 
                where id = %(id)s 
                    returning "id"
    '''

    create_database = '''
        create database "%(dbName)s"
    '''
    
    does_user_email_exist = '''
        --with "email" as (values(%(email)s))
            with "email" as (values('capitalch@gmail.com'))
        select exists(select 1
            from "UserM"
                where "userEmail" = (table "email"))
    '''

    drop_public_schema = '''
        DROP SCHEMA IF EXISTS public RESTRICT
    '''

    get_admin_businessUnits = '''
         with "clientId" as (values(%(clientId)s))
        -- with "clientId" as (values(1))
        select * from "BuM"
            where "clientId" = (table "clientId")
                order by "buCode"
    '''

    get_admin_dashboard = '''
        with "clientId" as (values(%(clientId)s))
		--with "clientId" as (values(1))
		, cte1 as (
		 	select COUNT(*) count
				from "BuM"
			 		where "clientId" = (table "clientId") and "isActive")
		, cte2 as (
			select COUNT(*) count
				from "RoleM"
					where "clientId" = (table "clientId"))
		, cte3 as (
			select COUNT(*) count
				from "UserM"
					where "clientId" = (table "clientId") and "isActive")
        select json_build_object(
                    'buesCount', (select count from cte1)
                    , 'rolesCount', (select count from cte2)
                    , 'businessUsersCount', (select count from cte3)
                ) as "jsonResult"
    '''

    get_admin_users = '''
            SELECT c."id" as "clientId", "clientName", u."id", "uid", "userName", "userEmail", "mobileNo", u."descr", u."isActive", u."timestamp"
                from "UserM" u
                    join "ClientM" c
                        on c."id" = u."clientId"
                    where "roleId" is null
        '''

    get_all_clients = '''
            select * from "ClientM" 
                order by "id" DESC limit %(noOfRows)s
        '''

    get_all_clientNames_clentIds = '''
        select "id", "clientName"
            from "ClientM" 
            order by "clientName"
    '''

    get_all_roleNames_roleIds = '''
        select "id", "roleName"
            from "RoleM" 
                where COALESCE("clientId",0) = %(clientId)s
                    or "clientId" is null
            order by "roleName"
    '''

    get_all_roles_roleIds_buCodes_buIds = '''
        --with "clientId" as (values(1))
        with "clientId" as (values(%(clientId)s))
        , cte1 as (
            select "id", "roleName"
                from "RoleM" 
                    where COALESCE("clientId",0) = (table "clientId")
                        or "clientId" is null
                order by "roleName")
        , cte2 as (
            select "id", "buCode"
                from "BuM"
                    where "clientId" = (table "clientId")
                        and "isActive"
        ) select json_build_object(
            'roles', (select json_agg(row_to_json(a)) from cte1 a)
            , 'bues', (select json_agg(row_to_json(b)) from cte2 b)
        ) as "jsonResult"
    '''

    get_business_users = '''
        --with "clientId" as (values(1))
        with "clientId" as (values(%(clientId)s))       
        SELECT   u."id", "uid", "userName", "userEmail", "mobileNo", u."descr", u."isActive", u."timestamp"
                , "roleName", r.id "roleId"
                , string_agg(b."buCode", ',' order by b."buCode") as "businessUnits"
                , (select json_agg(row_to_json(a))  from (
					select x.id, "buId", "buCode", "branchIds"
						from "UserBuX" x
							join "BuM" b
								on b.id = x."buId"
					where "userId" = u.id
				) a) "buIdsJson"
                from "UserM" u
                join "ClientM" c
                    on c."id" = u."clientId"
                join "RoleM" r
                    on r."id" = u."roleId"
                left join "UserBuX" x
                    on u."id" = x."userId"
                left join "BuM" b
                    on b."id" = x."buId"
                where u."clientId" = (table "clientId")
        group by u."id", r."roleName", r.id
        order by id DESC
    '''

    get_client = '''
            select 1 from "ClientM"
                where lower("clientCode") = %(clientCode)s
        '''

    get_database = '''
            SELECT datname FROM pg_catalog.pg_database where datname = %(datname)s
        '''

    get_roles = '''
        select * from "RoleM"
                where COALESCE("clientId",0) = %(clientId)s 
                    order by "id" DESC
        '''

    get_secured_controls = '''
            SELECT * from "SecuredControlM" ORDER by "id" DESC
        '''

    get_secured_controls_with_permissions = '''
        with "roleId" as (values (%(roleId)s))
        -- with "roleId" as (values(4))
        , cte1 as (
            select id as "securedControlId", "controlName", "controlType"
                from "SecuredControlM")
        , cte2 as (
            select id, "securedControlId", "isEnabled"
                from "RoleSecuredControlX"
                    where "roleId" = COALESCE((table "roleId"), 0)
        ) select json_build_object(
            'securedControls', (select json_agg(row_to_json(a)) from cte1 a)
            , 'permissions', (select json_agg(row_to_json(b)) from cte2 b)
        ) as "jsonResult"
    '''

    get_super_admin_control_name = '''
            select 1
                from "SecuredControlM"
            where
                lower("controlName") = %(controlName)s
        '''

    get_super_admin_control_no = '''
            select 1
                from "SecuredControlM"
            where
                "controlNo" = %(controlNo)s
        '''

    get_super_admin_dashboard = '''
        with "dbName" as (values(%(dbName)s))
        -- with "dbName" as (values('traceAuth'))
        , cte1 as(
            SELECT count(*) as count, state FROM pg_stat_activity 
                where datname = (table "dbName") and state in('active', 'idle')
                    group by state)
		, cte2 as (
			SELECT count(*) as count, "isActive"
				from "ClientM"
					group by "isActive")
		, cte3 as (
			SELECT count(*) as count 
				FROM pg_database 
					where datname not in('template0', 'template1'))
		, cte4 as (
			SELECT count(*) as count
				from "SecuredControlM")
		, cte5 as (
			SELECT count(*) as count
				from "UserM"
					where "roleId" is null)
		, cte6 as (
			SELECT count(*) as count
				from "RoleM"
					where "clientId" is null)
            select json_build_object(
                'connections',(select json_agg(row_to_json(a)) from cte1 a)
				, 'clients', (select json_agg(row_to_json(b)) from cte2 b)
				, 'dbCount', (select count from cte3)
				, 'securedControlsCount', (select count from cte4)
				, 'adminUsersCount', (select count from cte5)
				, 'adminRolesCount', (select count from cte6)
            ) as "jsonResult"

    '''

    get_super_admin_role_name = '''
            select 1
                from "RoleM"
            where "clientId" is null
                and lower("roleName") = %(roleName)s
        '''

    get_user_details = '''
            with "uidOrEmail" as (values(%(uidOrEmail)s))
            --with "uidOrEmail" as (values('cap@gmail.com'))
            , cte1 as ( -- user details
                select u.id as "userId", "uid", "userEmail", "hash", "userName"
                    , "branchIds", "lastUsedBuId", "lastUsedBranchId", u."clientId", "mobileNo", u."isActive" as "isUserActive", u."roleId"
					, c."clientCode", c."clientName", c."isActive" as "isClientActive", c."isExternalDb", c."dbName", c."dbParams"
                , CASE when ("roleId" is null) THEN 'A' ELSE 'B' END as "userType"	
                from "UserM" u
					join "ClientM" c
						on c."id" = u."clientId"
                where (("uid" = (table "uidOrEmail") or ("userEmail" = (table "uidOrEmail")))))
            , cte2 as ( -- get bu's associated with user
                select b.id as "buId", "buCode", "buName"
                    from "BuM" b
                        join "UserBuX" x
                            on b.id = x."buId"
                        join "UserM" u
                            on u."id" = x."userId"
                where b."isActive" and (("uid" = (table "uidOrEmail") or ("userEmail" = (table "uidOrEmail")))))
            , cte3 as ( -- role
                    select r.id as "roleId", r."roleName", r."clientId" 
                    from cte1 u
                        left join "RoleM" r
                            on r.id = u."roleId"
            )
            select json_build_object(
                'userDetails',(select row_to_json(a) from cte1 a)
                , 'businessUnits', (select json_agg(row_to_json(b)) from cte2 b)
                , 'role', (select row_to_json(c) from cte3 c)
            ) as "jsonResult"
        '''

    test_connection = '''
            select 1
        '''
