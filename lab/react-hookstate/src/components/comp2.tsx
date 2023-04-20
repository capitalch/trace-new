import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useHookstate } from '@hookstate/core'
import { appStore } from '../features/app-store'

function Comp2() {
    const store: any = useHookstate(appStore)
    return (
        <VStack>
            <Text>Comp2</Text>
            <HStack>
                <Button onClick={handleSetName}>Set name</Button>
                <Button onClick={handleResetName}>Reset name</Button>
            </HStack>
            <HStack>
                <Button onClick={handleSetCode}>Set code</Button>
                <Button onClick={handleResetCode}>Reset code</Button>
            </HStack>
        </VStack>
    )

    function handleResetCode(){
        store.admin.businessUnit.code.set('')
    }

    function handleSetCode() {
        store.admin.businessUnit.code.set('capitalchowringhee')
    }

    function handleResetName() {
        store.admin.businessUnit.name.set('')
    }

    function handleSetName() {
        store.admin.businessUnit.name.set('capital chowringhee pvt ltd')
    }
}

export { Comp2 }