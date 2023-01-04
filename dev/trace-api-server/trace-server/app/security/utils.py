from datetime import datetime, timedelta
from app.vendors import Any, jwt, CryptContext
from app.config import settings

passwordContext = CryptContext(schemes=["bcrypt"], deprecated='auto')

ACCESS_TOKEN_EXPIRE_HOURS = settings.ACCESS_TOKEN_EXPIRE_HOURS
REFRESH_TOKEN_EXPIRE_WEEKS =settings.REFRESH_TOKEN_EXPIRE_WEEKS
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_SECRET_KEY = settings.ACCESS_TOKEN_SECRET_KEY
REFRESH_TOKEN_SECRET_KEY = settings.REFRESH_TOKEN_SECRET_KEY


def get_hashed_password(password: str) -> str:
    return (passwordContext.hash(password))


def verify_password(password: str, hashed_pass: str) -> bool:
    return (passwordContext.verify(password, hashed_pass))


def create_access_token(subject: dict) -> str:
    expiresDelta = datetime.utcnow() + timedelta(hours=int(ACCESS_TOKEN_EXPIRE_HOURS))
    toEncode = {
        "exp": expiresDelta, "sub": subject
    }
    encodedJwt = jwt.encode(toEncode, ACCESS_TOKEN_SECRET_KEY, ALGORITHM, )
    return (encodedJwt)

def create_refresh_token(subject: Any) -> str:
    expiresDelta = datetime.utcnow() + timedelta(weeks=int(REFRESH_TOKEN_EXPIRE_WEEKS))
    toEncode = {
        "exp": expiresDelta, "sub": subject
    }
    encodedJwt = jwt.encode(toEncode, REFRESH_TOKEN_SECRET_KEY, ALGORITHM)
    return (encodedJwt)