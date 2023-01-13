const AppConstants: AppConstantsType = {
    ADMIN_USER: 'Admin user',
    BUSINESS_USER: 'Business user',
    HEADER_BACKGROUND_COLOR: 'blue.600',
    HEADER_COLOR: 'white',
    HEADER_HEIGHT: '38px',
    SIDEBAR_BACKGROUND_COLOR: '#f4f0ec',
    SIDEBAR_WIDTH: '200px',
    SUPER_ADMIN_USER: 'Super admin user'
    // USER_TYPE: undefined
}
export { AppConstants }

interface AppConstantsType {
    ADMIN_USER: string
    BUSINESS_USER: string
    HEADER_BACKGROUND_COLOR: string
    HEADER_COLOR: string
    HEADER_HEIGHT: string
    SIDEBAR_BACKGROUND_COLOR: string
    SIDEBAR_WIDTH: string
    SUPER_ADMIN_USER: string
    // USER_TYPE: 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
}