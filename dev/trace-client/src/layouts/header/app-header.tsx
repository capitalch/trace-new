import {
     Box, IconButton, MenuIcon, useEffect, useMediaQuery, Flex, useHookstate, State
} from '@src/libs'
import {AppConstants, appStaticStore, appStore, AppStoreType,} from '@src/features'
import { LogoutMenuButton } from './logout-menu-button'

function AppHeader() {
    // const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const isLoggedIn = appStore.login.isLoggedIn.get()
    const isSidebarOpen = appStore.layouts.isSidebarOpen.get()

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
                if (appStaticStore.isOpenClicked) {
                    appStaticStore.isOpenClicked = false
                }
            } else {
                isOpen = false
                if (appStaticStore.isOpenClicked) {
                    isOpen = true
                    appStaticStore.isOpenClicked = false
                }
                if (appStaticStore.isCloseClicked) {
                    appStaticStore.isCloseClicked = false
                }
            }
            appStore.layouts.isSidebarOpen.set(isOpen)

        } else {
            appStore.layouts.isSidebarOpen.set(false)
            appStore.layouts.isDrawerOpen.set(false)
        }
    }, [isSidebarOpen, isLargerThan1536, isLoggedIn,])


    return (
        isLoggedIn ?
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
        </Box> : <></>
    )

    function handleMenuClick() {
        if (isSmallerThan768) {
            appStore.layouts.isDrawerOpen.set(true)
            appStore.layouts.isSidebarOpen.set(false)
        } else {
            appStore.layouts.isSidebarOpen.set(true)
            appStore.layouts.isDrawerOpen.set(false)
            appStaticStore.isOpenClicked = true
        }
    }
}
export { AppHeader }