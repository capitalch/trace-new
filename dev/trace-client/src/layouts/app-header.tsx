import { appStore, Box, HEADER_HEIGHT, HStack, IconButton, If, SIDEBAR_WIDTH, StoreType, Then, TiThMenu } from '@src/features'

function AppHeader() {
    const store: StoreType | any = appStore
    
    const SIDEBARWIDTH = store.appConstants.sidebarWidth.value
    const HEIGHT = store.appConstants.headerHeight.value
    const isSidebarOpen = store.layouts.isSidebarOpen.value
    return (<Box h={HEIGHT} bg={'twitter.700'} color='white' shadow='md' display='flex'
        w={isSidebarOpen ? `calc(100vw - ${SIDEBARWIDTH})` : '100vw'}
        ml={isSidebarOpen ? SIDEBARWIDTH : 0} >
        <HStack>
            Test
            <If condition={!isSidebarOpen}>
                <Then>
                    <IconButton ml={2} colorScheme='whiteAlpha' size='xs' aria-label='Side bar' icon={<TiThMenu />} />
                </Then>
            </If>
        </HStack>
    </Box>)
}
export { AppHeader }