class SqlQueriesAuth:
    
    create_database = '''
        create database "%(dbName)s"
    '''
    
    drop_public_schema = '''
        DROP SCHEMA IF EXISTS public RESTRICT
    '''

    get_all_clients = '''
        select * from "ClientM" 
            order by "id" DESC limit %(noOfRows)s
    '''
    get_client = '''
        select 1 from "ClientM"
            where lower("clientCode") = %(clientCode)s
    '''
    get_database = '''
        SELECT datname FROM pg_catalog.pg_database where datname = %(datname)s
    '''
    
    get_secured_controls = '''
        SELECT * from "SecuredControlM" ORDER by "id" DESC
    '''
    
    get_super_admin_roles = '''
        select * from "RoleM"
            where "clientId" is null order by "id" DESC
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
    
    get_super_admin_role_name = '''
        select 1
            from "RoleM"
        where "clientId" is null
            and lower("roleName") = %(roleName)s
    '''
    
    get_user_details = '''
        with "uidOrEmail" as (values(%(uidOrEmail)s))
        --with "uidOrEmail" as (values('capitalch'))
        , cte1 as ( -- user details
            select u.id as "userId", "uid", "userEmail", "hash", "userName"
                , "branchIds", "lastUsedBuId", "lastUsedBranchId", u."clientId", "mobileNo", "isActive", u."roleId"
            , CASE when "isAdmin" THEN 'A' ELSE 'B' END as "userType"	
            from "UserM" u
            where (("uid" = (table "uidOrEmail") or ("userEmail" = (table "uidOrEmail")))))
        , cte2 as ( -- get bu's associated with user
            select b.id as "buId", "buCode", "buName"
                from "BuM" b
                    join "UserBuX" x
                        on b.id = x."buId"
                    join "UserM" u
                        on u."id" = x."userId"
            where b."isActive" and (("uid" = 'capitalch' or ("userEmail" = 'capitalch'))))	
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
    
