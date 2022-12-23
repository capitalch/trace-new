import { appStore, Box, MenuAnt, MenuPropsAnt } from '@src/features'
import { useSideMenu } from './side-menu-hook'
import { React, SalesPurchaseIcon, VouchersIcon } from "@src/features"
import { AppJournals, AppPayments, AppSales } from "@src/components"

function SideMenu() {
    const {getMenuItems} = useSideMenu()
    return (<MenuAnt
        // defaultOpenKeys={['sub1']}
        // defaultSelectedKeys={['1']}
        items={getMenuItems(items1)}
        mode='inline'
        onOpenChange={handleOnOpenChange}
        onSelect={handleOnSelect}
        openKeys={appStore.layouts.sideMenuOpenKeys.value}
        selectedKeys={appStore.layouts.sideMenuSelectedKeys.value}
        style={{ width: '200px', marginTop: 0, }}
        theme='dark'>
    </MenuAnt>)

    function handleOnSelect({ item, key, keyPath, selectedKeys, domEvent }: any) {
        appStore.layouts.sideMenuSelectedKeys.value = [key]
        // console.log('s')
    }

    function handleOnOpenChange(openKeys: string[]) {
        const lastOpenKeyIndex = (openKeys.length - 1) || 0
        const lastOpenKey = openKeys[lastOpenKeyIndex]
        appStore.layouts.sideMenuOpenKeys.value = [lastOpenKey]
        appStore.layouts.sideMenuSelectedKeys.value = ['0']
        // console.log('s')
    }
}
export { SideMenu }

const items: MenuPropsAnt['items'] = [
    {
        label: 'Navigation one',
        key: 'sub1',
        // icon: <AiFillAlert />,

        children: [
            {
                label: 'Option 1',
                key: '1'
            },
            {
                label: 'Option 2',
                key: '2'
            },
            {
                label: 'Option 3',
                key: '3'
            },
            {
                label: 'Option 4',
                key: '4'
            }
        ]
    },
    {
        label: 'Navigation two',
        key: 'sub2',
        // icon: <AiFillAlipayCircle />,
        children: [
            {
                label: 'Option 1',
                key: '5'
            },
            {
                label: 'Option 2',
                key: '6'
            },
            {
                label: 'Option 3',
                key: '7'
            },
            {
                label: 'Option 4',
                key: '8'
            }
        ]
    },
    {
        label: 'Navigation three',
        key: 'sub3',
        // icon: <AiFillAliwangwang />,
        children: [
            {
                label: 'Option 1',
                key: '9'
            },
            {
                label: 'Option 2',
                key: '10'
            },
            {
                label: 'Option 3',
                key: '11'
            },
            {
                label: 'Option 4',
                key: '12'
            }
        ]
    },
    {
        label: 'Navigation four',
        key: 'sub4',
        // icon: <AiFillAliwangwang />,
        children: [
            {
                label: 'Option 1',
                key: '13'
            },
            {
                label: 'Option 2',
                key: '14'
            },
            {
                label: 'Option 3',
                key: '15'
            },
            {
                label: 'Option 4',
                key: '16'
            }
        ]
    }
]

interface MenuItemType {
    label: string
    component?: React.FC
    icon?: any
    children?: MenuItemType[]
}

const items1: MenuItemType[] = [
    {
        label: 'Vouchers',
        icon: <VouchersIcon />,
        children: [
            {
                label: 'Journals',
                component: AppJournals
            },
            {
                label: 'Payments',
                component: AppPayments
            }
        ],
    },
    {
        label: 'Sales / purchases',
        icon: <SalesPurchaseIcon />,
        children: [
            {
                label: 'Sales',
                component: AppSales
            }
        ]
    }
]