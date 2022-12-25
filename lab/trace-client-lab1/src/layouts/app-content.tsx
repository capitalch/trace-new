import { AppConstants, appStore, Box } from '@src/features'

function AppContent() {
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEADER_HEIGHT = AppConstants.HEADER_HEIGHT
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    const selectedComponent = appStore.layouts.selectedComponent.value

    return (<Box
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        bg='white'
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} p={.5}>
        {selectedComponent ? <appStore.layouts.selectedComponent.value /> : <></>}
    </Box>)
}
export { AppContent }