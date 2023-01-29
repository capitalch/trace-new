import { deepSignal } from "@deepsignal/react"
import { _, } from '@src/features'

const store: any = {
    // appModalIsOpen:true,
    alertOk: {
        isOpen: false,
        header: '',
        body: ()=><></>,
    },
    alertYesNo: {
        isOpen: false,
        header: '',
        body: undefined,
        result: false
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
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzUwNjcyMzIsInN1YiI6eyJ1c2VySWQiOjN9fQ._-y7cIfURxk5PrR5_s4HEW9sJFQK14MtZnpDet8Ibp4',
        uidEmail: 'capitalch',
        userType: undefined,
    },
    content: {
        breadcrumb: ''
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
