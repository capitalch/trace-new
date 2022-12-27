import {
    AppConstants, appStaticStore, appStore, Box, HStack, IconButton,
    MenuIcon, useEffect, useMediaQuery
} from '@src/features'

function AppHeader() {

    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const isLoggedIn = appStore.login.isLoggedIn.value
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value

    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT

    useEffect(() => {
        let isOpen = false
        if (isLoggedIn) {
            if (isLargerThan1536) {
                isOpen = true
                if (appStaticStore.isCloseClicked) {
                    isOpen = false
                    appStaticStore.isCloseClicked = false
                }
                if(appStaticStore.isOpenClicked){
                    appStaticStore.isOpenClicked = false
                }
            } else {
                isOpen = false
                if (appStaticStore.isOpenClicked) {
                    isOpen = true
                    appStaticStore.isOpenClicked = false
                }
                if(appStaticStore.isCloseClicked){
                    appStaticStore.isCloseClicked = false
                }
            }
            appStore.layouts.isSidebarOpen.value = isOpen

        } else {
            appStore.layouts.isSidebarOpen.value = false
            appStore.layouts.isDrawerOpen.value = false
        }
    }, [isSidebarOpen, isLargerThan1536, isLoggedIn, appStaticStore.isCloseClicked, appStaticStore.isOpenClicked])


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
            appStore.layouts.isSidebarOpen.value = false
        } else {
            appStore.layouts.isSidebarOpen.value = true
            appStore.layouts.isDrawerOpen.value = false
            appStaticStore.isOpenClicked = true
        }
    }
}
export { AppHeader }