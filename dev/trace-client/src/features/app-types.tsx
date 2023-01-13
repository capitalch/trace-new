// type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
// export { type UserType }
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

type SideMenuHeadingsType =
  | "Super admin user"
  | "Admin user"
  | "Business user" | string & {}

export {type SideMenuHeadingsType, SideMenuTypesEnum, UserTypesEnum };
