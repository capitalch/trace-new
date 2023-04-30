import {
    Box, IconButton, MenuIcon, useEffect, useMediaQuery, Flex
} from '@src/libs'
import { AppConstants, appStore, } from '@src/features'
import { LogoutMenuButton } from './logout-menu-button'

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
                if (appStore.isCloseClicked) {
                    isOpen = false
                    appStore.isCloseClicked = false
                }
                if (appStore.isOpenClicked) {
                    appStore.isOpenClicked = false
                }
            } else {
                isOpen = false
                if (appStore.isOpenClicked) {
                    isOpen = true
                    appStore.isOpenClicked = false
                }
                if (appStore.isCloseClicked) {
                    appStore.isCloseClicked = false
                }
            }
            appStore.layouts.isSidebarOpen.value = isOpen

        } else {
            appStore.layouts.isSidebarOpen.value = false
            appStore.layouts.isDrawerOpen.value = false
        }
    }, [isSidebarOpen, isLargerThan1536, isLoggedIn,])


    return (
        <>
            {isLoggedIn &&
                <Box h={HEIGHT} bg={AppConstants.HEADER_BACKGROUND_COLOR} color={AppConstants.HEADER_COLOR} shadow='md' display='flex'
                    w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
                    ml={isSidebarOpen ? SIDEBARWIDTH : 0} >
                    <Flex w='100%' alignItems='center'>
                        {
                            isSidebarOpen
                                ? <></>
                                : <IconButton ml={2} variant='unstyled' size='sm' aria-label='Side bar' icon={<MenuIcon fontSize='1.2rem' />} onClick={handleMenuClick}
                                />
                        }
                        <LogoutMenuButton />
                    </Flex>
                </Box>}
        </>
    )

    function handleMenuClick() {
        if (isSmallerThan768) {
            appStore.layouts.isDrawerOpen.value = true
            appStore.layouts.isSidebarOpen.value = false
        } else {
            appStore.layouts.isSidebarOpen.value = true
            appStore.layouts.isDrawerOpen.value = false
            appStore.isOpenClicked = true
        }
    }
}
export { AppHeader }