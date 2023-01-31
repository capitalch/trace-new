import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
    // appModalIsOpen:true,

    alertDialogOk: {
        isOpen: false,
        header: '',
        body: () => <></>,
    },

    alertDialogYesNo: {
        isOpen: false,
        header: '',
        body: () => <></>,
        result: false
    },

    appLoader: {
        isOpen: false
    },

    content: {
        breadcrumb: ''
    },

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
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzUxODcyMDEsInN1YiI6eyJ1c2VySWQiOjN9fQ.CGClkKTji8w79D6gNynaxOW9Vkh5qjCqpaZxEjeGoT8',
        uidEmail: 'capitalch',
        userType: undefined,
    },

    modalDialogA: {
        body: () => <></>,
        isOpen: false,
        title: '',
        toShowCloseButton: false,
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
