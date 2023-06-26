import { signal, Signal , } from '@preact/signals-react'

const appStore: AppStoreType = {
    count: signal(0),
    items: signal([]),
    refresh: signal(false),
    admin: {
        name: signal(''),
        address: signal(''),
        login: {
            details: signal([1])
        }
    }
}

type AppStoreType = {
    count: Signal<number>,
    items: Signal<any[]>,
    refresh: Signal<boolean>
    admin: {
        name: Signal<string>,
        address: Signal<string>
        login: {
            details: Signal<Array<any>>
        }
    }
}

export { appStore }