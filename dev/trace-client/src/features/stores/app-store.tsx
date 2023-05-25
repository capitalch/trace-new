import { EmptyComponent } from '@src/components'
import { _, FC, Signal, signal, } from '@src/libs'

const appStoreT: AppStoreType = {
    componentHistorySet: new Set(),
    isCloseClicked: false,
    isOpenClicked: false,

    admin: {
        businessUnits: {
            doFilter: () => { },
            doReload: () => { },
            filteredRows: signal([]),
            noOfRows: signal(100),
            rows: signal([]),
            refresh: signal(true),
            searchString: signal('')
        },
        businessUsers: {
            doFilter: () => { },
            doReload: () => { },
            filteredRows: signal([]),
            noOfRows: signal(100),
            rows: signal([]),
            refresh: signal(true),
            searchString: signal('')
        },
        bues: {
            doReload: () => { }
        }
    },

    alertDialogOk: {
        body: signal(() => <></>),
        header: signal(''),
        isOpen: signal(false),
    },

    alertDialogYesNo: {
        action: () => { },
        body: signal(() => <></>),
        header: signal(''),
        isOpen: signal(false),
        result: signal(false)
    },

    appLoader: {
        isOpen: signal(false)
    },

    content: {
        breadcrumb: signal(''),
        title: signal('')
    },

    layouts: {
        isDrawerOpen: signal(false),
        isSidebarOpen: signal(true),
        selectedComponent: signal(EmptyComponent),
        sideMenuOpenKeys: signal(['1']),
        sideMenuSelectedKeys: signal(['2']),
        sideMenuType: signal(0),
        sideMenuHeading: signal('')
    },

    login: {
        isLoggedIn: signal(false),
        uid: signal(''),
        email: signal(''),
        userType: signal(0),
        buName: signal(''),
        clientId: 0,
        clientCode: '',
        clientName: '',

        buId: 0,
        buCode: '',

        branchId: 1,
        branchCode: 'head',
        branchName: 'Head office',

        businessUnits: [],
        isClientActive: false,
        isUserActive: false,
        isExternalDb: false,
        dbName: '',
        dbParams: {},
        lastUsedBuId: 0,
        lastUsedBranchId: 0,
        userId: 0
    },

    modalDialogA: {
        body: signal(() => <></>),
        defaultData: signal(undefined),
        isOpen: signal(false),
        isCentered: false,
        size: signal('md'),
        title: signal(''),
        toShowCloseButton: signal(false),
    },

    modalDialogB: {
        body: signal(() => <></>),
        defaultData: signal(undefined),
        isOpen: signal(false),
        isCentered: false,
        size: signal('md'),
        title: signal(''),
        toShowCloseButton: signal(false),
    },

    permissions: {
        doFilter: () => { },
        doReload: () => { },
        filteredRows: signal([]),
        noOfRows: signal(100),
        rows: signal([]),
        refresh: signal(true),
        searchString: signal('')
    },

    superAdmin: {
        adminUsers: {
            doFilter: () => { },
            doReload: () => { },
            filteredRows: signal([]),
            noOfRows: signal(100),
            rows: signal([]),
            refresh: signal(true),
            searchString: signal('')
        },
        clients: {
            doFilter: () => { },
            doReload: () => { },
            filteredRows: signal([]),
            noOfRows: signal(100),
            rows: signal([]),
            refresh: signal(true),
            searchString: signal('')
        },
        dashboard: {
            doReload: () => { }
        },
        roles: {
            doFilter: () => { },
            doReload: () => { },
            filteredRows: signal([]),
            noOfRows: signal(100),
            rows: signal([]),
            refresh: signal(true),
            searchString: signal('')
        },

        securedControls: {
            doFilter: () => { },
            doReload: () => { },
            filteredRows: signal([]),
            noOfRows: signal(100),
            rows: signal([]),
            refresh: signal(true),
            searchString: signal('')
        },
    }
}

let appStore: AppStoreType = _.cloneDeep(appStoreT)

type AppStoreType = {
    componentHistorySet: Set<string>
    isCloseClicked: boolean,
    isOpenClicked: boolean,

    admin: {
        businessUnits: {
            doFilter: () => void,
            doReload: () => void,
            filteredRows: Signal<Array<any>>,
            noOfRows: Signal<number>,
            rows: Signal<Array<any>>,
            refresh: Signal<boolean>,
            searchString: Signal<string>
        },
        businessUsers: {
            doFilter: () => void,
            doReload: () => void,
            filteredRows: Signal<Array<any>>,
            noOfRows: Signal<number>,
            rows: Signal<Array<any>>,
            refresh: Signal<boolean>,
            searchString: Signal<string>
        },
        bues: {
            doReload: () => void
        }
    },

    alertDialogOk: {
        body: Signal<FC>,
        header: Signal<string>,
        isOpen: Signal<boolean>
    },

    alertDialogYesNo: {
        action: () => void,
        body: Signal<FC>,
        header: Signal<string>,
        isOpen: Signal<boolean>,
        result: Signal<boolean>
    },

    appLoader: {
        isOpen: Signal<boolean>
    },

    content: {
        title: Signal<string>,
        breadcrumb: Signal<string>
    },

    layouts: {
        isDrawerOpen: Signal<boolean>,
        isSidebarOpen: Signal<boolean>,
        selectedComponent: Signal<FC>,
        sideMenuOpenKeys: Signal<Array<string>>,
        sideMenuSelectedKeys: Signal<Array<string>>,
        sideMenuType: Signal<number>,
        sideMenuHeading: Signal<string>
    },

    login: {
        isLoggedIn: Signal<boolean>,
        uid: Signal<string>,
        email: Signal<string>,
        userType: Signal<number>,
        buName: Signal<string>,

        clientId: number,
        clientCode: string,
        clientName: string,
        buId: number,
        buCode: string,

        branchId: number,
        branchCode: string,
        branchName: string

        businessUnits: any
        isClientActive: boolean
        isUserActive: boolean
        isExternalDb: boolean
        dbName: string
        dbParams: any
        lastUsedBuId: number
        lastUsedBranchId: number
        userId: number
    },

    modalDialogA: {
        body: Signal<FC>,
        defaultData: Signal<any>,
        isOpen: Signal<boolean>,
        isCentered?: boolean,
        size: Signal<'md' | 'sm' | 'lg' | 'md'>,
        title: Signal<string>,
        toShowCloseButton: Signal<boolean>,
    },

    modalDialogB: {
        body: Signal<FC>,
        defaultData: Signal<any>,
        isOpen: Signal<boolean>,
        isCentered?: boolean,
        size: Signal<'md' | 'sm' | 'lg' | 'md'>,
        title: Signal<string>,
        toShowCloseButton: Signal<boolean>,
    },

    permissions: {
        doFilter: () => void,
        doReload: () => void,
        filteredRows: Signal<Array<any>>,
        noOfRows: Signal<number>,
        rows: Signal<Array<any>>,
        refresh: Signal<boolean>,
        searchString: Signal<string>
    },

    superAdmin: {
        adminUsers: {
            doFilter: () => void,
            doReload: () => void,
            filteredRows: Signal<Array<any>>,
            noOfRows: Signal<number>,
            rows: Signal<Array<any>>,
            refresh: Signal<boolean>,
            searchString: Signal<string>
        },
        clients: {
            doFilter: () => void,
            doReload: () => void,
            filteredRows: Signal<Array<any>>,
            noOfRows: Signal<number>,
            rows: Signal<Array<any>>,
            refresh: Signal<boolean>,
            searchString: Signal<string>
        },
        dashboard: {
            doReload: () => void
        },
        roles: {
            doFilter: () => void,
            doReload: () => void,
            filteredRows: Signal<Array<any>>,
            noOfRows: Signal<number>,
            rows: Signal<Array<any>>,
            refresh: Signal<boolean>,
            searchString: Signal<string>
        },
        securedControls: {
            doFilter: () => void,
            doReload: () => void,
            filteredRows: Signal<Array<any>>,
            noOfRows: Signal<number>,
            rows: Signal<Array<any>>,
            refresh: Signal<boolean>,
            searchString: Signal<string>
        },

    }

}

function doLogout() {
    appStore.login.isLoggedIn.value = false
    appStore = _.cloneDeep(appStoreT)
}


export { appStore, doLogout }