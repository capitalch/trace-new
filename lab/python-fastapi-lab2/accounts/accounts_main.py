from features import APIRouter
from fastapi import APIRouter
router = APIRouter()
@router.get('/route')
async def resolve_route():
    return ({"message": "Hello routes"})