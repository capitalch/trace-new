class Sqls:
    get_user_details= '''
        select id,"uid", "userEmail", "hash", "userName", "branchIds", "lastUsedBuId", "lastUsedBranchId", "clientId", "mobileNo"
        from "UserM" u
        where u."isActive"
            and (("uid" = 'capitalch') or ("userEmail" = 'capitalch@gmail.com'))
    '''