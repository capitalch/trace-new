from features.vendors import Depends, OAuth2PasswordRequestForm


async def app_login(form_data):
    
    return {
        "access_token": "sss",
        "refresh_token": 'dd',
    }
