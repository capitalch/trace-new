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
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzcyMzA5ODQsInN1YiI6eyJ1c2VySWQiOjN9fQ.BuM4xXKyDbVOYb_ajPvEM8RluQldKx4_b1RcjQPp-Eo',
        uidEmail: 'capitalch',
        userType: undefined,
    },

    modalDialogA: {
        body: () => <></>,
        defaultData: undefined,
        isOpen: false,
        title: '',
        toShowCloseButton: false,
    },

    reload: false,

    superAdmin: {
        adminUsers: {
            filteredRows: [],
            noOfRows: 100,
            rows: [],
            refresh: true,
            searchString: ''
        },
        clients: {
            filteredRows: [],
            noOfRows: 100,
            rows: [],
            refresh: true,
            searchString: ''
        },
        roles: {
            filteredRows: [],
            noOfRows: 100,
            rows: [],
            refresh: true,
            searchString: ''
        },
        securedControls: {
            filteredRows: [],
            noOfRows: 100,
            rows: [],
            refresh: true,
            searchString: ''
        }
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
        clients: {
            doFilter: () => { },
            doReload: () => { },
        },
        roles: {
            doFilter: () => { },
            doReload: () => { }
        },
        securedControls: {
            doFilter: () => { },
            doReload: () => { }
        }
        // doFilter: () => { },
        // doReload: () => { },
    }
}
export { appStore, appStaticStore, resetAppStore }

interface AppStaticStoreType {
    componentHistorySet: Set<string>
    doReload: () => void,
    isCloseClicked: boolean,
    isOpenClicked: boolean,
    superAdmin: {
        clients: {
            doFilter: () => void,
            doReload: () => void
        },
        roles: {
            doFilter: () => void,
            doReload: () => void
        },
        securedControls: {
            doFilter: () => void,
            doReload: () => void
        },
    },
    [key: string]: any
}
