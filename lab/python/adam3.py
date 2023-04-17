from datetime import datetime, timedelta
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidSignatureError, InvalidTokenError

ACCESS_TOKEN_EXPIRE_HOURS = 10
ACCESS_TOKEN_EXPIRE_SECONDS = 5
ACCESS_TOKEN_SECRET_KEY = '2ef5ec0b2fa7ed02aa8daaa0c08e788ac190334ea408f41009331729025f6a0a'
ALGORITHM = "HS256"


def create_access_token(subject: dict, isInSeconds=False):
    if (isInSeconds):
        expiresDelta = datetime.utcnow() + timedelta(seconds=int(ACCESS_TOKEN_EXPIRE_SECONDS))
    else:
        expiresDelta = datetime.utcnow() + timedelta(hours=int(ACCESS_TOKEN_EXPIRE_HOURS))
    toEncode = {
        "exp": expiresDelta, "sub": subject
    }
    encodedJwt = jwt.encode(toEncode, ACCESS_TOKEN_SECRET_KEY, ALGORITHM, )
    return (encodedJwt)


def decode_token(token: str):
    try:
        res = jwt.decode(token, ACCESS_TOKEN_SECRET_KEY,
                         algorithms=[ALGORITHM])
        return (res)
    except ExpiredSignatureError as e:
        print(e)
    except InvalidSignatureError as e:
        print(e)
    except InvalidTokenError as e:
        print(e)
    except Exception as e:
        print(e)


# create jwt
accessToken = create_access_token({'name': 'sushant'})
decoded = decode_token(accessToken)

# make jwt invalid
accessToken = f'${accessToken}x'
decoded = decode_token(accessToken)

accessToken = 'hjhjhk.jkkj.jjjj'
decoded = decode_token(accessToken)

accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9k.eyJleHAiOjE2ODE2NTY2MzQsInN1YiI6eyJuYW1lIjoic3VzaGFudCJ9fQ.f29GRqxPA-G5CT0NLkaMxfeECK8-kaAm6CYBPXteVG8'
decoded = decode_token(accessToken)

# create short lived jwt
shortLivedToken = create_access_token({'name': 'any'}, isInSeconds=True)
decoded = decode_token(shortLivedToken)

print('completed')
# check jwt expiry
