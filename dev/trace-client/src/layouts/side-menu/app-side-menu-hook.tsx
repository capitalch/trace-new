import { appStore, HomeIcon, React, SalesPurchaseIcon, SideMenuTypesEnum, VouchersIcon } from "@src/features"
import { AppDashboard, AppJournals, AppPayments, AppSales } from "@src/components"

function useAppSideMenu() {
    // const userType = appStore.login.userType
    const sideMenuType = appStore.layouts.sideMenuType.value
    let num: number = 1
    const componentsMap: { [key: string]: React.FC } = {}
    function getItems() {
        if (sideMenuType === SideMenuTypesEnum.accountsMennu) {
            return getMenuItems(accountsMenu)
        } else if (sideMenuType === SideMenuTypesEnum.superAdminMenu) {
            return getMenuItems(superAdminMenu)
        } else {
            return getMenuItems(adminMenu)
        }
    }
    function getMenuItems(items: MenuItemType[]): any[] {
        const menuItemsWithKeys: MenuItemType[] = items.map((item: MenuItemType) => {
            item.key = incr()
            if (item.component) {
                componentsMap[item.key] = item.component
            } else if (item.children && (item.children.length > 0)) {
                item.children = getMenuItems(item.children)
            }
            return (item)
        })
        return (menuItemsWithKeys)
    }

    function handleOnSelect({ item, key, keyPath, selectedKeys, domEvent }: any) {
        appStore.layouts.sideMenuSelectedKeys.value = [key]
        appStore.layouts.selectedComponent.value = componentsMap[key]
    }

    function handleOnOpenChange(openKeys: string[]) {
        const lastOpenKeyIndex = (openKeys.length - 1) || 0
        const lastOpenKey = openKeys[lastOpenKeyIndex]
        appStore.layouts.sideMenuOpenKeys.value = [lastOpenKey]
        appStore.layouts.sideMenuSelectedKeys.value = ['0']
    }

    function incr() {
        return (String(num++))
    }

    return { accountsMenu, componentsMap, getItems, handleOnOpenChange, handleOnSelect, }

}
export { useAppSideMenu }

interface MenuItemType {
    key?: string
    label: string
    component?: React.FC
    icon?: any
    children?: MenuItemType[]
}

const accountsMenu: MenuItemType[] = [
    {
        label: 'Home',
        icon: <HomeIcon color='blue' />,
        children: [
            {
                label: 'Dashboard',
                component: AppDashboard
            }
        ]
    },
    {
        label: 'Vouchers',
        icon: <VouchersIcon color='red' />,
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
        icon: <SalesPurchaseIcon color='green' />,
        children: [
            {
                label: 'Sales',
                component: AppSales
            }
        ]
    }
]

const superAdminMenu: MenuItemType[] = [
    {
        label: 'Home',
        icon: <HomeIcon color='blue' />,
        children: [
            {
                label: 'Dashboard',
                component: AppDashboard
            }
        ]
    },
]

const adminMenu: MenuItemType[] = [
    {
        label: 'Home',
        icon: <HomeIcon color='blue' />,
        children: [
            {
                label: 'Dashboard',
                component: AppDashboard
            }
        ]
    },
]
