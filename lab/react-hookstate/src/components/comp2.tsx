import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useHookstate } from '@hookstate/core'
import { appStore } from '../features/app-store'
import { useComp2 } from './comp2-hook'
import { AppLogin } from './app-login'

function Comp2() {
    const store: any = useHookstate(appStore)
    const compObj: any = {
        dummy: () => <></>,
        appLogin: AppLogin
    }
    // const { store } = useComp2()
    // const Dummy = store.layouts.selectedComponent.value
    const compName: string = store.layouts.compName.value
    const MyComp = compObj[compName]
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
            {/* {<store.layouts.selectedComponent.value />} */}
            <MyComp />
            <Button onClick={handleSwitch}>Switch</Button>
        </VStack>
    )

    function handleSwitch() {
        store.layouts.compName.set('appLogin')
    }

    function handleResetCode() {
        store.admin.businessUnit.code.set('')
    }

    function handleSetCode() {
        store.admin.businessUnit.code.set('capitalchowringhee')
        // store.admin.businessUnit.code.value = 'capitalchowringhee'
    }

    function handleResetName() {
        store.admin.businessUnit.name.set('')
    }

    function handleSetName() {
        store.admin.businessUnit.name.set('capital chowringhee pvt ltd')
    }
}

export { Comp2 }

