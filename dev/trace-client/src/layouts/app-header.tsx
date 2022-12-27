import {
    AppConstants, appStaticStore, appStore, Box, Button, ChevronDownIcon, IconButton,Menu, MenuButton, MenuList, MenuItem, PersonIcon,
    MenuIcon, useEffect, useMediaQuery, Flex
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
            appStore.layouts.isSidebarOpen.value = isOpen

        } else {
            appStore.layouts.isSidebarOpen.value = false
            appStore.layouts.isDrawerOpen.value = false
        }
    }, [isSidebarOpen, isLargerThan1536, isLoggedIn, appStaticStore.isCloseClicked, appStaticStore.isOpenClicked])


    return (
        isLoggedIn &&
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

            {/* <Button variant='ghost' ml='auto' mr={2}
                _hover={{
                    background: "blue.500",
                    color: "gray.800",
                }}
                // bg='blue.600' color='white'
                leftIcon={<PersonIcon fontSize='1.2rem' />}
                size='sm' >{appStore.login.uidEmail.value}</Button> */}

            <Menu>
                <MenuButton ml='auto' mr={2}
                    _hover={{
                        background: "blue.500",
                        color: "gray.800",
                    }}
                    _expanded={{bg:'amber'}}
                    // _focus={{boxShadow:'outline', }}
                    size='sm'
                    as={Button}
                    aria-label='Logout'
                    leftIcon={<PersonIcon fontSize='1.2rem' />}
                    rightIcon={<ChevronDownIcon fontSize='1.2rem' />}
                    variant='ghost'>{appStore.login.uidEmail}</MenuButton>
                <MenuList color='amber' bg='gray.400' >
                    <MenuItem bg='white' color='gray.800' >Change uid</MenuItem>
                    <MenuItem bg='white' color='gray.800'>Change password</MenuItem>
                    <MenuItem bg='white' color='gray.800'>Logout</MenuItem>
                </MenuList>
            </Menu>

        </Flex>
    </Box> 
    )

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