import { AppConstants, appStore, ArrowLeftIconChakra, HStack, IconButton, Image, Slide, useDeepSignal, useEffect, useMediaQuery, useState, VStack } from '@src/features'
import { AppSideMenu } from './side-menu/app-side-menu'

function AppSidebar() {
    // const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    const isSidebarOpen = appStore.layouts.isSidebarOpen.value
    const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH
    const HEIGHT = AppConstants.HEADER_HEIGHT
    // const isClose:any = useDeepSignal({clicked: false})
    useEffect(() => {
        // let ret = false
        // if(isLargerThan1536){
        //     if(isClose.clicked.value){
        //         ret = false
        //     } else {
        //         ret = true
        //     }
        // } else {
        //     ret = isSidebarOpen
        // }
        // appStore.layouts.isSidebarOpen.value = ret
    })

    return (
        <Slide direction='left' in={isSidebarOpen} style={{ width: SIDEBARWIDTH, overflowY: 'auto', overflowX: 'clip', backgroundColor: `${AppConstants.SIDEBAR_BACKGROUND_COLOR}` }}>
            <VStack w={SIDEBARWIDTH} shadow='xs' overflowY='auto'>
                {/* Logo and close button */}
                <HStack justifyContent='space-evenly' w='100%' h={HEIGHT} bg='white'>
                    <Image src='/trace-logo.png' />
                    <IconButton aria-label='Slide left' icon={<ArrowLeftIconChakra />} size='xs' onClick={handleClickSidebarClose} />
                </HStack>
                <AppSideMenu />
            </VStack>
        </Slide>
    )

    function handleClickSidebarClose() {
        // isClose.clicked.value = true
        appStore.layouts.isSidebarOpen.value = false
    }
}
export { AppSidebar }

