// type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
// export { type UserType }

enum EventTriggersEnum {
  on_success_change_uid = 'on_success_change_uid'
}

type GraphQlQueryResultType = {
  data: {
    genericUpdate?: any
    genericQuery?: any,
    [key: string]: any
  }
}

// type LoginInfoType = {
//   uidEmail: string
//   userType: UserTypesType
//   clientId?: number
//   clientCode?: string
//   clientName?: string
//   buId?: number
//   buCode?: string
//   buName?: string
//   branchId?: number
//   branchCode?: string
//   branchName?: string
//   sideMenuType: SideMenuType
//   sideMenuHeading: string
// }

type SqlObjectType = {
  tableName: string
  xData: {
    [key: string]: any
    xDetails?: SqlObjectType
  }
  onSuccessTriggerName?: string
  onSuccessTriggerParams?: {}
  onFailureTiggerName?: string
  onFailureTriggerParams?: {}
}

type UserTypesType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | ''
type SideMenuType = "superAdminMenu" | "adminMenu" | "accountsMenu" | ''

enum UserTypesEnum {
  "SUPER_ADMIN",
  "ADMIN",
  "BUSINESS_USER",
}

enum SideMenuTypesEnum {
  "superAdminMenu",
  "adminMenu",
  "accountsMenu",
}

// type SideMenuHeadingsType =
//   | "Super admin user"
//   | "Admin user"
//   | "Business user" | string & {}

export { EventTriggersEnum, type GraphQlQueryResultType, SideMenuTypesEnum, type SideMenuType, type SqlObjectType, UserTypesEnum, type UserTypesType }
