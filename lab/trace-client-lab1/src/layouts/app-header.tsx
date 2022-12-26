import {
    AppConstants, appStaticStore, appStore, Box, HStack, IconButton,
    MenuIcon, useEffect, useMediaQuery
} from '@src/features'

function AppHeader() {
 
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const isLoggedIn = appStore.login.isLoggedIn.value
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    // const isCloseClicked = appStore.layouts.isCloseClicked.value
    // const isOpenClicked = appStore.layouts.isOpenClicked.value

    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT

    // appStore.layouts.isSidebarOpen.value = isLargerThan1536 ? true : false

    useEffect(() => {
        // const isLoggedIn = appStore.login.isLoggedIn.value
        // const isSidebarOpen = appStore.layouts.isSidebarOpen.value
        let isOpen = false
        const isCloseClicked = appStaticStore.isCloseClicked
        const isOpenClicked = appStaticStore.isOpenClicked
        if (isLoggedIn) {
            if (isLargerThan1536) {
                isOpen = true
                if (isCloseClicked) {
                    // appStaticStore.isCloseClicked = false
                    // appStore.layouts.isCloseClicked.value = false
                    isOpen = false
                } else if (isOpenClicked) {
                    appStaticStore.isOpenClicked = false
                    // appStore.layouts.isOpenClicked.value = false
                    isOpen = true
                }
                appStore.layouts.isSidebarOpen.value = isOpen
            } else {
                isOpen = false
                if (isCloseClicked) {
                    // appStore.layouts.isCloseClicked.value = false
                    isOpen = false
                } else if (isOpenClicked) {
                    // appStore.layouts.isOpenClicked.value = false
                    isOpen = true
                }
                appStore.layouts.isSidebarOpen.value = isOpen
            }
        } else {
            appStore.layouts.isSidebarOpen.value = false
            appStore.layouts.isDrawerOpen.value = false
        }
        // if (isSmallerThan768) {
        //     isLoggedIn && (appStore.layouts.isDrawerOpen.value = true)
        // } else {
        //     appStore.layouts.isDrawerOpen.value = false
        // }

    })

    // useEffect(() => {
    //     appStore.layouts.isSidebarOpen.value = isLargerThan1536 ? true : false
    // }, [])


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
        appStore.layouts.isOpenClicked.value = true
        if (isSmallerThan768) {
            appStore.layouts.isDrawerOpen.value = true
        } else {
            appStore.layouts.isSidebarOpen.value = true
        }

    }
}
export { AppHeader }