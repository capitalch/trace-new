class Sqls:
    get_user_details = '''
        select id as "userId", "uid", "userEmail", "hash", "userName", "branchIds", "lastUsedBuId", "lastUsedBranchId", "clientId", "mobileNo", "isActive", "parentId"
        from "UserM" u
            where (("uid" = %(uidOrEmail)s) or ("userEmail" = %(uidOrEmail)s))
    '''
