import { HStack, Text, VStack } from '@chakra-ui/react'
import { State, useHookstate } from '@hookstate/core'
import { AppStoreType, appStore } from '../features/app-store'

function Comp1() {
    const store: State<AppStoreType> = useHookstate(appStore)
    return (
        <VStack>
            <Text>Comp1</Text>
            <HStack>
                <Text>{store.admin.businessUnit.name.get()}</Text>
                <Text>{store.admin.businessUnit.code.get()}</Text>
            </HStack>
        </VStack>
    )
}

export { Comp1 }