const AppConstants: AppConstantsType = {
    HEADER_BACKGROUND_COLOR: 'blue.600',
    HEADER_COLOR: 'white',
    HEADER_HEIGHT: '38px',
    SIDEBAR_BACKGROUND_COLOR: '#f4f0ec',
    SIDEBAR_WIDTH: '200px',
    // USER_TYPE: undefined
}
export { AppConstants }

interface AppConstantsType {
    HEADER_BACKGROUND_COLOR: string
    HEADER_COLOR: string
    HEADER_HEIGHT: string
    SIDEBAR_BACKGROUND_COLOR: string
    SIDEBAR_WIDTH: string
    // USER_TYPE: 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined
}