from app.vendors import APIRouter, Depends, HTTPException, status
from .deps import app_login, get_current_user
router = APIRouter()

@router.post('/login', summary='Create access and refresh tokens for user')
async def resolve_login(tokens: app_login = Depends()):
    return (tokens)
    

@router.post('/check', summary='check secured endpoint')
async def resolve_check(payload: get_current_user = Depends()):
    return payload
