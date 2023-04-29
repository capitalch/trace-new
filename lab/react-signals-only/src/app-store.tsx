import { signal, Signal } from '@preact/signals-react'
import { FC } from 'react'

const appStore: AppStoreType = {
    count: signal(0),
    admin: {
        name: signal(''),
        address: signal(''),
        component: signal(() => <></>),
        login: {
            details: signal([1])
        }
    }
}

type AppStoreType = {
    count: Signal<number>,
    admin: {
        name: Signal<string>,
        address: Signal<string>
        component: Signal<FC>
        login: {
            details: Signal<Array<any>>
        }
    }
}

export { appStore }