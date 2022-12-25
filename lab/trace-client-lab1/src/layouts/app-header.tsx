import {
    AppConstants, appStore, Box, HStack, IconButton,
    MenuIcon, useEffect, useMediaQuery
} from '@src/features'

function AppHeader() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    // const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value

    // useEffect(() => {
    //     // drawLayouts()
    //     if (isLargerThan1536) {
    //         appStore.layouts.isSidebarOpen.value = true
    //     } else {
    //         appStore.layouts.isSidebarOpen.value = false
    //     }
    // })


    return (<Box h={HEIGHT} bg={AppConstants.HEADER_BACKGROUND_COLOR} color={AppConstants.HEADER_COLOR} shadow='md' display='flex'
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} >
        <HStack>
            {
                isSidebarOpen
                    ? <></>
                    : <IconButton ml={2} variant='unstyled' size='lg' aria-label='Side bar' icon={<MenuIcon />} onClick={handleMenuClick}
                    />
            }
        </HStack>
    </Box>)

    function handleMenuClick() {
        if (isSmallerThan768) {
            appStore.layouts.isDrawerOpen.value = true
        } else {
            appStore.layouts.isSidebarOpen.value = true
        }

    }
}
export { AppHeader }