import { Box } from "@chakra-ui/react"
import { Comp1Level2 } from "./comp1-level2"

function Comp1Level1() {
    return (<Box m={10}>
        Comp1 level1
        <Comp1Level2 />
</Box>)
}
export { Comp1Level1 }