from app.vendors import HTTPException, JSONResponse, status

class AppHttpException(Exception):
    def __init__(self, detail: str, statusCode: int = 500):
        self.detail = detail
        self.statusCode = statusCode
