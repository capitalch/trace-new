from app.vendors import Fernet, HTTPException, JSONResponse, OAuth2PasswordBearer, SqlQueriesAuth, SqlQueriesClient, status
from app import Config
import bcrypt
import logging
import random
import string
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
    return (decoded_text.decode())


def encrypt(input: str):
    key = Config.CRYPTO_KEY
    cipher_suite = Fernet(key)
    # encode converts string to bytes, decode does opposite
    encoded_text = cipher_suite.encrypt(input.encode())
    return (encoded_text.decode())


def get_logger():
    # Logging levels are Debug:10, Info: 20, Warning: 30, Error: 40, Critical: 50
    currentMonth = datetime.now().strftime("%b")
    currentYear = datetime.now().year
    logFormatStr = '%(asctime)s  %(levelname)s - %(message)s'
    logging.basicConfig(filename=f'logs/{currentMonth}-{currentYear}.log',
                        force=True, level=logging.INFO, format=logFormatStr,)
    logger = logging
    # logger.warning('logger initiated')
    return (logger)


def getPasswordHash(pwd):
    interm = pwd.encode('utf-8')
    salt = bcrypt.gensalt(rounds=12)
    pwdHash = bcrypt.hashpw(interm, salt).decode('utf-8')
    return pwdHash


def randomStringGenerator(strSize, allowedChars):
    return ''.join(random.choice(allowedChars) for x in range(strSize))


def getRandomPassword():
    rnd = f'@A1{randomStringGenerator(9, (string.ascii_letters + string.punctuation + string.digits))}b'
    # Remove all instances of ':' since clint sends credentials as 'uid:pwd'
    return(rnd.replace(':', '$'))


def getRandomUserId():
    rnd = randomStringGenerator(8, string.ascii_letters + string.digits)
    # Remove all instances of ':' since clint sends credentials as 'uid:pwd'
    return(rnd.replace(':', '$'))

def getSqlQueryObject(dbName: str):
    queryObject = SqlQueriesClient
    if(dbName == 'traceAuth'):
        queryObject = SqlQueriesAuth
    return(queryObject)
