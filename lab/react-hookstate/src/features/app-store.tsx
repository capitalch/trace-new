import { hookstate, State, useHookstate,  } from "@hookstate/core"
import { DummyComponent, emptyComponent } from "../components/dummy-component"
import { FC } from "react"

const appStore = hookstate({
    admin: {
        businessUnit: {
            name: '',
            code: ''
        }
    },
    layouts: {
        selectedComponent: ()=><></>,
        compName: 'dummy'
    }
})

export { appStore }

type AppStoreType = {
    admin: {
        businessUnit: {
            name: string,
            code: string
        },
    },
    layouts: {
        selectedComponent: any,
        compName: string
    }
}

export { type AppStoreType }