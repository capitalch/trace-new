class UserClass:
    def __init__(self, userType, clientId=None, email=None, mobileNo=None, uid=None, userId=None, userName=None,):
        self.userType = userType
        self.userId = userId
        self.clientId = clientId
        self.mobileNo = mobileNo
        self.userName = userName
        self.uid = uid
        self.email = email
    clientId: int
    email: str
    mobileNo: str
    uid: str
    userId: int
    userName: str
    userType: str
