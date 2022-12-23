import { React, SalesPurchaseIcon, useEffect, VouchersIcon } from "@src/features"
import { AppJournals, AppPayments, AppSales } from "@src/components"

function useSideMenu() {
    let num: number = 1
    const componentsMap: { id: number, component: React.FC }[] = []

    useEffect(()=>{
        console.log('a')
    },[])

    function getMenuItems(items: MenuItemType[]) {
        const menuItems = items.map((item, index) => {
            const id = getUniqId()
            const temp: any = { id: id, label: item.label }
            if (item.icon) {
                temp.icon = item.icon
            }
            if (item.component) {
                componentsMap.push({ id: id, component: item.component })
            } else if (item.children) {
                temp.children = getMenuItems(item.children)
            }
            return (temp)
        })
        return (menuItems)
    }

    function getUniqId() {
        return (num++)
    }

    interface MenuItemType {
        label: string
        component?: React.FC
        icon?: any
        children?: MenuItemType[]
    }

    return { getMenuItems, }

}
export { useSideMenu }

