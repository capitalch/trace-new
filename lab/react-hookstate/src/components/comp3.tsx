import { Box, Text, VStack} from '@chakra-ui/react'
import { Comp2 } from './comp2'

function Comp3() {
    return (
        <VStack>
            <Text>Comp3</Text>
            <Comp2 />
        </VStack>
    )
}
export { Comp3 }