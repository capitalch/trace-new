from app.vendors import HTTPException, JSONResponse, status

class AppHttpException(Exception):
    def __init__(self, detail: str, error_code: str='unknown', status_code: int = 500):
        self.detail = detail
        self.status_code = status_code
        self.error_code = error_code
