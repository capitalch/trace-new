from core_dependencies import APIRouter

router = APIRouter()

@router.get('/db', tags=['db'])
async def database():
    return {"userName":"Sushant"}