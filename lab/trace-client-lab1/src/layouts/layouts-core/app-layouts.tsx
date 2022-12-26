import { appStore, Box, useEffect, useLayoutEffect, useMediaQuery } from '@src/features'
import { AppLogin, } from '@src/components'
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'
// import { useAppLayouts } from './app-layouts-hook'

function AppLayouts() {
    const reload = appStore.reload.value
    // const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    // const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    // const isLoggedIn = appStore.login.isLoggedIn.value
    
    // const isSidebarOpen = appStore.layouts.isSidebarOpen.value // this line is necessary to do trigger
    // const isDrawerOpen = appStore.layouts.isDrawerOpen.value // this line is necessary to do trigger
    // const isSidebarForcedClose = appStore.layouts.isSidebarForcedClose.value
    
    useEffect(()=>{
        // if (isLargerThan1536) {
            // appStore.layouts.isSidebarOpen.value = true
            // appStore.layouts.isSidebarForcedClose.value = false
        // }
    })
    
    useEffect(() => {
        // if (isLoggedIn) {
        //     if (isLargerThan1536) {

        //         // appStore.layouts.isSidebarOpen.value = true
        //         if (isSidebarForcedClose) {
        //             appStore.layouts.isSidebarOpen.value = false
        //         } else {
        //             appStore.layouts.isSidebarOpen.value = true
        //         }
        //     } else {
        //         // if(appStore.layouts.isSidebarForcedOpen.value){
        //         //     appStore.layouts.isSidebarOpen.value = true
        //         // } else {
        //         //     appStore.layouts.isSidebarOpen.value = false
        //         // }
        //         // appStore.layouts.isSidebarOpen.value = false
        // //     }
        // } else {
            // appStore.layouts.isSidebarOpen.value = false
            // appStore.layouts.isDrawerOpen.value = false
        // }
        // if (!isSmallerThan768) {
        //     appStore.layouts.isDrawerOpen.value = false
        // }
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