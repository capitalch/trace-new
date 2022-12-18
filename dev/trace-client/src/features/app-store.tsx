// import { deepSignal } from '@features'
import { deepSignal } from "@deepsignal/react"

type StoreType = {
    appConstants: {
        headerHeight: string,
        leftSidebarWidth: string
    },
    layouts: {
        leftSidebarOpen: boolean
    }
}

const store:StoreType = {
    appConstants: {
        headerHeight: '38px',
        leftSidebarWidth: '200px'
    },
    layouts: {
        leftSidebarOpen: false,
    }
}

const appStore: any = deepSignal(store)
const HEADER_HEIGHT = '38px'
const LEFT_SIDEBAR_WIDTH = '200px'

export { appStore, HEADER_HEIGHT, LEFT_SIDEBAR_WIDTH }

// interface StoreType {
//     appConstants: {
//         headerHeight: string,
//         leftSidebarWidth: string
//     },
//     layouts: {
//         leftSidebarOpen: boolean
//     }
// }