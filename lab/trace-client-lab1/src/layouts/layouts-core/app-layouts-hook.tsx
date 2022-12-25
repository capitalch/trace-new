import { appStore, useMediaQuery } from '@src/features'

function useAppLayouts() {
    // const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    function drawLayouts() {
        // const isOpen = isLargerThan1536 ? true : false
        // const isLoggedIn = appStore.login.isLoggedIn.value
        // appStore.layouts.isSidebarOpen.value = isOpen && isLoggedIn
        // appStore.layouts.isSidebarOpen.value = true
        // if (isLargerThan1536) {
        //     appStore.layouts.isSidebarOpen.value = true
        // } else {
        //     appStore.layouts.isSidebarOpen.value = false
        // }
    }

    return ({ drawLayouts })
}

export { useAppLayouts }