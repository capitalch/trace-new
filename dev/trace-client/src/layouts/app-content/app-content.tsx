// import { useAppSelectComponent } from '../../components'
import { AppConstants, appStaticStore, appStore, AppStoreType } from '@src/features'
import { Box, FC, Flex, HStack, State, Text, useHookstate } from '@src/libs'
import { useAppContent } from './app-content-hook'

function AppContent() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    // const { appSelectComponent } = useAppSelectComponent()
    const { getComponent } = useAppContent()
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const isLoggedIn = store.login.isLoggedIn.value
    const HEADER_HEIGHT = isLoggedIn ? AppConstants.HEADER_HEIGHT : '0px'
    const isSidebarOpen = store.layouts.isSidebarOpen.value
    const selectedComponentName = store.layouts.selectedComponentName.get()
    const SelectedComponent: FC = getComponent(selectedComponentName)
    // appSelectComponent[selectedComponentName]

    return (<Box
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} pl={6} pr={6} pb={5} pt={0}>
        <Flex h='100%' direction='column'>
            <HStack w='100%' mb={1} mt={1}>
                <Text color='GrayText' fontWeight='bold' fontSize='md'>{store.content.breadcrumb.value}</Text>
            </HStack>
            <SelectedComponent />
        </Flex>
    </Box>)
}
export { AppContent }