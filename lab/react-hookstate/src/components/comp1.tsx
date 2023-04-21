import { HStack, Text, VStack } from '@chakra-ui/react'
import { State, useHookstate } from '@hookstate/core'
import { AppStoreType, appStore } from '../features/app-store'

function Comp1() {
    const store: any = useHookstate(appStore)
    return (
        <VStack>
            <Text>Comp1</Text>
            <HStack>
                <Text>{store.admin.businessUnit.name.value}</Text>
                <Text>{store.admin.businessUnit.code.value}</Text>
            </HStack>
        </VStack>
    )
}

export { Comp1 }