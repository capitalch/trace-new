from app.vendors import BaseModel


class Messages(BaseModel):
    err_config_file = 'There is some error in config file at server'
    err_invalid_credentials = 'Token is invalid or already expired'
    err_renew_access_token = 'Error in renewing access_token from refresh_token'
    err_sql_execution_failed = 'Execution of SQL command failed at server'
    err_uid_password_empty = 'User name or password cannot be empty'
    err_unknown_server_error = 'Unknown server error. Contact administrator'


messages = Messages()
