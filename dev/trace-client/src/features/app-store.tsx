// import { deepSignal } from "@deepsignal/react"
import {hookstate, State} from '@hookstate/core'
import { _, setAccesstokenInLS, setIsLoggedInInLS, setRefreshTokenInLS, } from '@src/features'

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
        selectedComponentName: 'dummyComponent',
        sideMenuOpenKeys: ['1'],
        sideMenuSelectedKeys: ['2'],
        sideMenuType: '',
        sideMenuHeading: ''
    },

    login: {
        isLoggedIn: false,
        uidEmail: '',
        userType: '',
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
    }
}

let appStore: any = hookstate(_.cloneDeep(store))

function doLogout() {
    resetAppStore()
}

function resetAppStore() {
    setAccesstokenInLS('')
    setRefreshTokenInLS('')
    setIsLoggedInInLS(false)
    
    appStore.layouts.set({...store.layouts })
    appStore.login.set({...store.login })
    appStore.content.set({...store.content })
    appStaticStore.login = { ...defaultLoginObject }
}

const defaultLoginObject = {
    clientId: 0,
    clientCode: '',
    clientName: '',
    buId: 0,
    buCode: '',
    buName: '',
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
        clientId: 0,
        clientCode: '',
        clientName: '',
        buId: 0,
        buCode: '',
        buName: '',
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
    }
}
export { appStore, appStaticStore, doLogout, resetAppStore }

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
        clientId: number,
        clientCode: string
        clientName: string
        buId: number
        buCode: string
        buName: string
        branchId: number
        branchCode: string
        branchName: string
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

type AuthStoreType = {
    admin: {
        businessUnits: {
            filteredRows: [],
            noOfRows: number,
            rows: [],
            refresh: boolean,
            searchString: string
        },
        businessUsers: {
            filteredRows: [],
            noOfRows: number,
            rows: [],
            refresh: boolean,
            searchString: string
        },
    },

    login: {
        isLoggedIn: boolean,
        uidEmail: string,
        userType: string,
    },

    permissions: {
        filteredRows: [],
        noOfRows: number,
        rows: [],
        refresh: boolean,
        searchString: string
    },

    reload: boolean

    superAdmin: {
        adminUsers: {
            filteredRows: [],
            noOfRows: number,
            rows: [],
            refresh: boolean,
            searchString: string
        },
        clients: {
            filteredRows: [],
            noOfRows: number,
            rows: [],
            refresh: boolean,
            searchString: string
        },
        roles: {
            filteredRows: [],
            noOfRows: number,
            rows: [],
            refresh: boolean,
            searchString: string
        },
        securedControls: {
            filteredRows: [],
            noOfRows: number,
            rows: [],
            refresh: boolean,
            searchString: string
        },
    }
}

type BluePrintStoreType = {
   
    alertDialogOk: {
        body: ()=>any,
        header: '',
        isOpen: false,
    },

    alertDialogYesNo: {
        action: () => { },
        body: () => any,
        header: '',
        isOpen: false,
        result: false
    },
    
    appLoader: {
        isOpen: boolean
    },

    content: {
        breadcrumb: string
    },

    layouts: {
        isDrawerOpen: boolean,
        isSidebarOpen: boolean,
        selectedComponentName: string,
        sideMenuOpenKeys: [],
        sideMenuSelectedKeys: [],
        sideMenuType: string,
        sideMenuHeading: string
    },

    modalDialogA: {
        body: () => any,
        defaultData: undefined,
        isOpen: false,
        size: 'md',
        title: '',
        toShowCloseButton: false,
    },

    modalDialogB: {
        body: () => any,
        defaultData: undefined,
        isOpen: false,
        size: 'sm',
        title: '',
        toShowCloseButton: false,
    },
}