// type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
// export { type UserType }

enum EventTriggersEnum {
  on_success_send_mail = 'on_success_send_mail'
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
    xDetails?: SqlObjectType[]
  }
  onSuccessTriggerName?: EventTriggersEnum
  onSuccessTriggerParams?: { [key: string]: any }
  onFailureTiggerName?: EventTriggersEnum
  onFailureTriggerParams?: { [key: string]: any }
}

enum CustomMethodNamesEnum {
  change_password = "change_password"
}

type CustomMethodExecutionType = {
  customMethodName: CustomMethodNamesEnum,
  customMethodParams?: { [key: string]: any }
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

export { EventTriggersEnum, CustomMethodNamesEnum, type CustomMethodExecutionType, type GraphQlQueryResultType, SideMenuTypesEnum, type SideMenuType, type SqlObjectType, UserTypesEnum, type UserTypesType }
