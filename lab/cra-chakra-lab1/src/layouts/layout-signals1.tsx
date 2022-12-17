import { globalStore } from "./store";
import { useEffect } from 'react'
import { Box, CloseButton, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Hide, HStack, Input, Show, Slide, useBreakpointValue, useDisclosure, useMediaQuery, IconButton, VStack } from "@chakra-ui/react"
import { AiFillAlert, AiFillAlipayCircle, AiFillAliwangwang } from "react-icons/ai"
import { TiThMenu } from 'react-icons/ti'
import { Menu, type MenuProps, MenuTheme } from 'antd'
import { If } from "react-if";
const left = '200px', top = '38px'

function LayoutSignals1() {
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })


    useEffect(() => {
        if (isLargerThan1536) {
            globalStore.isSideMenuOpen.value = true
        } else {
            globalStore.isSideMenuOpen.value = false
        }
    })
    return (
        <Box>
            <HeaderSignals />
            <Box>
                <SidebarSignals />
                <DrawerSignals />
                <ContentSignals />
            </Box>
        </Box>
    )
}

export { LayoutSignals1 }

function HeaderSignals() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)", { ssr: false })
    return (
        <Box
            w={globalStore.isSideMenuOpen.value ? `calc(100vw - ${left})` : '100vw'}
            ml={globalStore.isSideMenuOpen.value ? left : 0}
            h={top} bg='blue.500' shadow='md' display='flex'>
            <HStack>
                <If condition={!globalStore.isSideMenuOpen.value}>
                    <IconButton ml='2' variant='unstyled' rounded='full' size='lg' aria-label="Side menu" icon={<TiThMenu color="white" />}
                        onClick={() => {
                            if (isSmallerThan768) {
                                globalStore.isDrawerOpen.value = true
                            } else {
                                globalStore.isSideMenuOpen.value = true
                            }
                        }
                        } />
                </If>
            </HStack>
        </Box>
    )
}
export { HeaderSignals }

function SidebarSignals() {
    return (
        <Slide direction='left' in={globalStore.isSideMenuOpen.value} style={{ width: left, backgroundColor: 'lightgray', overflowY: 'auto', overflowX: 'clip' }}>
            <VStack w={left} shadow='xs' overflowY='auto'>
                <HStack justifyContent='flex-end' w='100%' h='30px'>
                    <CloseButton onClick={() => globalStore.isSideMenuOpen.value = false} mr='15px' />
                </HStack>
                <SideMenu />
            </VStack>
        </Slide>
    )
}

function ContentSignals() {
    return (
        <Box
            w={globalStore.isSideMenuOpen.value ? `calc(100vw - ${left})` : '100vw'}
            ml={globalStore.isSideMenuOpen.value ? left : 0}
            bg='gray.50'
            h={`calc(100vh - ${top})`}
        >AAA</Box>
    )
}

function DrawerSignals() {

    return (
        <Drawer
            isOpen={globalStore.isDrawerOpen.value}
            placement='left'
            
            size='xs'
            onClose={() => {globalStore.isDrawerOpen.value = false}}>
            {/* <DrawerOverlay /> */}
            <DrawerContent bg='lightgray'>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>
                <DrawerBody>
                    <SideMenu />
                </DrawerBody>
                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export { DrawerSignals }

function SideMenu() {
    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            theme='dark'
            onClick={(e: any) => {globalStore.isDrawerOpen.value=false}}
            style={{ width: 200 }}
            mode='inline'
            // inlineCollapsed={true}
            items={getItems()}
        />
    )

    function getItems() {
        return ([
            {
                label: 'Navigation one',
                key: 'sub1',
                icon: <AiFillAlert />,
                children: [
                    {
                        label: 'Option 1',
                        key: '1'
                    },
                    {
                        label: 'Option 2',
                        key: '2'
                    },
                    {
                        label: 'Option 3',
                        key: '3'
                    },
                    {
                        label: 'Option 4',
                        key: '4'
                    }
                ]
            },
            {
                label: 'Navigation two',
                key: 'sub2',
                icon: <AiFillAlipayCircle />,
                children: [
                    {
                        label: 'Option 1',
                        key: '5'
                    },
                    {
                        label: 'Option 2',
                        key: '6'
                    },
                    {
                        label: 'Option 3',
                        key: '7'
                    },
                    {
                        label: 'Option 4',
                        key: '8'
                    }
                ]
            },
            {
                label: 'Navigation three',
                key: 'sub3',
                icon: <AiFillAliwangwang />,
                children: [
                    {
                        label: 'Option 1',
                        key: '9'
                    },
                    {
                        label: 'Option 2',
                        key: '10'
                    },
                    {
                        label: 'Option 3',
                        key: '11'
                    },
                    {
                        label: 'Option 4',
                        key: '12'
                    }
                ]
            },
            {
                label: 'Navigation four',
                key: 'sub4',
                icon: <AiFillAliwangwang />,
                children: [
                    {
                        label: 'Option 1',
                        key: '13'
                    },
                    {
                        label: 'Option 2',
                        key: '14'
                    },
                    {
                        label: 'Option 3',
                        key: '15'
                    },
                    {
                        label: 'Option 4',
                        key: '16'
                    }
                ]
            }
        ])
    }
}

export { SideMenu }
