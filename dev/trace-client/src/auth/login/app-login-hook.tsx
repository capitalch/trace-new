import { appStore, SideMenuTypesEnum, useDeepSignal, UserTypesEnum, AppConstants, appStaticStore } from '@src/features'
function useAppLogin() {
    const meta: any = useDeepSignal({
        serverError: '',
    })

    function handleOnSubmit(data: any) {
        appStore.login.isLoggedIn.value = true
    }

    function handleTestSubmit(userType: string) {
        appStore.login.isLoggedIn.value = true
        if (userType === 'superAdmin') {
            appStore.login.userType.value = UserTypesEnum.SUPER_ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.SUPER_ADMIN_USER
        } else if (userType === 'admin') {
            appStore.login.userType.value = UserTypesEnum.ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.adminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.ADMIN_USER

            appStaticStore.login.clientId = 1
            appStaticStore.login.clientCode = 'capital'
            appStaticStore.login.clientName = 'Capital group'
        } else {
            appStore.login.userType.value = UserTypesEnum.BUSINESS_USER
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.BUSINESS_USER
        }
    }

    return ({ handleOnSubmit, handleTestSubmit, meta })
}
export { useAppLogin }