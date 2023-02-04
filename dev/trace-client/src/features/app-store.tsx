import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
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
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzU1NDAwNTQsInN1YiI6eyJ1c2VySWQiOjN9fQ.hO0SqhpjDPDZxoBxRte9jrmvn00BzFhVDhYTxsqxK3U',
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

    superAdmin: {
        rowData: [],
        filteredRowData: []
    }
}

let appStore: any = deepSignal(_.cloneDeep(store))
function resetAppStore() {
    appStore.layouts.value = { ...store.layouts }
    appStore.login.value = { ...store.login }
    appStore.content.value = { ...store.content }
}

const appStaticStore: AppStaticStoreType = {
    doReload: () => appStore.reload.value = !appStore.reload.value,
    isCloseClicked: false,
    isOpenClicked: false,
    superAdmin: {
        refresh: () => { }
    }
}
export { appStore, appStaticStore, resetAppStore }

interface AppStaticStoreType {
    doReload: () => void,
    isCloseClicked: boolean,
    isOpenClicked: boolean,
    superAdmin: {
        refresh: () => void
    }
}
