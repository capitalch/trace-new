import { appStore, SideMenuTypesEnum, UserTypesEnum, AppConstants, getHostUrl, Messages, setAccesstokenInLS, setRefreshTokenInLS, setIsLoggedInInLS, useDialogs, UserTypesType, SideMenuType } from '@src/features'
import { axios, qs, urlJoin, useSignal } from '@src/libs'
import { AppForgotPassword } from './app-forgot-password'

function useAppLogin() {
    const { showModalDialogA } = useDialogs()
    const meta: any = {
        serverError: useSignal(''),
    }

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
            const accessToken = ret.data.accessToken
            // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE3NTQxMTQsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.oU2x1K_voqRPl0HErXe-opmkvm5oGNLpo9ZLx-bq1RA'
            // 
            const refreshToken = ret.data.refreshToken
            // 'eyJhbGcmOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQxNzMxMTMsInN1YiI6eyJ1c2VySWQiOm51bGx9fQ.-cB660n02CVIlKMfSaVcnYVCyMTLyMe4KaYG899Y2VU'
            // 
            if (accessToken && refreshToken) {
                appStore.login.isLoggedIn.value = true
                setIsLoggedInInLS(true)
                setAccesstokenInLS(accessToken)
                setRefreshTokenInLS(refreshToken)
                const payload: PayloadType = ret.data.payload
                setLoggedInUser(payload)
            }
            // appStaticStore.login.accessToken = accessToken

            // console.log(ret)
        } catch (e: any) {
            meta.serverError.value = Messages.errInvalidUidPwd
            console.log(e)
        }
    }

    function handleOnSubmit(data: any) {
        doLogin(data)
    }

    function setLoggedInUser(payload: PayloadType) {

        if (payload.userType === 'S') {
            // const s:string = UserTypesEnum.SUPER_ADMIN
            appStore.content.title.value = AppConstants.SUPER_ADMIN_USER_TITLE
            appStore.login.userType.value = UserTypesEnum.SUPER_ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.SUPER_ADMIN_USER
            appStore.login.email.value = payload.email

        } else if (payload.userType === 'A') {
            appStore.content.title.value = `${appStore.login.buName.value} accounts`
            appStore.login.userType.value = UserTypesEnum.ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu // By default default menu will be shown. It can be changed to admin menu
            appStore.layouts.sideMenuHeading.value = AppConstants.ADMIN_USER
            setCommonFields(payload)
        } else {
            appStore.content.title.value = `${appStore.login.buName.value} accounts`
            appStore.login.userType.value = UserTypesEnum.BUSINESS_USER
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.BUSINESS_USER
            setCommonFields(payload)
        }
    }

    function setCommonFields(payload: PayloadType) {
        appStore.login.email.value = payload.email
        appStore.login.uid.value = payload.uid
        appStore.login.clientId = payload.clientId || 0
        appStore.login.userId = payload.userId || 0

        appStore.login.businessUnits = payload.businessUnits
        appStore.login.clientCode = payload.clientCode || ''
        appStore.login.clientName = payload.clientName || ''
        appStore.login.dbName = payload.dbName || ''
        appStore.login.dbParams = payload.dbParams
        appStore.login.isClientActive = payload.isClientActive || false
        appStore.login.isUserActive = payload.isUserActive || false
        appStore.login.lastUsedBuId = payload.lastUsedBuId || 0
        appStore.login.lastUsedBranchId = payload.lastUsedBranchId || 0
    }

    function handleForgotPassword() {
        showModalDialogA({
            isCentered: true,
            size: 'md',
            title: 'Forgot Password',
            body: () => <AppForgotPassword />,
        })
    }

    function handleTestSubmit(userType: string) {
        appStore.login.isLoggedIn.value = true
        // setIsLoggedInInLS(true)
        if (userType === 'superAdmin') {
            appStore.login.userType.value = UserTypesEnum.SUPER_ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.SUPER_ADMIN_USER
        } else if (userType === 'admin') {
            appStore.login.userType.value = UserTypesEnum.ADMIN
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.adminMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.ADMIN_USER

            // appStaticStore.login.clientId = 1
            // appStaticStore.login.clientCode = 'capital'
            // appStaticStore.login.clientName = 'Capital group'
        } else {
            appStore.login.userType.value = UserTypesEnum.BUSINESS_USER
            appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu
            appStore.layouts.sideMenuHeading.value = AppConstants.BUSINESS_USER
        }
    }

    return ({ handleForgotPassword, handleOnSubmit, handleTestSubmit, meta })
}
export { useAppLogin }

type PayloadType = {
    businessUnits?: any[]
    clientId?: number | undefined
    clientCode?: string
    clientName?: string
    dbName?: string
    dbParams?: any
    email: string
    isClientActive?: boolean
    isExternalDb?: boolean
    isUserActive?: boolean
    lastUsedBuId?: number
    lastUsedBranchId?: number
    mobileNo: string
    role?: string
    userName: string
    userType: string
    uid: string
    userId?: number
}