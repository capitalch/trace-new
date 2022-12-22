import { appStore, Box, useEffect, useMediaQuery } from '@src/features'
import { AppContent } from './app-content'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'
function AppLayouts() {
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    useEffect(() => {
        if (isLargerThan1536) {
            appStore.layouts.isSidebarOpen.value = true
        } else {
            appStore.layouts.isSidebarOpen.value = false
        }
    })

    return (<Box>
        <AppHeader />
        <Box>
            <AppSidebar />
            <AppContent />
        </Box>

    </Box>)
}
export { AppLayouts }