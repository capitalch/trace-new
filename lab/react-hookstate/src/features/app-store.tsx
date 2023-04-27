import { hookstate, State, useHookstate, } from "@hookstate/core"

import { FC } from "react"

const appStore: State<AppStoreType> = hookstate<AppStoreType>({
    admin: {
        businessUnit: {
            name: '',
            code: '',
            units: []
        }
    },
    layouts: {
        selectedComponent: () => <></>,
        compName: 'dummy',
        comp: () => <></>
    },
    test: 'abc',
    myFunction: () => 'ABC'
})

export { appStore }

type AppStoreType = {
    admin: {
        businessUnit: {
            name: string,
            code: string,
            units: string[]
        },
    },
    layouts: {
        selectedComponent: FC,
        compName: string
        comp: FC
    }
    test: string
    myFunction: any
}

export { type AppStoreType }