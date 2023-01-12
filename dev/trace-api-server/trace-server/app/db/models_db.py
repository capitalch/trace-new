from app.vendors import Any


class UserClass:
    def __init__(self, userType, clientId=None, email=None, mobileNo=None, uid=None, userId=None, userName=None, role=None, businessUnits=None):
        self.userType = userType
        self.userId = userId
        self.clientId = clientId
        self.mobileNo = mobileNo
        self.userName = userName
        self.uid = uid
        self.email = email
        self.role = role
        self.businessUnits = businessUnits
    clientId: int
    email: str
    mobileNo: str
    uid: str
    userId: int
    userName: str
    userType: str

    role: dict
    businessUnits: Any
