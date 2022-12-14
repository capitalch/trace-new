import { globalStore } from "./store";
import { useEffect } from 'react'
import { Box, CloseButton, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Hide, HStack, Input, Show, Slide, useBreakpointValue, useDisclosure, useMediaQuery, IconButton, VStack } from "@chakra-ui/react"
import { AiFillAlert, AiFillAlipayCircle, AiFillAliwangwang } from "react-icons/ai"
import { TiThMenu } from 'react-icons/ti'
import { Menu, type MenuProps, MenuTheme } from 'antd'
import { If } from "react-if";

function LayoutSignals() {
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
                <ContentSignals />
            </Box>
        </Box>
    )
}

export { LayoutSignals }

function HeaderSignals() {
    return (
        <Box minW='100%' h='32px' bg='blue.500' shadow='md' display='flex'>
            <HStack>
                <If condition={!globalStore.isSideMenuOpen.value}>
                    <IconButton ml='2' variant='unstyled' rounded='full' size='lg' aria-label="Side menu" icon={<TiThMenu color="white" />} onClick={() => globalStore.isSideMenuOpen.value = true} />
                </If>

            </HStack>

            {/* <HStack>
                <Button size='xs' ml={10} colorScheme='gray' fontSize='sm'>Test</Button>
                <Button size='xs'>Test</Button>

            </HStack> */}

        </Box>
    )
}
export { HeaderSignals }

function SidebarSignals() {
    return (
        <Slide direction='left' in={globalStore.isSideMenuOpen.value} style={{ width: 200, marginTop: 32 }} >
            <VStack w={200} h='100%' shadow='xs' overflowY='auto'>
                <HStack justifyContent='flex-end' w='100%'>
                    <CloseButton onClick={() => globalStore.isSideMenuOpen.value = false} />
                </HStack>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    theme='light'
                    onClick={(e: any) => console.log(e)}
                    style={{ width: 200 }}
                    mode='inline'
                    // inlineCollapsed={true}
                    items={getItems()}
                />
            </VStack>
        </Slide>
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

function ContentSignals() {
    return (
        <Box
            w={globalStore.isSideMenuOpen.value ? 'calc(100vw - 200px)' : '100vw'}
            ml={globalStore.isSideMenuOpen.value ? '200px' : 0}
            bg='gray.50' h="calc(100vh - 32px)"
        >AAA</Box>
    )
}
// <Box
            //     bg='teal.300'
            //     mt='32px'
            //     w={200}
            //     h='100%'
            //     shadow='xs'
            //     overflowY='auto'
            // >
            //     <CloseButton
            //         onClick={() => globalStore.isSideMenuOpen.value = false}
            //     />
                // <Menu
                //     defaultSelectedKeys={['1']}
                //     defaultOpenKeys={['sub1']}
                //     theme='light'
                //     onClick={(e: any) => console.log(e)}
                //     style={{ width: 200 }}
                //     mode='inline'
                //     // inlineCollapsed={true}
                //     items={getItems()}
                // />
            // </Box>