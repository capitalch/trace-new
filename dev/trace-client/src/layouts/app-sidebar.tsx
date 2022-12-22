import { AppConstants, appStore, ArrowLeftIconChakra, Box, HStack, IconButton, Slide, VStack } from '@src/features'

function AppSidebar() {
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT
    return (
        <Slide direction='left' in={isSidebarOpen} style={{ width: SIDEBARWIDTH, overflowY: 'auto', overflowX: 'clip', backgroundColor: 'ylightGrey' }}>
            <VStack w={SIDEBARWIDTH} shadow='xs' overflowY='auto'>
                {/* Logo and close button */}
                <HStack justifyContent='flex-end' w='100%' h={HEIGHT}>
                    <IconButton aria-label='Slide left' icon={<ArrowLeftIconChakra />} size='xs' />
                    {/* <CloseButton onClick={() => globalStore.isSideMenuOpen.value = false} mr='15px' /> */}
                </HStack>
                {/* <SideMenu /> */}
            </VStack>
        </Slide>
    )
}
export { AppSidebar }