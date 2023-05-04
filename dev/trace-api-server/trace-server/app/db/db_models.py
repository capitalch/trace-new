from app.vendors import Any


class UserClass:
    def __init__(self,
                 userType, businessUnits=None, clientCode=None, clientId=None, clientName=None, dbName=None, dbParams=None,  email=None, isClientActive=False, isUserActive=False, isExternalDb=False, lastUsedBuId=None, lastUsedBranchId=None, mobileNo=None, uid=None, userId=None, userName=None, role=None,
                 ):

        self.businessUnits = businessUnits
        self.clientCode = clientCode
        self.clientName = clientName
        self.clientId = clientId
        self.dbName = dbName
        self.dbParams = dbParams
        self.email = email
        self.isClientActive = isClientActive
        self.isUserActive = isUserActive
        self.isExternalDb = isExternalDb
        self.lastUsedBranchId = lastUsedBranchId
        self.lastUsedBuId = lastUsedBuId
        self.mobileNo = mobileNo
        self.role = role
        self.userType = userType
        self.userId = userId
        self.userName = userName
        self.uid = uid

    businessUnits: Any
    clientCode: str
    clientName: str
    clientId: int
    dbName: str
    dbParams: dict
    email: str
    isExternalDb: bool
    isUserActive: bool
    isUserActive: bool
    lastUsedBranchId: int
    lastUsedBuId: int
    mobileNo: str
    role: dict
    uid: str
    userId: int
    userName: str
    userType: str
