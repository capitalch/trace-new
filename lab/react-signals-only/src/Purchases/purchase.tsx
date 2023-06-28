import { Box, Button, Input, Text } from "@chakra-ui/react"
import { LineItemType, getInstance, lineItemInstance, purchaseStore } from "./purchase-store"
import { produce } from "immer"
import { signal } from "@preact/signals-react"

function Purchase() {
    return (<Box display='flex' flexDirection='column'>
        {/* <Input type="text" value={purchaseStore.count.value} onChange={(e:any)=>purchaseStore.count.value = e.target.value} /> */}
        <Box display='flex' flexDirection='row'>
            <Button size='sm' width={60} onClick={handleAddLineItem}>Add</Button>
            <Button size='sm' width={80} onClick={handleSubmit}>Submit</Button>
        </Box>
        {getLineItems()}
    </Box>)

    function getLineItems() {
        const lineItems: LineItemType[] = purchaseStore.main.lineItems.value
        const retValues = lineItems.map((item, index) => {
            return (<LineItem key={index} item={item} index={index} />)
        })
        return (retValues)
    }

    function handleAddLineItem() {
        purchaseStore.main.lineItems.value = produce(purchaseStore.main.lineItems.value, (draft: any[]) => {
            draft.splice(0, 0, {
                index: 0,
                productCode: signal(''),
                hsn: signal(0)
            })
            // draft.push({
            // index: 0,
            // productCode: signal(''),
            // hsn: signal(0)
            // })
            return (draft)
        })
    }

    function handleSubmit() {
        const lineItemsValue = purchaseStore.main.lineItems.value
        const out: any[] = lineItemsValue.map((lineItem:any) =>{
            return({
                index: lineItem.index.value,
                productCode: lineItem.productCode.value,
                hsn: lineItem.hsn.value
            })
        })
        console.log(out)
    }

}
export { Purchase }

function LineItem({ item, index }: { item: LineItemType, index: number }) {
    return (<Box display='flex' m={10} >
        {/* Index */}
        <Text m={4}>{index + 1}</Text>

        {/* productCode */}
        <Input type="text" ml={5} name="productCode" value={item.productCode.value || ''} onChange={handleOnChangeProductCode} />

        {/* hsn */}
        <Input type="text" ml={5} name="hsn" value={item.hsn.value || ''} onChange={handleOnChangeHsn} />

        <Button size='sm' onClick={() => {
            handleAddLineItem(index)
        }}>Add</Button>

    </Box>)

    function handleOnChangeProductCode(e: any) {
        item.productCode.value = e.target.value
    }

    function handleOnChangeHsn(e: any) {
        item.hsn.value = e.target.value
    }

    function handleAddLineItem(index: number) {
        purchaseStore.main.lineItems.value = produce(purchaseStore.main.lineItems.value, (draft: any[]) => {
            draft.splice(index + 1, 0, getInstance())
            return (draft)
        })
    }
}

// {
//     index: 0,
//     productCode: signal(''),
//     hsn: signal(0)
// }
