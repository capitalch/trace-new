from features import Request, APIRouter, BaseModel, Body, Form, HTTPException, status, Path, Query, Header, Depends
from generic_classes import MyGenericException
router = APIRouter()


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@router.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons


@router.get("/users")
async def read_users(commons: dict = Depends(common_parameters)):
    return commons


class Item(BaseModel):
    text: str
    me: str


@router.post('/items')
def post_items(text: str = Form()):
    # req = request
    data = text
    raise MyGenericException(name="This is generic exception raised")
    # raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='No find', headers={"X-error":"Some error happened"})
    # x = await req.json()
    return (data)


async def params_injection(item_id: str | None = Path(default=None), q: str | None = Query(default=None), x_token: str | None = Header(default=None), formParam: str | None = Form(default=None)):
    return ({
        "itemId": item_id,
        "q": q,
        "x-token": x_token,
        "formParam": formParam
    })


@router.get('/items1/{item_id}')
async def resolve_item(inj = Depends(params_injection)):
    return (inj)
