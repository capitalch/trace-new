import { appStore, Box, useEffect, useMediaQuery } from '@src/features'
import { AppLogin } from '@src/components'
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'

function AppLayouts() {
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })

    useEffect(() => {
        if (isLargerThan1536) {
            appStore.layouts.isSidebarOpen.value = true
        } else {
            appStore.layouts.isSidebarOpen.value = false
        }
    })

    useEffect(() => {
        appStore.layouts.selectedComponent.value = AppLogin
    }, [])

    return (<Box>
        <AppHeader />
        <Box>
            <AppSidebar />
            <AppDrawer />
            <AppContent />
        </Box>

    </Box>)
}
export { AppLayouts }