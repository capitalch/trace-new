import {
    ChakraProvider,
    Box,
    Circle,
    HStack,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Button,
    ButtonGroup,
    IconButton,
    Select,
    Spacer,
    Stack,
    useMediaQuery,
} from "@chakra-ui/react"
import { AddIcon, ArrowForwardIcon, EmailIcon, PhoneIcon, } from '@chakra-ui/icons'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { AiFillAlert } from 'react-icons/ai'

export const AppMain = () => {
    const [isSmallDevice] = useMediaQuery("(max-width: 768px)")
    return <Box minW='100%' bg='blue.500' h='10' justifyContent='space-between' sx={myStyle} shadow='md'>
        {/* <HStack align='center' justifyItems='space-between'> */}
        <HStack>
            <Button size='xs' ml={10} colorScheme='gray' fontSize='sm'>Test</Button>
            <Button size='xs'>Test</Button>
            <Text color={['red', 'green', 'blue', 'white', 'yellow', 'pink']}>Responsive</Text>
            <Text color = {isSmallDevice?'red':'white'}>Is small device</Text>
        </HStack>
        <Spacer />
        <HStack>
            <Button className="myClass" size='xs' mr={2}>New</Button>
            <Select placeholder='Select option' size='sm' bg='Background'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
        </HStack>
        {/* <Circle size={10} bg='red.400' color='white' onClick={() => console.log('phone')}
            _hover={{ bg: "teal.600", cursor: 'pointer' }}
            _active={{
                bg: 'red.500',
                transform: 'scale(0.98)',
                borderColor: 'black',
            }}
        >
            <PhoneIcon />
        </Circle> */}
        {/* </HStack> */}
    </Box>
    // <Box fontSize="xs">
    //     <Box bg='tomato' h='10xs' w='100%' p={4} color='white'>
    //         {/* This is the Box */}
    //     </Box>
    //     <Grid minH="100vh" p={3} bg='gray.200'>
    //         {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
    //         <VStack >
    //             {/* <Logo h="40vmin" pointerEvents="none" /> */}
    //             <Text>
    //                 Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
    //             </Text>
    //             <Link
    //                 color='red.500'
    //                 href="https://chakra-ui.com"
    //                 fontSize="2xl"
    //                 target="_blank"
    //                 rel="noopener noreferrer">
    //                 Learn Chakra
    //             </Link>
    //             <HStack direction='column' spacing={2} align='center'>
    //                 <Button size='xs' leftIcon={<EmailIcon />} colorScheme='teal' variant='solid'>
    //                     Email
    //                 </Button>
    //                 <Button
    //                     height='48px'
    //                     width='200px'
    //                     border='2px'
    //                     borderColor='green.500'
    //                     colorScheme='blue'>
    //                     Click me
    //                 </Button>
    //                 <ButtonGroup size='md' isAttached variant='solid'>
    //                     <Button>Save</Button>
    //                     <IconButton aria-label='Add to friends' rounded='full' icon={<AddIcon />} />
    //                 </ButtonGroup>
    //             </HStack>

    //         </VStack>
    //     </Grid>
    // </Box>
    }

const myStyle = {
    display: 'flex',
    '.myClass': {
        color: 'red'
    }
}