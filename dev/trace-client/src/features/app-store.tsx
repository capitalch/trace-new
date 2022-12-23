import { deepSignal } from "@deepsignal/react"

// type StoreType = {
//     appConstants: {
//         headerHeight: string,
//         sidebarWidth: string
//     },
//     layouts: {
//         isSidebarOpen: boolean
//     }
// }
const store = {
    layouts: {
        isSidebarOpen: false,
        sideMenuOpenKeys:['sub1'],
        sideMenuSelectedKeys:['1']
    }
}
const appStore: any = deepSignal(store)


export { appStore }
