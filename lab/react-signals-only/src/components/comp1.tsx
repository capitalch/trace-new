import { Box, Button, Text } from "@chakra-ui/react";
import { appStore } from "../app-store";
import { useImmer } from "use-immer";
import { effect } from '@preact/signals-react'
import { produce } from 'immer'

function Comp1() {
    // const [items, addToItems] = useImmer(appStore.items.value)

    effect(() => {
        console.log('Address changed')
    })

    return (<Box m={10}>
        <Text>{appStore.admin.name.value}</Text>
        <Text>{appStore.admin.address.value}</Text>
        <Button onClick={() => appStore.admin.name.value = appStore.admin.name.value + 'x'}>Set name</Button>
        <Button onClick={handleOnAddClick}>Add item</Button>
        <Button onClick={handleAddressChange}>Address change</Button>
        {getItems()}
    </Box>)

    function getItems() {
        const items = appStore.items.value
        const ret = items.map((item, index) => {
            return (<Text key={index}>{item.details}</Text>)
        })
        return (ret)
    }

    function handleOnAddClick() {
        // const items: any[] = appStore.items.value
        appStore.items.value = produce(appStore.items.value, ((draft: any[]) => {
            draft.push({ details: 'abcd' })
            return (draft)
        }))
        // appStore.items.value = newItems
        console.log('a')
        // addToItems((its: any[]) => { its.push({ details: 'abcd' }) })
        // appStore.items.value = items

        // appStore.items.value.push({ details: 'abcdef' })
        // const items = appStore.items.value
        // appStore.items.value = [...items]
    }

    function handleAddressChange() {
        appStore.admin.address.value = appStore.admin.address.value + ' ab'
    }
}

export { Comp1 }