import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
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
