import { appStore, SideMenuTypesEnum, useDeepSignal, UserTypesEnum } from '@src/features'
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
            appStore.laouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu
        } else if (userType === 'admin') {
            appStore.login.userType.value = UserTypesEnum.ADMIN
            appStore.laouts.sideMenuType.value = SideMenuTypesEnum.adminMenu
        } else {
            appStore.login.userType.value = UserTypesEnum.BUSINESS_USER
            appStore.laouts.sideMenuType.value = SideMenuTypesEnum.accountsMennu
        }
    }

    return ({ handleOnSubmit, handleTestSubmit, meta })
}
export { useAppLogin }