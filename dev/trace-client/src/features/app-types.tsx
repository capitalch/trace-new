// type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
// export { type UserType }
enum UserTypesEnum {
    'SUPER_ADMIN',
    'ADMIN',
    'BUSINESS_USER'
}

enum SideMenuTypesEnum {
    'superAdminMenu',
    'adminMenu',
    'accountsMennu'
}
export { SideMenuTypesEnum, UserTypesEnum }