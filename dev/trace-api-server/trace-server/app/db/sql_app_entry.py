class Sqls:
    get_user_details= '''
        select id as "userId", "uid", "userEmail", "hash", "userName", "branchIds", "lastUsedBuId", "lastUsedBranchId", "clientId", "mobileNo", "isActive"
        from "UserM" u
            where (("uid" = 'capitalch') or ("userEmail" = 'capitalch@gmail.com'))
    '''