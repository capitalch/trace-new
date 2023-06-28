import { signal, Signal, } from '@preact/signals-react'
import _ from 'lodash'

const appStoreT: AppStoreType = {
    cnt: 0,
    count: signal(0),
    items: signal([]),
    refresh: signal(false),
    admin: {
        name: signal(''),
        address: signal(''),
        login: {
            details: signal([1])
        }
    },
    main: {
        items: signal([]),
    }
}

const appStore = _.cloneDeep(appStoreT)

type AppStoreType = {
    cnt: number,
    count: Signal<number>,
    items: Signal<any[]>,
    refresh: Signal<boolean>
    admin: {
        name: Signal<string>,
        address: Signal<string>
        login: {
            details: Signal<Array<any>>
        }
    },
    main: {
        items: Signal<ItemType[]>
    }
}

type ItemType = {
    productCode: string,
    productName: string,
}

const itemInstance: ItemType = {
    productCode:'',
    productName:'',
}
export {itemInstance}

export { appStore }