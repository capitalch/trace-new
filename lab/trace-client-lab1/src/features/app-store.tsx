import { deepSignal } from "@deepsignal/react"

const store: any = {
    layouts: {
        isDrawerOpen: false,
        isCloseClicked: false,
        isSidebarOpen: true,
        isOpenClicked: false,
        selectedComponent: undefined,
        sideMenuOpenKeys: ['1'],
        sideMenuSelectedKeys: ['2']
    },
    login: {
        isLoggedIn: false,
        userType: undefined,
    },
    reload: false,
}

const appStore: any = deepSignal(store)
const appStaticStore: { isCloseClicked: boolean, isOpenClicked: boolean, doReload: () => void } = {
    isCloseClicked: false,
    isOpenClicked: false,
    doReload: () => appStore.reload.value = !appStore.reload.value
}
export { appStore, appStaticStore }
