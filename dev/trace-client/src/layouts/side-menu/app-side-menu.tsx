import { appStore, AppConstants,  } from '@src/features'
import {MenuAnt,} from '@src/libs'
import { useAppSideMenu } from './app-side-menu-hook'

function AppSideMenu() {
    const { getItems, handleOnClick, handleOnOpenChange, handleOnSelect, store } = useAppSideMenu()
    return (<MenuAnt
        items={getItems()}
        mode='inline'
        onClick={handleOnClick}
        onOpenChange={handleOnOpenChange}
        onSelect={handleOnSelect}
        // openKeys={store.layouts.sideMenuOpenKeys.value}
        // selectedKeys={appStore.layouts.sideMenuSelectedKeys.value}
        style={{ width: `${AppConstants.SIDEBAR_WIDTH}`, marginTop: 0, }}
    // theme='dark'
    >
    </MenuAnt>)
}

export { AppSideMenu }