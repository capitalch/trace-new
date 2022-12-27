import { deepSignal } from "@deepsignal/react"
import { AppConstants } from "./app-constants"

const store: any = {
    layouts: {
        isDrawerOpen: false,
        isSidebarOpen: true,
        selectedComponent: undefined,
        sideMenuOpenKeys: ['1'],
        sideMenuSelectedKeys: ['2'],
        sideMenuType:'',
    },
    login: {
        isLoggedIn: false,
        uidEmail: 'capitalch',
        userType: undefined,
    },
    reload: false,
}

const appStore: any = deepSignal(store)
const appStaticStore: AppStaticStoreType = {
    isCloseClicked: false,
    isOpenClicked: false,
    doReload: () => appStore.reload.value = !appStore.reload.value
}
export { appStore, appStaticStore }

interface AppStaticStoreType {
    doReload: () => void,
    isCloseClicked: boolean,
    isOpenClicked: boolean,
}
