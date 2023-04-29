import { Box, Button, Text } from '@chakra-ui/react'
import { appStore } from '../app-store'
import { CompA } from './compa'
import { produce } from 'immer'

function Comp1Level2() {
    const details = appStore.admin.login.details.value
    return (<Box>
        Comp1 level2
        <Text>{appStore.count}</Text>
        <Text>{appStore.admin.address}</Text>
        <Text>{appStore.admin.name}</Text>
        <appStore.admin.component.value />
        {/* <>{details.length}</> */}
        {getDetailsMarkup()}
        <Button onClick={handleIncr}>Incr</Button>
        <Button onClick={handleNameAddr}>Set name</Button>
        <Button onClick={handleComp}>Set component</Button>
        <Button onClick={handleMarkup}>Set markup</Button>
    </Box>)

    function handleIncr() {
        appStore.count.value++
    }

    function handleNameAddr() {
        appStore.admin.name.value = 'John Doe'
        appStore.admin.address.value = '123 Main St'
    }

    function handleComp() {
        appStore.admin.component.value = CompA
    }

    function handleMarkup() {
        // const arr = appStore.value.admin.login.details.value
        const arr: number[] = appStore.admin.login.details.value
        appStore.admin.login.details.value = produce(arr, (draft: any) => {
            draft.push('a')
        })
        // appStore.value.admin.login.details.value = [...arr]
    }
    function getDetailsMarkup() {
        const details = appStore.admin.login.details.value
        const markup = details.map((detail, index) => {
            return (
                <Box key={index + 1}>{detail}</Box>
            )
        })
        return (<Box>{markup}</Box>)
    }
}
export { Comp1Level2 }