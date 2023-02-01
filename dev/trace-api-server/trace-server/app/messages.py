from app.vendors import BaseModel


class Messages():
    err_config_file = 'There is some error in config file at server'
    err_inactive_user = 'User is not active. Contact administrator'
    err_invalid_access_token = 'Invalid or missing access token'
    err_invalid_credentials = 'Token is invalid or already expired'
    err_invalid_super_admin_password = 'Super admin password is invalid'
    err_invalid_pwd = 'Invalid password'
    err_invalid_uid = 'User name or email not found'
    err_renew_access_token = 'Error in renewing access_token from refresh_token'
    err_query_execution = 'Error executing generic query at server'
    err_query_update = 'Error executing query update at server'
    err_sql_execution_failed = 'Execution of SQL command failed at server'
    err_uid_password_empty = 'User name or password cannot be empty'
    err_unknown_server_error = 'Unknown server error. Contact administrator'

class CustomErrorCodes():
    e1001 = 'Unknown error occured at server. This error was not caught'
    e1002 = 'Invalid uid provided'
    e1003 = 'Either the access token provided was invalid or it has already expired'
    e1004 = 'Error occured while creating new access token from a refresh token'
    e1005 = 'Access token in the request is invalid. It is either not provided or has already expired'
    e1006 = 'There was error in getting super admin details from config file. Either config file is missing or there are no details of super admin user in it'
    e1007 = 'Error occured while executing generic query at server. Error occured in method resolve_generic_query'
    e1008 = 'Error occured while executing generic update at server. Error occured in method resolve_generic_update'
# messages = Messages()
