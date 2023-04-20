import { hookstate, State } from "@hookstate/core"

const appStore: State<AppStoreType> = hookstate({
    admin:{
        businessUnit: {
            name: '',
            code: ''
        }
    }
})

export {appStore}

type AppStoreType = {
    admin: {
        businessUnit: {
            name: string,
            code: string
        }
    }
}
export {type AppStoreType}