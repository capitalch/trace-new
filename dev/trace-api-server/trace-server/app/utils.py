from app.vendors import HTTPException, JSONResponse, OAuth2PasswordBearer, status


class AppHttpException(Exception):
    def __init__(self, detail: str, error_code: str = 'unknown', status_code: int = 500):
        self.detail = detail
        self.status_code = status_code
        self.error_code = error_code
    detail: str
    statusCode: str
    errorCode: str


# def get_reusable_oauth():
#     return (OAuth2PasswordBearer(
#         tokenUrl="/login",
#         scheme_name="JWT"
#     ))
