from app.vendors import BaseModel


class Messages():
    err_config_file = 'There is some error in config file at server'
    err_inactive_user = 'User is not active. Contact administrator'
    err_invalid_credentials = 'Token is invalid or already expired'
    err_invalid_super_admin_password = 'Super admin password is invalid'
    err_invalid_pwd = 'Invalid password'
    err_invalid_uid = 'User name or email not found'
    err_renew_access_token = 'Error in renewing access_token from refresh_token'
    err_sql_execution_failed = 'Execution of SQL command failed at server'
    err_uid_password_empty = 'User name or password cannot be empty'
    err_unknown_server_error = 'Unknown server error. Contact administrator'


# messages = Messages()
