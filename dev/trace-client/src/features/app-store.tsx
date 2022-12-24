import { deepSignal } from "@deepsignal/react"

const store:any = {
    layouts: {
        isDrawerOpen: false,
        isSidebarOpen: false,
        selectedComponent: undefined,
        sideMenuOpenKeys:['1'],
        sideMenuSelectedKeys:['2']
    },
    login:{
        isLoggedIn: false
    }
}
const appStore: any = deepSignal(store)
export { appStore }


// type StoreType = {
//     appConstants: {
//         headerHeight: string,
//         sidebarWidth: string
//     },
//     layouts: {
//         isSidebarOpen: boolean
//     }
// }
