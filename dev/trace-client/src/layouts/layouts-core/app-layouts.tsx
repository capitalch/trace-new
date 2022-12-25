import { appStore, Box, useEffect, useLayoutEffect, useMediaQuery } from '@src/features'
import { AppLogin, } from '@src/components'
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'
import { useAppLayouts } from './app-layouts-hook'

function AppLayouts() {
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const { drawLayouts } = useAppLayouts()
    // drawLayouts()
    // const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    useEffect(() => {
        // drawLayouts()
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