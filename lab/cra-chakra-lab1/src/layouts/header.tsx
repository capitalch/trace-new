import { useEffect } from 'react'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, Input, Slide, useDisclosure } from "@chakra-ui/react"

function LayoutMain() {
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure()
    useEffect(() => {
        onOpen()
    }, [])
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
        <Slide direction='left' in={isOpen} style={{ zIndex: 10 }} >
            <Box
                bg='teal.300'
                mt='39px'
                w={[0,0,0,0,0,200]}
                h='100%'
                shadow='xs'
                display='none'
            >ABCD</Box>
        </Slide>
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
}
export { LeftDrawer }

function Content({ isOpen }: any) {
    return (
        <Box  
        w='calc(100vw - 200px)' 
        ml='200px'
        bg='gray.400' h="calc(100vh - 39px)" >AAA</Box>
        // <Flex minW='100%' minH='100%' bg='gray.100' ml={200}>
        //     <Button colorScheme='blue'>Content button</Button>
        // </Flex>
    )
}
export { Content }