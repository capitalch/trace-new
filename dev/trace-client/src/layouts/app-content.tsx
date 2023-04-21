import { AppConstants, appStore, Box, Flex, HStack, Text, useHookstate, } from '@src/features'
import { appComponentSelect, } from '../components'

function AppContent() {
    const store: any = useHookstate(appStore)
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const isLoggedIn = store.login.isLoggedIn.get()
    const HEADER_HEIGHT = isLoggedIn ? AppConstants.HEADER_HEIGHT : '0px'
    const isSidebarOpen = store.layouts.isSidebarOpen.get()
    // const selectedComponent = store.layouts.selectedComponent.get()
    const selectedComponentName = store.layouts.selectedComponentName.get()
    const SelectedComponent: any = appComponentSelect[selectedComponentName]

    return (<Box
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} pl={6} pr={6} pb={5} pt={0}>
        <Flex h='100%' direction='column'>
            <HStack w='100%' mb={1} mt={1}>
                <Text color='GrayText' fontWeight='bold' fontSize='md'>{store.content.breadcrumb.get()}</Text>
            </HStack>
            <SelectedComponent />
            {/* {selectedComponent ? <store.layouts.selectedComponent.value /> : <></>} */}
        </Flex>
    </Box>)
}
export { AppContent }