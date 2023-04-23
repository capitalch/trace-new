import {
    AppConstants, appStaticStore, appStore, AppStoreType, Box, IconButton, MenuIcon, useEffect, useMediaQuery, Flex, useHookstate, State
} from '@src/features'
import { LogoutMenuButton } from './logout-menu-button'

function AppHeader() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const isLoggedIn = store.login.isLoggedIn.get()
    const isSidebarOpen = store.layouts.isSidebarOpen.get()

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
            store.layouts.isSidebarOpen.set(isOpen)

        } else {
            store.layouts.isSidebarOpen.set(false)
            store.layouts.isDrawerOpen.set(false)
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
            store.layouts.isDrawerOpen.set(true)
            store.layouts.isSidebarOpen.set(false)
        } else {
            store.layouts.isSidebarOpen.set(true)
            store.layouts.isDrawerOpen.set(false)
            appStaticStore.isOpenClicked = true
        }
    }
}
export { AppHeader }