import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
    // appModalIsOpen:true,
    layouts: {
        isDrawerOpen: false,
        isSidebarOpen: true,
        selectedComponent: undefined,
        sideMenuOpenKeys: ['1'],
        sideMenuSelectedKeys: ['2'],
        sideMenuType: '',
        sideMenuHeading: ''
    },
    login: {
        isLoggedIn: false,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQ5ODAyODQsInN1YiI6eyJ1c2VySWQiOjMsImNsaWVudElkIjoxfX0.yEbZwPI5QILS6MAEHNQx6tlYtwrY0OXG7e758WeDCKc',
        uidEmail: 'capitalch',
        userType: undefined,
    },
    content: {
        breadcrumb: ''
    },
    reload: false,
}

let appStore: any = deepSignal(_.cloneDeep(store))
function resetAppStore() {
    appStore.layouts.value = { ...store.layouts }
    appStore.login.value = { ...store.login }
    appStore.content.value = { ...store.content }
}

const appStaticStore: AppStaticStoreType = {
    isCloseClicked: false,
    isOpenClicked: false,
    doReload: () => appStore.reload.value = !appStore.reload.value
}
export { appStore, appStaticStore, resetAppStore }

interface AppStaticStoreType {
    doReload: () => void,
    isCloseClicked: boolean,
    isOpenClicked: boolean,
}
