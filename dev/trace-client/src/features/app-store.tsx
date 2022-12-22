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
    }
}
const appStore: any = deepSignal(store)


export { appStore }
