import { appStore, AppConstants, MenuAnt, } from '@src/features'
import { useAppSideMenu } from './app-side-menu-hook'

function AppSideMenu() {
    const { accountsMenu, getItems, handleOnClick, handleOnOpenChange, handleOnSelect } = useAppSideMenu()
    return (<MenuAnt
        items={getItems()}
        mode='inline'
        onClick={handleOnClick}
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
