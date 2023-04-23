import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, State, useHookstate } from '@src/libs'
import { appStore, AppStoreType } from '@src/features'
import { AppSideMenu } from './side-menu/app-side-menu'

function AppDrawer() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    return (<Drawer
        isOpen={store.layouts.isDrawerOpen.value}
        placement='left'
        size='xs'
        onClose={handleOnCloseDrawer}>
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Trace</DrawerHeader>
                <DrawerBody>
                    <AppSideMenu />
                </DrawerBody>
                <DrawerFooter>
                    Accounting package
                </DrawerFooter>
            </DrawerContent>

    </Drawer>)

    function handleOnCloseDrawer(){
        store.layouts.isDrawerOpen.set(false)
    }
}
export { AppDrawer }