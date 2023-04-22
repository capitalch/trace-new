import { hookstate, State } from "@hookstate/core"
import { DummyComponent } from "../components/dummy-component"

const appStore: AppStoreType = hookstate({
    admin:{
        businessUnit: {
            name: '',
            code: ''
        }
    },
    layouts: {
        selectedComponent: DummyComponent,
        compName: 'dummy'
    }
})

export {appStore}

type AppStoreType = {
    admin: {
        businessUnit: {
            name: string,
            code: string
        },
    },
}
export {type AppStoreType}