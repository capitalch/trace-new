import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
    admin: {
        businessUnits: {
            filteredRows: [],
            noOfRows: 100,
            rows: [],
            refresh: true,
            searchString: ''
        },
        businessUsers: {
            filteredRows: [],
            noOfRows: 100,
            rows: [],
            refresh: true,
            searchString: ''
        },
    },

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
        // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE1NzIwNTIsInN1YiI6eyJ1c2VySWQiOjN9fQ.xFwO3gqanDoGApWTlupTd0wvr9mOBdf9QdqmojeejLk',
        uidEmail: 'capitalch',
        userType: undefined,
    },

    modalDialogA: {
        body: () => <></>,
        defaultData: undefined,
        isOpen: false,
        size: 'md',
        title: '',
        toShowCloseButton: false,
    },

    modalDialogB: {
        body: () => <></>,
        defaultData: undefined,
        isOpen: false,
        size: 'sm',
        title: '',
        toShowCloseButton: false,
    },

    reload: false,

    permissions: {
        filteredRows: [],
        noOfRows: 100,
        rows: [],
        refresh: true,
        searchString: ''
    },

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
        },
        // securedControlsWithPermissions: {

        // }
    }
}
// let appStore: any
// resetAppStore()
let appStore: any = deepSignal(_.cloneDeep(store))
function resetAppStore() {
    // appStore = deepSignal(_.cloneDeep(store))
    // appStore.reload.value = !appStore.reload.value
    appStore.layouts.value = { ...store.layouts }
    appStore.login.value = { ...store.login }
    appStore.content.value = { ...store.content }
    appStaticStore.login = { ...staticLoginObject }
    // appStore.admin.value = _.cloneDeep(store.admin)
    // appStore.superAdmin.value = _.cloneDeep(store.superAdmin)
}

const staticLoginObject = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE1NzIwNTIsInN1YiI6eyJ1c2VySWQiOjN9fQ.xFwO3gqanDoGApWTlupTd0wvr9mOBdf9QdqmojeejLk',
    clientId: 0,
    clientCode: undefined,
    clientName: undefined,
    buId: 0,
    buCode: undefined,
    buName: undefined,
    branchId: 1,
    branchCode: 'head',
    branchName: 'Head office'
}

const appStaticStore: AppStaticStoreType = {
    componentHistorySet: new Set(), // A set for history of component names which have been loaded so far
    doReload: () => appStore.reload.value = !appStore.reload.value,
    isCloseClicked: false,
    isOpenClicked: false,
    admin: {
        businessUnits: {
            doFilter: () => { },
            doReload: () => { },
        },
        businessUsers: {
            doFilter: () => { },
            doReload: () => { },
        },
        bues: {
            doReload: () => { }
        }
    },
    login: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE1NzIwNTIsInN1YiI6eyJ1c2VySWQiOjN9fQ.xFwO3gqanDoGApWTlupTd0wvr9mOBdf9QdqmojeejLk',
        clientId: 0,
        clientCode: undefined,
        clientName: undefined,
        buId: 0,
        buCode: undefined,
        buName: undefined,
        branchId: 1,
        branchCode: 'head',
        branchName: 'Head office'
    },
    permissions: {
        doFilter: () => { },
        doReload: () => { },
    },
    superAdmin: {
        adminUsers: {
            doFilter: () => { },
            doReload: () => { },
        },
        clients: {
            doFilter: () => { },
            doReload: () => { },
        },
        dashboard: {
            doReload: () => { }
        },
        roles: {
            doFilter: () => { },
            doReload: () => { }
        },
        securedControls: {
            doFilter: () => { },
            doReload: () => { }
        },

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
    admin: {
        businessUnits: {
            doFilter: () => void,
            doReload: () => void
        }
        businessUsers: {
            doFilter: () => void,
            doReload: () => void
        },
        bues: {
            doReload: () => void
        }
    },
    login: {
        accessToken: string,
        clientId: number,
        clientCode: string | undefined,
        clientName: string | undefined,
        buId: number
        buCode: string | undefined
        buName: string | undefined
        branchId: number
        branchCode: string | undefined
        branchName: string | undefined
    },
    permissions: {
        doFilter: () => void,
        doReload: () => void
    }
    superAdmin: {
        adminUsers: {
            doFilter: () => void,
            doReload: () => void
        },
        clients: {
            doFilter: () => void,
            doReload: () => void
        },
        dashboard: {
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
