import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader } from '@src/libs'
import { appStore } from '@src/features'
import { AppSideMenu } from '../side-menu/app-side-menu'

function AppDrawer() {
    return (<Drawer
        isOpen={appStore.layouts.isDrawerOpen.value}
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

    function handleOnCloseDrawer() {
        appStore.layouts.isDrawerOpen.value = false
    }
}
export { AppDrawer }