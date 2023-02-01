class SqlQueriesAuth:
    get_all_clients = '''
        select * from "TestM"
    
    '''
    get_user_details = '''
        with "uidOrEmail" as (values(%(uidOrEmail)s))
        --with "uidOrEmail" as (values('capitalch'))
        , cte1 as ( -- user details
            select u.id as "userId", "uid", "userEmail", "hash", "userName"
                , "branchIds", "lastUsedBuId", "lastUsedBranchId", u."clientId", "mobileNo", "isActive", u."roleId", u."specialRoleId"
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
        , cte3 as ( -- role, special role and weight
                select r.id as "roleId", r."roleName", (
                    select SUM("weight")
                        from "SecuredControlM" s
                            join "RoleSecuredControlX" x
                                on s.id = x."securedControlId"
                            join "RoleM" r
                                on r.id = x."roleId"
                    where u."roleId" = r."id"
                ) as "roleWeight"
                , s.id as "specialRoleId", s."roleName" as "specialRoleName", s."descr" as "specialRoleDescr", s."weight" as "specialRoleWeight" 
                from cte1 u
                    left join "RoleM" r
                            on r.id = u."roleId"
                    left join "SpecialRoleM" s
                        on s.id = u."specialRoleId"
        )
        select json_build_object(
            'userDetails',(select row_to_json(a) from cte1 a)
            , 'businessUnits', (select json_agg(row_to_json(b)) from cte2 b)
            , 'role', (select row_to_json(c) from cte3 c)
        ) as "jsonResult"
    '''
