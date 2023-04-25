import { hookstate, State, useHookstate,  } from "@hookstate/core"

import { FC } from "react"

const appStore: State<AppStoreType> = hookstate<AppStoreType>({
    admin: {
        businessUnit: {
            name: '',
            code: ''
        }
    },
    layouts: {
        selectedComponent: ()=><></>,
        compName: 'dummy'
    },
    test: 'abc'
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
    test: string
}

export { type AppStoreType }