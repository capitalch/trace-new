import { appStore, AppConstants, MenuAnt, } from '@src/features'
import { useAppSideMenu } from './app-side-menu-hook'

function AppSideMenu() {
    const { getMenuItems, handleOnOpenChange, handleOnSelect, menuItemsForAccounts } = useAppSideMenu()
    return (<MenuAnt
        items={getMenuItems(menuItemsForAccounts)}
        mode='inline'
        onClick={() => appStore.layouts.isDrawerOpen.value = false }
        onOpenChange={handleOnOpenChange}
        onSelect={handleOnSelect}
        openKeys={appStore.layouts.sideMenuOpenKeys.value}
        selectedKeys={appStore.layouts.sideMenuSelectedKeys.value}
        style={{ width: `${AppConstants.SIDEBAR_WIDTH}`, marginTop: 0, }}
    // theme='dark'
    >
    </MenuAnt>)
}

export { AppSideMenu }
