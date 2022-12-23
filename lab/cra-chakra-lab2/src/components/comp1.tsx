import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'

function Comp1() {
    let index = 1
    const componentsMap = []
    // let keyedItems = []
    useEffect(() => {
        // injectKey(menuItems)
        const keyedItems = getMenuItems(menuItems)
        console.log(keyedItems)
    }, [])
    return (<Box p={2}>Comp1</Box>)

    function getMenuItems(items: any[]) {
        const keyedMenuItems = items.map((it: any) => {
            it.key = String(incr())
            if (it.component) {
                componentsMap.push({ key: it.key, component: it.component })
            } else if (it.children && (it.children.length > 0)) {
                it.children = getMenuItems(it.children)
            }
            return (it)
        })
        return keyedMenuItems
    }

    function injectKey(items: any[]) {
        for (const it of items) {
            it.key = String(incr())
            if (it.component) {
                componentsMap.push({ key: it.key, component: it.component })
            } else if (it.children && (it.children.length > 0)) {
                injectKey(it.children)
            }
        }
    }


    function incr() {
        return (index++)
    }
}

export { Comp1 }

const menuItems = [
    {
        label: 'Vouchers',
        children: [
            {
                label: 'Journals',
                component: 'AppJournals'
            },
            {
                label: 'Payments',
                component: 'AppPayments'
            }
        ],
    },
    {
        label: 'Sales / purchases',
        children: [
            {
                label: 'Sales',
                component: 'AppSales'
            }
        ]
    }
]