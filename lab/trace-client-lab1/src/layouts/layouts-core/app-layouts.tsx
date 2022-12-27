import { appStore, Box, useEffect, useLayoutEffect, useMediaQuery } from '@src/features'
import { AppLogin, } from '@src/components'
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'
// import { useAppLayouts } from './app-layouts-hook'

function AppLayouts() {
    
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