import { Box, Button, Text } from "@chakra-ui/react";
<<<<<<< HEAD
import { appStore } from "../app-store";
=======
import { appStore, itemInstance } from "../app-store";
import { useImmer } from "use-immer";
>>>>>>> 3d2a02fd0ac2d3a64a9263f58f2e3ad74400167f
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
        // const items = appStore.items.value
        // const ret = items.map((item, index) => {
        //     return (<Text key={index}>{item.details}</Text>)
        // })
        // return (ret)
        const items = appStore.main.items.value
        const ret = items.map((item, index) => {
            return (
                <span key={index}>
                    <Text>{item.productCode}</Text>
                    <Text>{item.productName}</Text>
                </span>
            )
        })
        return (ret)
    }

    function handleOnAddClick() {
        // const items: any[] = appStore.items.value
        // appStore.items.value = produce(appStore.items.value, ((draft: any[]) => {
        //     appStore.cnt = appStore.cnt + 1
        //     draft.splice(0,0,{details: 'abcd' + (appStore.cnt)})
        //     // draft.push({ details: 'abcd' + (appStore.cnt) })
        //     return (draft)
        // }))

        appStore.main.items.value = produce(appStore.main.items.value, ((draft: any) => {
            appStore.cnt = appStore.cnt + 1
            const ins = { ...itemInstance }
            ins.productCode = 'abcd' + (appStore.cnt)
            ins.productName = 'name' + (appStore.cnt * 10)
            draft.splice(0, 0, ins)
            // draft.splice(0, 0, { name: 'abcd' + (appStore.cnt), address: 'JL' + (appStore.cnt*11) })
            return (draft)
        }))
    }

    function handleAddressChange() {
        appStore.admin.address.value = appStore.admin.address.value + ' ab'
    }
}

export { Comp1 }