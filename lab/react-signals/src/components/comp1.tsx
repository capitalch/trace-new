import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react"
import { AppStore, UserType, UserTypeEnum } from '../appp-store'

function Comp1() {
    return (<Box m={5}>
        <HStack>
            <Text>{AppStore.admin.businessUnit.name.value}</Text>
            <Text>{AppStore.admin.userType.value}</Text>
        </HStack>
        <HStack>
            <Button onClick={handleClick}>Set value</Button>
            <Button onClick={handleClickSetType}>Set type</Button>
        </HStack>
    </Box>)

    function handleClick() {
        AppStore.admin.businessUnit.name.value = 'Capital Chowringhee'
    }

    function handleClickSetType() {
        AppStore.admin.userType.value = UserTypeEnum.businessUser
    }
}
export { Comp1 }