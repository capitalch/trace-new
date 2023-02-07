import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
    alertDialogOk: {
        body: () => <></>,
        header: '',
        isOpen: false,
    },

    alertDialogYesNo: {
        action: () => { },
        body: () => <></>,
        header: '',
        isOpen: false,
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
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzU4ODA1NDAsInN1YiI6eyJ1c2VySWQiOjN9fQ.n345UMRxu2Q4LiBAM98C17OTBGSIBNEFIpwA_6MDy8A',
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
        filteredRows: [],
        rows: [],
        refresh: true,
        searchString: ''
    }
}

let appStore: any = deepSignal(_.cloneDeep(store))
function resetAppStore() {
    appStore.layouts.value = { ...store.layouts }
    appStore.login.value = { ...store.login }
    appStore.content.value = { ...store.content }
}

const appStaticStore: AppStaticStoreType = {
    componentHistorySet: new Set(), // A set for history of component names which have been loaded so far
    doReload: () => appStore.reload.value = !appStore.reload.value,
    isCloseClicked: false,
    isOpenClicked: false,
    superAdmin: {
        doFilter: () => { },
        // doRefresh: () => {appStore.superAdmin.refresh.value = !appStore.superAdmin.refresh.value },
        doReload: () => { },
    }
}
export { appStore, appStaticStore, resetAppStore }

interface AppStaticStoreType {
    componentHistorySet: Set<string>
    doReload: () => void,
    isCloseClicked: boolean,
    isOpenClicked: boolean,
    superAdmin: {
        doFilter: () => void,
        // doRefresh: () => void,
        doReload: () => void
    }
}
