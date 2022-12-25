import { appStore, Box, useEffect, useLayoutEffect, useMediaQuery } from '@src/features'
import { AppLogin, } from '@src/components'
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'
// import { useAppLayouts } from './app-layouts-hook'

function AppLayouts() {
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const isLoggedIn = appStore.login.isLoggedIn.value
    // const { drawLayouts } = useAppLayouts()
    // drawLayouts()
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value // this line is necessary to do trigger
    const isDrawerOpen = appStore.layouts.isDrawerOpen.value // this line is necessary to do trigger
    useEffect(() => {
        // drawLayouts()
        if (isLoggedIn) {
            if (isLargerThan1536) {
                appStore.layouts.isSidebarOpen.value = true
            } else {
                appStore.layouts.isSidebarOpen.value = false
            }
        } else {
            appStore.layouts.isSidebarOpen.value = false
            appStore.layouts.isDrawerOpen.value = false
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