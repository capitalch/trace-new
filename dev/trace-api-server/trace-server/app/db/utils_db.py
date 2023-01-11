class UserClass:
    def __init__(self, clientId, mobileNo, userId, uid, userName, userType, email):
        self.userId = userId
        self.clientId = clientId
        self.userMobileNo = mobileNo
        self.userName = userName
        self.uid = uid
        self.userType = userType
        self.email = email
    clientId: int
    mobileNo: str
    userId: int
    userName: str
    userType: str
    email: str
