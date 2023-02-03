import { AppConstants, appStore, Box, Flex, HStack, Text, VStack } from '@src/features'

function AppContent() {
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const isLoggedIn = appStore.login.isLoggedIn.value
    const HEADER_HEIGHT = isLoggedIn ? AppConstants.HEADER_HEIGHT : '0px'
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    const selectedComponent = appStore.layouts.selectedComponent.value

    return (<Box
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        // bg='white'
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} p={1.0} pt={0}>

        <Flex h='100%' direction='column'>
            <HStack w='100%' mb={1} mt={1} ml={1}>
                <Text color='GrayText' fontWeight='bold' fontSize='md'>{appStore.content.breadcrumb.value}</Text>
            </HStack>
            {selectedComponent ? <appStore.layouts.selectedComponent.value /> : <></>}
        </Flex>
        {/* <AppModal /> */}
    </Box>)
}
export { AppContent }