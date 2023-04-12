// type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
// export { type UserType }

type GraphQlQueryResultType = {
  data: {
    genericUpdate?: any
    genericQuery?: any,
    [key: string]: any
  }
}

type SqlObject = {
  tableName: string
  xData: {
    [key: string]: any
    xDetails?: SqlObject
  }
}

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

export { type GraphQlQueryResultType, SideMenuTypesEnum, type SqlObject, UserTypesEnum }
