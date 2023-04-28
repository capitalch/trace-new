import { FC, State, hookstate } from "@src/libs";
import { string } from "yup";


const appStore: State<AppStoreType> = hookstate<AppStoreType>({
    alertDialogOk: {
        body: () => <></>,
        header: '',
        isOpen: false,
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
        selectedComponent: () => <></>,
        selectedComponentName: 'emptyComponent',
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
        defaultData: {},
        isOpen: false,
        size: 'md',
        title: '',
        toShowCloseButton: false,
    },

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

})

type AppStoreType = {
    alertDialogOk: {
        body: FC,
        header: string,
        isOpen: boolean,
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
        selectedComponent: FC,
        selectedComponentName: string,
        sideMenuOpenKeys: Array<string>,
        sideMenuSelectedKeys: Array<string>,
        sideMenuType: string,
        sideMenuHeading: string
    },

    login: {
        isLoggedIn: boolean,
        uidEmail: string,
        userType: string,
    },

    modalDialogA: {
        body: FC,
        defaultData: any,
        isOpen: boolean,
        size: string,
        title: string,
        toShowCloseButton: boolean,
    },

    permissions: {
        filteredRows: Array<any>,
        noOfRows: number,
        rows: any[],
        refresh: boolean,
        searchString: string
    },

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

export { appStore, type AppStoreType }
