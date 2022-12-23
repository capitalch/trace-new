import { AppConstants, appStore, ArrowLeftIconChakra, HStack, IconButton, Image, Slide, VStack } from '@src/features'
import { SideMenu } from './side-menu/side-menu'

function AppSidebar() {
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT
    return (
        <Slide direction='left' in={isSidebarOpen} style={{ width: SIDEBARWIDTH, overflowY: 'auto', overflowX: 'clip', backgroundColor: `${AppConstants.SIDEBAR_BACKGROUND_COLOR}` }}>
            <VStack w={SIDEBARWIDTH} shadow='xs' overflowY='auto'>
                {/* Logo and close button */}
                <HStack justifyContent='space-evenly' w='100%' h={HEIGHT} bg='white'>
                    <Image src='/trace-logo.png' />
                    <IconButton aria-label='Slide left' icon={<ArrowLeftIconChakra />} size='xs' onClick={handleClickSidebarClose} />
                </HStack>
                <SideMenu />
            </VStack>
        </Slide>
    )

    function handleClickSidebarClose() {
        appStore.layouts.isSidebarOpen.value = false
    }
}
export { AppSidebar }

