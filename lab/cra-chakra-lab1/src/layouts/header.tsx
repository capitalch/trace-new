import React, { useEffect } from 'react'
import { Box, CloseButton, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Hide, HStack, Input, Show, Slide, useBreakpointValue, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import { AiFillAlert, AiFillAlipayCircle, AiFillAliwangwang } from "react-icons/ai"
import { Menu, type MenuProps, MenuTheme } from 'antd'

function LayoutMain() {
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure()
    const { isOpen: io, onClose: oc, onOpen: oo, onToggle: ot }: any = useDisclosure()
    // const toOpen = useBreakpointValue({
    //     md: true,
    //     xl: false,
    //     '2xl': false,
    //     sm: 'true',
    // })
    const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)", { ssr: false })
    useEffect(() => {

        // if(isOpen){
        //     if (isLargerThan1536) {
        //         onClose()
        //     } 
        // } else {
        //     if (isLargerThan1536) {
        //         onOpen()
        //     } 
        // }

        if (isLargerThan1536) {
            onOpen()
        } else {
            onClose()
        }
    },)
    return (
        <Box>
            <Header isOpen={isOpen} />
            <Box>
                <LeftDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                <Content isOpen={isOpen} />
            </Box>

        </Box>
    )
}
export { LayoutMain }

function Header({ isOpen }: any) {
    return (
        <Box minW='100%' h='39px' bg='blue' shadow='md'>
        </Box>
    )
}
export { Header }

function LeftDrawer({ isOpen, onClose, onOpen }: any) {
    return (
        // <Hide below='2xl'>
        <Slide direction='left' in={isOpen} style={{ zIndex: 10 }} >
            <Box
                bg='teal.300'
                mt='39px'
                w={200}
                // w={[0, 0, 0, 0, 0, 200]}
                h='100%'
                shadow='xs'
                overflowY='auto'
            // display='none'
            >
                <CloseButton 
                onClick={onClose}
                />
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
            </Box>
        </Slide>
        // </Hide>
        // </>
        // <Drawer isOpen={isOpen}
        //     size='xs'
        //     trapFocus={false}
        //     blockScrollOnMount={false}
        //     placement="left"
        //     // isFullHeight={false}
        //     onClose={onClose}
        // >
        //     <DrawerOverlay />
        //     <DrawerContent w='200' maxW='200' mt={10}>
        //         <DrawerCloseButton size='sm' />
        //         <DrawerHeader>Create </DrawerHeader>
        //         <DrawerBody>
        //             <Input placeholder='Type here...' />
        //         </DrawerBody>

        //         <DrawerFooter>
        //             <Button variant='outline' mr={3} onClick={onClose}>
        //                 Cancel
        //             </Button>
        //             <Button colorScheme='blue'>Save</Button>
        //         </DrawerFooter>
        //     </DrawerContent>
        // </Drawer>
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
export { LeftDrawer }

function Content({ isOpen }: any) {
    return (
        <Box
            w={isOpen ? 'calc(100vw - 200px)' : '100vw'}
            ml={isOpen ? '200px' : 0}
            bg='gray.400' h="calc(100vh - 39px)" >AAA</Box>
        // <Flex minW='100%' minH='100%' bg='gray.100' ml={200}>
        //     <Button colorScheme='blue'>Content button</Button>
        // </Flex>
    )
}
export { Content }