import { useAppSelectComponent } from '../components'
import { AppConstants, appStore, AppStoreType } from '@src/features'
import { Box, FC, Flex, HStack, State, Text, useHookstate } from '@src/libs'

function AppContent() {
    // const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    const { appSelectComponent } = useAppSelectComponent()
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const isLoggedIn = appStore.login.isLoggedIn.value
    const HEADER_HEIGHT = isLoggedIn ? AppConstants.HEADER_HEIGHT : '0px'
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    const selectedComponentName = appStore.layouts.selectedComponentName.value
    const SelectedComponent: FC = appSelectComponent[selectedComponentName]

    return (<Box
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} pl={6} pr={6} pb={5} pt={0}>
        <Flex h='100%' direction='column'>
            <HStack w='100%' mb={1} mt={1}>
                <Text color='GrayText' fontWeight='bold' fontSize='md'>{appStore.content.breadcrumb.value}</Text>
            </HStack>
            <SelectedComponent />
        </Flex>
    </Box>)
}
export { AppContent }