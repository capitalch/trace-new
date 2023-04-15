import { appStore, axios, qs, SideMenuTypesEnum, useDeepSignal, UserTypesEnum, AppConstants, appStaticStore, getHostUrl, urlJoin, Messages, useEffect } from '@src/features'
function useAppLogin() {
    const meta: any = useDeepSignal({
        serverError: '',
    })

    async function doLogin(data: any) {
        meta.serverError.value = ''
        const hostUrl = getHostUrl()
        const loginUrl = urlJoin(hostUrl, 'login')
        try {
            const ret = await axios({
                method: 'post',
                url: loginUrl,
                data: qs.stringify({
                    username: data.username,
                    password: data.password
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            appStore.login.isLoggedIn.value = true
            const accessToken = ret.data.accessToken
            appStaticStore.login.accessToken = accessToken
            const refreshToken = ret.data.refreshToken
            const payload: PayloadType = ret.data.payload
            setLoggedInuser(payload)
            console.log(ret)
        } catch (e: any) {
            meta.serverError.value = Messages.errInvalidUidPwd
            console.log(e)
        }
    }

    function handleOnSubmit(data: any) {
        doLogin(data)
        // appStore.login.isLoggedIn.value = true
        // const ret = axios({
        //     method: 'post',
        //     url: 'http://localhost:8000/login',
        //     data: qs.stringify({
        //         username: data.username,
        //         password: data.password
        //     }),
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     }
        // }).then((r: any) => {
        //     console.log(r.data.accessToken)
        //     console.log(r.data.refreshToken)
        // }).catch((e: any) => {
        //     console.log(e)
        // })
        // console.log(ret)
    }

    function setLoggedInuser(payload: PayloadType) {
        if (payload.userType === 'S') {
            appStore.login.userType.value = UserTypesEnum.SUPER_ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.SUPER_ADMIN_USER
            appStore.login.uidEmail.value = payload.email
        } else if(payload.userType === 'A'){
            appStore.login.userType.value = UserTypesEnum.ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.adminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.ADMIN_USER
            appStore.login.uidEmail.value = payload.email
            appStaticStore.login.clientId = payload.clientId || 0
        } else {
            appStore.login.userType.value = UserTypesEnum.BUSINESS_USER
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.BUSINESS_USER
            appStore.login.uidEmail.value = payload.email
        }
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

type PayloadType = {
    clientId?: number | undefined
    userType: string
    uid?: string
    email: string
    mobileNo: string
    userName: string
    userId?: number
    businessUnits?: any[]
    role?: string
}