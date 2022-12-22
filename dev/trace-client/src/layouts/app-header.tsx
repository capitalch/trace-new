import {
    AppConstants, appStore, Box, Else, HStack, IconButton, If
    , Then, TiThMenu, useEffect, useMediaQuery
} from '@src/features'

function AppHeader() {
    
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value

    return (<Box h={HEIGHT} bg={'twitter.700'} color='white' shadow='md' display='flex'
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} >
        <HStack>
            {isSidebarOpen ? <></> : <IconButton ml={2} colorScheme='whiteAlpha' size='xs' aria-label='Side bar' icon={<TiThMenu />} />}
            {/* <If condition={!isSidebarOpen}>
                <Then>
                    <IconButton ml={2} colorScheme='whiteAlpha' size='xs' aria-label='Side bar' icon={<TiThMenu />} />
                </Then>
                <Else>
                    <></>
                </Else>
            </If>  */}
            
        </HStack>
    </Box>)
}
export { AppHeader }