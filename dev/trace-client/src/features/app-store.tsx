// import { deepSignal } from '@features'
import { deepSignal } from "@deepsignal/react"

type StoreType = {
    appConstants: {
        headerHeight: string,
        sidebarWidth: string
    },
    layouts: {
        isSidebarOpen: boolean
    }
}

const store: StoreType = {
    appConstants: {
        headerHeight: '38px',
        sidebarWidth: '200px'
    },
    layouts: {
        isSidebarOpen: false,
    }
}

const appStore1: any = deepSignal(store)
const appStore: StoreType  = appStore1
const HEADER_HEIGHT = '38px'
const SIDEBAR_WIDTH = '200px'

export { appStore, HEADER_HEIGHT, SIDEBAR_WIDTH, type StoreType }

// interface StoreType {
//     appConstants: {
//         headerHeight: string,
//         leftSidebarWidth: string
//     },
//     layouts: {
//         leftSidebarOpen: boolean
//     }
// }