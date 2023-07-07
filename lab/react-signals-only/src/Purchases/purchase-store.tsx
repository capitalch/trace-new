import { signal, Signal, } from '@preact/signals-react'
import _ from 'lodash'

const PurchaseStoreT: PurchaseStoreType = {
    count: signal(0),
    main: {
        commonRemarks: signal(undefined),
        lineItems: signal([
            {
                index: 0,
                productCode: signal(''),
                hsn: signal(0),
            }
        ]),
    },
}

const purchaseStore: PurchaseStoreType = _.cloneDeep(PurchaseStoreT)

type PurchaseStoreType = {
    count: Signal<number>
    main: {
        commonRemarks: Signal<string | undefined | null>
        lineItems: Signal<LineItemType[]>
    },
}

const lineItemInstance: LineItemType = {
    index: 0,
    productCode: signal(''),
    hsn: signal(0),
}
export { lineItemInstance }

function getInstance(): LineItemType {
    return (
        {
            index: 0,
            productCode: signal(''),
            hsn: signal(0),
        }
    )
}
export { getInstance }

type LineItemType = {
    index: number
    productCode: Signal<string>
    hsn: Signal<number>
}

export type { LineItemType }

export { purchaseStore }
