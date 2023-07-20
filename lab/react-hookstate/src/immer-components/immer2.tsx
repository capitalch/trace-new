import { Box, Button } from "@chakra-ui/react"
import { produce } from 'immer'
import { useState } from "react"

function Immer2() {
    const [, setRefresh] = useState({})
    return (<Box>
        <Box m={20}>{getItems()}</Box>
        <Button m={10} onClick={handleAdd}>Add</Button>
        <Button m={10} onClick={handleCreateHash}>Create</Button>
    </Box>)

    function handleAdd() {
        CompStore.rows = produce(CompStore.rows, (draft: any[]) => {
            draft.push('abc')
        })
        const rs: any[] = CompStore.rows
        rs.push('abc')

        setRefresh({})
    }

    function getItems() {
        const items = CompStore.rows.map((row: any, index: number) => {
            return (<div key={index}>{row}</div>)
        })
        return (items)
    }

    function handleCreateHash() {
        const obj = {address1: '123', address2: '234', pin:'123'}
        const str = Object.values(obj).join('')
        const ret = getHash(str)
        alert(ret)
    }

    function getHash(s: string) {
        var h = 0, l = s.length, i = 0;
        if (l > 0)
            while (i < l)
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    }
}

export { Immer2 }

const CompStore: any = {
    rows: []
}
// const myArray:string[] = []