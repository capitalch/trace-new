from app.vendors import BaseModel


class Messages():
    err_access_token_signature_expired = 'Access token signature is expired'
    err_access_token_signature_invalid = 'Access token signature is invalid'
    err_access_token_invalid = 'Access token is invalid'
    err_config_file = 'There is some error in config file at server'
    err_custom_method_name = 'Custom method name not provided by client'
    err_email_send_error = 'There was error in sending email. Email parameters from client are improper or missing'
    err_email_send_error_server = 'There was error in sending email from server'
    err_inactive_user = 'User is not active. Contact administrator'
    # err_invalid_access_token = 'Invalid or missing access token'
    err_invalid_credentials = 'Token is invalid or already expired'
    err_invalid_super_admin_password = 'Super admin password is invalid'
    err_invalid_pwd = 'Invalid password'
    err_invalid_uid = 'User name or email not found'
    err_invalid_user_id_or_password = 'Either user id or password provided by the client is invalid. Contact admin'
    err_none_in_deletedids = 'None keyword appears in the deletedIds of sqlObject'
    err_renew_access_token = 'Error in renewing access_token from refresh_token'
    err_query_execution = 'Error executing generic query at server'
    err_query_update = 'Error executing update query at server'
    err_sql_execution_failed = 'Execution of SQL command failed at server'
    err_uid_password_empty = 'User name or password cannot be empty'
    err_updating_password_hash = 'Error occured while updating password hash in database'
    err_unknown_server_error = 'Unknown server error. Contact administrator'


class CustomErrorCodes():
    e1001 = 'Unknown error occured at server. This error was not caught'
    e1002 = 'Invalid uid provided'
    e1003 = 'Either the access token provided was invalid or it has already expired'
    e1004 = 'Error occured while creating new access token from a refresh token'
    e1005 = 'Access token in the request is invalid. It is either not provided or has already expired'
    e1006 = 'There was error in getting super admin details from config file. Either config file is missing or there are no details of super admin user in it'
    e1007 = 'Error occured while executing generic query at server. Error method resolve_generic_query. Check server logs for more specific exception details'
    e1008 = 'Error occured while executing generic update at server. Error method was resolve_generic_update. Check server logs for more specific details of exception'
    e1009 = 'The deletedIds list in sqlObject contained None. The delete sql query with id as None fails. Check the client code which sends no value for deletedIds'
    e1010 = 'Error updating client in resolve_update_client method'
    e1011 = 'Invalid password'
    e1012 = 'User is not active'
    e1013 = 'Access token signature is expired'
    e1014 = 'Access token signature is invalid'
    e1015 = 'Access token is invalid'
    e1016 = 'Email send error. Email parameters provided by client are either invalid or missing'
    e1017 = 'Server found invalid user id or password while changing password for a user'
    e1018 = 'Error occured while changing password hash in auth database'
    e1019 = 'Custom method name was not provided by client. Check server'
    e1020 = 'Email send error to the user'


class EmailMessages():
    def email_subject_new_user(userType): return f'new {userType} with your email address'
    def email_body_new_user(userName, companyName, uid, password, userType): return f'''
        <!DOCTYPE html>
        <html>
        <head>
        <title>New {userType} Created</title>
        <style>
            body {{
            font-family: sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            }}
            
            h1 {{
            font-size: 24px;
            margin-top: 0;
            }}
            
            p {{
            margin-bottom: 10px;
            }}
            
            ul {{
            margin-left: 20px;
            }}
            
            li {{
            list-style-type: none;
            margin-bottom: 5px;
            }}
            
            b {{
            font-weight: bold;
            }}
            
            .container {{
            width: 500px;
            }}
            
            .footer {{
            text-align: center;
            padding: 20px 0;
            }}
        </style>
        </head>
        <body>
        <div class="container">
            <h1>New {userType} Created</h1>
            <p>Dear {userName},</p>
            <p>This is to inform you that a new {userType} has been created with your email address. Your uid and password are as follows:</p>
            <ul>
            <li>uid: <b>{uid}</b></li>
            <li>Password: <b>{password}</b></li>
            </ul>
            <p>Please change your uid and password to a human-readable format as soon as possible. You can login either using your email address or your uid.</p>
            <p>If you have any questions, please do not hesitate to contact us.</p>
            <p>Thank you,</p>
            <p>{companyName}</p>
        </div>
        </body>
        </html>
    '''
    email_subject_update_user = 'update of your user credentials'
    def email_body_update_user(userName, companyName): return f'''
    <!DOCTYPE html>
        <html>
        <head>
        <title>User Credentials Updated</title>
        </head>
        <body>
        <h1>User Credentials Updated</h1>
        <p>Dear {userName},</p>
        <p>This is to inform you that your user credentials have been updated. Your uid and password remain the same.</p>
        <p>Please login using your email address or your uid.</p>
        <p>If you have any questions, please do not hesitate to contact us.</p>
        <p>Thank you,</p>
        <p>{companyName}</p>
        </body>
        </html>
    '''
