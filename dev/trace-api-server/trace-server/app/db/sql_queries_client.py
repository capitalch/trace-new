class SqlQueriesClient:
    
    get_all_branches = '''
        select id, "branchName", "branchCode"
            from "BranchM"
        order by "branchCode"
    '''
    test_connection = '''
        select 1
    '''