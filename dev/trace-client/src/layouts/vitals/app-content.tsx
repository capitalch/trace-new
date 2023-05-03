import { AppConstants, appStore, } from '@src/features'
import { Box, Flex, HStack, Text, } from '@src/libs'

function AppContent() {
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const isLoggedIn = appStore.login.isLoggedIn.value
    const HEADER_HEIGHT = isLoggedIn ? AppConstants.HEADER_HEIGHT : '0px'
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    // const selectedComponent = appStore.layouts.selectedComponent.value

    return (<Box
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} pl={6} pr={6} pb={5} pt={0}>
        <Flex h='100%' direction='column'>
            <Flex direction='row' mb={1} mt={1} justifyContent='flex-end'>
                <Text>{appStore.content.title.value}</Text>
                {/* <Text color='GrayText' fontWeight='bold' fontSize='md'>{appStore.content.breadcrumb.value}</Text> */}
            </Flex>
            {/* <HStack w='100%' mb={1} mt={1} >
                <Text>{appStore.content.title.value}</Text>
                <Text color='GrayText' fontWeight='bold' fontSize='md'>{appStore.content.breadcrumb.value}</Text>
            </HStack> */}
            <appStore.layouts.selectedComponent.value />
        </Flex>
    </Box>)
}
export { AppContent }