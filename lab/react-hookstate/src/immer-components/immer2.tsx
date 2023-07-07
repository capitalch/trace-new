import { Box, Button } from "@chakra-ui/react"
import { produce } from 'immer'
import { useState } from "react"

function Immer2() {
const [, setRefresh] = useState({})
    return (<Box>
        <Box m={20}>{getItems()}</Box>
        <Button m={10} onClick={handleAdd}>Add</Button>
    </Box>)

    function handleAdd() {
        CompStore.rows = produce(CompStore.rows, (draft: any[]) => {
            draft.push('abc')
        })
        const rs:any[] = CompStore.rows
        rs.push('abc')

        setRefresh({})
    }

    function getItems() {
        const items = CompStore.rows.map((row: any, index: number) => {
            return (<div key={index}>{row}</div>)
        })
        return (items)
    }
}

export { Immer2 }

const CompStore: any = {
    rows: []
}
// const myArray:string[] = []