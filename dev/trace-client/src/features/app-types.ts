// type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
// export { type UserType }

type GraphQlQueryResultType = {
  data: {
    genericUpdate?: any
    genericQuery?: any,
    [key: string]: any
  }
}

type LoginInfoType = {
  uidEmail: string
  userType: UserTypesType
  clientId?: number
  clientCode?: string
  clientName?: string
  buId?: number
  buCode?: string
  buName?: string
  branchId?: number
  branchCode?: string
  branchName?: string
  sideMenuType: SideMenuType
  sideMenuHeading: string
}

type SqlObjectType = {
  tableName: string
  xData: {
    [key: string]: any
    xDetails?: SqlObjectType
  }
}

type UserTypesType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | ''
type SideMenuType = "superAdminMenu" | "adminMenu" | "accountsMenu" | ''

enum ComponentNamesEnum {
  appDashboard = 'appDashboard',
  AppJournals = 'appJournals',
  appLogin = 'appLogin',
  appPayments = 'appPayments',
  appSales = 'appSales',
  emptyComponent = 'emptyComponent',
  superAdminDashboard = 'superAdminDashboard',
}

enum UserTypesEnum {
  superAdmin = "SUPER_ADMIN",
  admin = "ADMIN",
  businessUser = "BUSINESS_USER",
}

enum SideMenuTypesEnum {
  superAdminMenu = "superAdminMenu",
  adminMenu = "adminMenu",
  accountsMenu = "accountsMenu",
}

export { ComponentNamesEnum, type GraphQlQueryResultType, SideMenuTypesEnum, type SideMenuType, type LoginInfoType, type SqlObjectType, UserTypesEnum, type UserTypesType }
