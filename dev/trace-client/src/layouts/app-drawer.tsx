import {  } from '@chakra-ui/modal'
import { appStore, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader } from '@src/features'
import { SideMenu } from './side-menu/side-menu'

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
                    <SideMenu />
                </DrawerBody>
                <DrawerFooter>
                    Accounting package
                </DrawerFooter>
            </DrawerContent>

    </Drawer>)

    function handleOnCloseDrawer(){
        appStore.layouts.isDrawerOpen.value = false
    }
}
export { AppDrawer }