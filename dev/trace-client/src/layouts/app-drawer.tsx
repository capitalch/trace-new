import { appStore, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, useHookstate } from '@src/features'
import { AppSideMenu } from './side-menu/app-side-menu'

function AppDrawer() {
    const store: any = useHookstate(appStore)
    return (<Drawer
        isOpen={store.layouts.isDrawerOpen.get()}
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