from app.vendors import Fernet, HTTPException, JSONResponse, OAuth2PasswordBearer, status
from app import Config
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


def decrypt(input: str):
    key = Config.CRYPTO_KEY
    cipher_suite = Fernet(key)
    decoded_text = cipher_suite.decrypt(input.encode())
    return(decoded_text.decode())

def encrypt(input: str):
    key = Config.CRYPTO_KEY
    cipher_suite = Fernet(key)
    encoded_text = cipher_suite.encrypt(input.encode()) # encode converts string to bytes, decode does opposite
    return(encoded_text.decode())


def get_logger():
    # Logging levels are Debug:10, Info: 20, Warning: 30, Error: 40, Critical: 50
    currentMonth = datetime.now().strftime("%b")
    currentYear = datetime.now().year
    logFormatStr = '%(asctime)s  %(levelname)s - %(message)s'
    logging.basicConfig(filename=f'logs/{currentMonth}-{currentYear}.log', force=True, level=logging.INFO,format=logFormatStr,)
    logger = logging
    # logger.warning('logger initiated')
    return(logger)
