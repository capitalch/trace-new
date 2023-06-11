import { Box, Button, Text } from "@chakra-ui/react";
import { appStore } from "../app-store";

function Comp1() {

    return (<Box m={10}>
        <Text>{appStore.admin.name.value}</Text>
        <Button onClick={() => appStore.admin.name.value = appStore.admin.name.value + 'x'}>Set name</Button>
        <Button onClick={() => {            
            appStore.items.value.push({ details: 'abcdef' })
            const items = appStore.items.value
            appStore.items.value = [...items]
            // appStore.refresh.value = !appStore.refresh.value
        }}>Add item</Button>
        {getItems()}
    </Box>)

    function getItems() {
        const items = appStore.items.value
        const ret = items.map((item, index) => {
            return (<Text key={index}>{item.details}</Text>)
        })
        return (ret)
    }
}

export { Comp1 }