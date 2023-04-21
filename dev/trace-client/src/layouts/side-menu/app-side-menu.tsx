import { appStore, AppConstants, MenuAnt, useHookstate, } from '@src/features'
import { useAppSideMenu } from './app-side-menu-hook'

function AppSideMenu() {
    const store: any = useHookstate(appStore)
    const { getItems, handleOnClick, handleOnOpenChange, handleOnSelect } = useAppSideMenu()
    return (<MenuAnt
        items={getItems()}
        mode='inline'
        onClick={handleOnClick}
        onOpenChange={handleOnOpenChange}
        onSelect={handleOnSelect}
        openKeys={store.layouts.sideMenuOpenKeys.get()}
        selectedKeys={store.layouts.sideMenuSelectedKeys.get()}
        style={{ width: `${AppConstants.SIDEBAR_WIDTH}`, marginTop: 0, }}
    // theme='dark'
    >
    </MenuAnt>)
}

export { AppSideMenu }