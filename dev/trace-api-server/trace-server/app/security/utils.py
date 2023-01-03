from app.vendors import Depends, OAuth2PasswordRequestForm


async def app_login(form_data: OAuth2PasswordRequestForm = Depends()):
    
    return {
        "access_token": "sss",
        "refresh_token": 'dd',
    }
