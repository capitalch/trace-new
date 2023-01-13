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
            <Text color={isSmallDevice ? 'red' : 'white'}>Is small device</Text>
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

    </Box>
}

const myStyle = {
    display: 'flex',
    '.myClass': {
        color: 'red'
    }
}