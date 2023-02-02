from app.vendors import HTTPException, JSONResponse, OAuth2PasswordBearer, status
import logging
from datetime import datetime

class AppHttpException(Exception):
    def __init__(self, detail: str, error_code: str = 'unknown', status_code: int = 500):
        self.detail = detail
        self.statusCode = status_code
        self.errorCode = error_code
    detail: str
    statusCode: str
    errorCode: str

def get_logger():
    # Logging levels are Debug:10, Info: 20, Warning: 30, Error: 40, Critical: 50
    currentMonth = datetime.now().strftime("%b")
    currentYear = datetime.now().year
    logFormatStr = '%(asctime)s  %(levelname)s - %(message)s'
    logging.basicConfig(filename=f'logs/{currentMonth}-{currentYear}.log', force=True, level=logging.INFO,format=logFormatStr,)
    logger = logging
    # logger.warning('logger initiated')
    return(logger)
