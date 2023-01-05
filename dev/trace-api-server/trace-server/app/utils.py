from app.vendors import HTTPException, JSONResponse, status

class AppHttpException(Exception):
    def __init__(self, message: str, statusCode: int = 500):
        self.message = message
        self.statusCode = statusCode
