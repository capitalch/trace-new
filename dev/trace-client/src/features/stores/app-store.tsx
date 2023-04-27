import { FC, State, hookstate } from "@src/libs";
import { string } from "yup";


const appStore: State<AppStoreType> = hookstate<AppStoreType>({
    alertDialogOk: {
        body: () => <></>,
        header: '',
        isOpen: false,
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

})

type AppStoreType = {
    alertDialogOk: {
        body: FC,
        header: string,
        isOpen: boolean,
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

}

export { appStore, type AppStoreType }
