import { appStore, Box, useEffect, } from '@src/features'
import { AppLogin, DummyComponent } from '@src/components'
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'
// import { useAppLayouts } from './app-layouts-hook'

function AppLayouts() {
    const isLoggedIn = appStore.login.isLoggedIn.value

    useEffect(() => {
        // isLoggedIn ? <></> : appStore.layouts.selectedComponent.value = AppLogin
        appStore.layouts.selectedComponent.value = isLoggedIn ? DummyComponent : AppLogin
    }, [isLoggedIn])

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