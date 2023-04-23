import { State, hookstate } from "@src/libs";


const appStore: State<AppStoreType> = hookstate<AppStoreType>({
    content: {
        breadcrumb: ''
    },
    layouts: {
        isDrawerOpen: false,
        isSidebarOpen: true,
        // selectedComponent: () => <></>,
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

})

type AppStoreType = {
    content: {
        breadcrumb: string
    },
    layouts: {
        isDrawerOpen: boolean,
        isSidebarOpen: boolean,
        // selectedComponent: any,
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

}

export { appStore, type AppStoreType }
