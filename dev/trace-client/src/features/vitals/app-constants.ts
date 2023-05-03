const AppConstants: AppConstantsType = {
    ADMIN_USER: 'Admin user',
    // ADMIN_USER_TITLE: 'Admin user administration',
    BUSINESS_USER: 'Business user',
    COMPONENT_TOOLBAR_HEIGHT: '38px',
    HEADER_BACKGROUND_COLOR: 'blue.600',
    HEADER_COLOR: 'white',
    HEADER_HEIGHT: '38px',
    SIDEBAR_BACKGROUND_COLOR: '#FCFCFC', //#f4f0ec
    SIDEBAR_WIDTH: '200px',
    SUPER_ADMIN_USER: 'Super admin user',
    SUPER_ADMIN_USER_TITLE: 'Super admin user administration',
    // USER_TYPE: undefined
    IBUKI_MESSAGE_APP_MODAL_A_OPEN: 'IBUKI_MESSAGE_APP_MODAL_A_OPEN',
    IBUKI_MESSAGE_APP_MODAL_A_CLOSE: 'IBUKI_MESSAGE_APP_MODAL_A_CLOSE'
}
export { AppConstants }

interface AppConstantsType {
    ADMIN_USER: string
    // ADMIN_USER_TITLE: string
    BUSINESS_USER: string
    COMPONENT_TOOLBAR_HEIGHT: string
    HEADER_BACKGROUND_COLOR: string
    HEADER_COLOR: string
    HEADER_HEIGHT: string
    SIDEBAR_BACKGROUND_COLOR: string
    SIDEBAR_WIDTH: string
    SUPER_ADMIN_USER: string
    SUPER_ADMIN_USER_TITLE:string,
    // USER_TYPE: 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER' | undefined

    IBUKI_MESSAGE_APP_MODAL_A_OPEN: string
    IBUKI_MESSAGE_APP_MODAL_A_CLOSE: string
}