import { appStore, AppConstants, MenuAnt, } from '@src/features'
import { useSideMenu } from './side-menu-hook'

function SideMenu() {
    const { getMenuItems, handleOnOpenChange, handleOnSelect, menuItems } = useSideMenu()
    return (<MenuAnt
        items={getMenuItems(menuItems)}
        mode='inline'
        onClick={(e: any) => { appStore.layouts.isDrawerOpen.value = false }}
        onOpenChange={handleOnOpenChange}
        onSelect={handleOnSelect}
        openKeys={appStore.layouts.sideMenuOpenKeys.value}
        selectedKeys={appStore.layouts.sideMenuSelectedKeys.value}
        style={{ width: `${AppConstants.SIDEBAR_WIDTH}`, marginTop: 0, }}
    // theme='dark'
    >
    </MenuAnt>)
}

export { SideMenu }
