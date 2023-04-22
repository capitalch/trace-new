import { appStore, axios, qs, SideMenuTypesEnum, UserTypesEnum, AppConstants, appStaticStore, getHostUrl, urlJoin, Messages, setAccesstokenInLS, setRefreshTokenInLS, setIsLoggedInInLS, LoginInfoType, UserTypesType, SideMenuType, useHookstate } from '@src/features'

function useAppLogin() {
    const store: any = useHookstate(appStore)
    const meta: any = useHookstate({
        serverError: '',
    })

    async function doLogin(data: any) {
        meta.serverError.set('')
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
            const accessToken = ret.data.accessToken            
            // 
            const refreshToken = ret.data.refreshToken
           
            if (accessToken && refreshToken) {
                store.login.isLoggedIn.set(true)
                setIsLoggedInInLS(true)
                setAccesstokenInLS(accessToken)
                setRefreshTokenInLS(refreshToken)
                const payload: PayloadType = ret.data.payload
                setLoggedInUser(payload)
            }

            console.log(ret)
        } catch (e: any) {
            meta.serverError.set(Messages.errInvalidUidPwd)
            console.log(e)
        }
    }

    function handleOnSubmit(data: any) {
        doLogin(data)
    }

    function setLoggedInUser(payload: PayloadType) {
        const loginInfo: LoginInfoType = {
            uidEmail: payload.email,
            userType: '',
            clientId: payload.clientId || 0,
            clientCode: payload.clientCode,
            clientName: payload.clientName,
            sideMenuHeading: '',
            sideMenuType: ''
        }
        if (payload.userType === 'S') {
            // const s:string = UserTypesEnum.SUPER_ADMIN
            store.login.userType.set(UserTypesEnum.SUPER_ADMIN)
            store.layouts.sideMenuType.set(SideMenuTypesEnum.superAdminMenu)
            store.layouts.sideMenuHeading.set(AppConstants.SUPER_ADMIN_USER)
            store.login.uidEmail.set(payload.email)

            // loginInfo.userType = 'SUPER_ADMIN'
            // loginInfo.sideMenuType = 'superAdminMenu'
            // loginInfo.sideMenuHeading = AppConstants.SUPER_ADMIN_USER

        } else if (payload.userType === 'A') {
            // appStore.login.userType.value = UserTypesEnum.ADMIN
            // appStore.layouts.sideMenuType.value = SideMenuTypesEnum.adminMenu
            // appStore.layouts.sideMenuHeading.value = AppConstants.ADMIN_USER
            // appStore.login.uidEmail.value = payload.email
            // appStaticStore.login.clientId = payload.clientId || 0

            // loginInfo.userType = 'ADMIN'
            // loginInfo.sideMenuType = 'adminMenu'
            // loginInfo.sideMenuHeading = AppConstants.ADMIN_USER
        } else {
            // appStore.login.userType.value = UserTypesEnum.BUSINESS_USER
            // appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu
            // appStore.layouts.sideMenuHeading.value = AppConstants.BUSINESS_USER
            // appStore.login.uidEmail.value = payload.email
            // appStaticStore.login.clientId = payload.clientId || 0

            // loginInfo.userType = 'BUSINESS_USER'
            // loginInfo.sideMenuType = 'accountsMenu'
            // loginInfo.sideMenuHeading = AppConstants.BUSINESS_USER
        }
    }

    function handleTestSubmit(userType: string) {
        store.login.isLoggedIn.set(true)
        // setIsLoggedInInLS(true)
        if (userType === 'superAdmin') {
            appStore.login.userType.set(UserTypesEnum.SUPER_ADMIN)
            appStore.layouts.sideMenuType.set(SideMenuTypesEnum.superAdminMenu)
            appStore.layouts.sideMenuHeading.set(AppConstants.SUPER_ADMIN_USER)
        } else if (userType === 'admin') {
            appStore.login.userType.set(UserTypesEnum.ADMIN)
            appStore.layouts.sideMenuType.set(SideMenuTypesEnum.adminMenu)
            appStore.layouts.sideMenuHeading.set(AppConstants.ADMIN_USER)

            appStaticStore.login.clientId = 1
            appStaticStore.login.clientCode = 'capital'
            appStaticStore.login.clientName = 'Capital group'
        } else {
            appStore.login.userType.set(UserTypesEnum.BUSINESS_USER)
            appStore.layouts.sideMenuType.set(SideMenuTypesEnum.accountsMenu)
            appStore.layouts.sideMenuHeading.set(AppConstants.BUSINESS_USER)
        }
    }

    return ({ handleOnSubmit, handleTestSubmit, })
}
export { useAppLogin }

type PayloadType = {
    clientId?: number | undefined
    clientCode?: string | undefined
    clientName?: string | undefined
    userType: string
    uid?: string
    email: string
    mobileNo: string
    userName: string
    userId?: number
    businessUnits?: any[]
    role?: string
}