import { Box, Button, Text } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

function UnderstandUseCallback(){
const [, setRefresh] = useState({})
const loadDataCbk = useCallback(loadData, [])
// loadDataCbk()

useEffect(()=>{
    loadDataCbk()
},[loadDataCbk])

function loadData(){
    setTimeout(()=>{
        console.log('Loaded data')
    }, 2000)
}
return(<Box m={10}>
    <Text> Understand useCallback</Text>
    <Button onClick={()=>setRefresh({})}>Refresh</Button>
</Box>)
}
export{UnderstandUseCallback}