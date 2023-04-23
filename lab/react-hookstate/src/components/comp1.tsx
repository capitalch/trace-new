import { HStack, Text, VStack } from '@chakra-ui/react'
import { State, useHookstate } from '@hookstate/core'
import { AppStoreType, appStore } from '../features/app-store'
import { DummyComponent } from './dummy-component'

function Comp1() {
    const store:any = useHookstate(appStore)
    // const comp = store.layouts.selectedComponent.get()
    // appStore.layouts.selectedComponent.set(JSON.stringify(()=><>Test</>))
    // const comp: any = JSON.parse(store.layouts.selectedComponent.value)
    // const comp: any = JSON.parse(store.layouts.selectedComponent.value || '')

    // store.layouts.selectedComponent.merge(DummyComponent)
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