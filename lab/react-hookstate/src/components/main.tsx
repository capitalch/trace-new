import { Box, Text } from "@chakra-ui/react"
// import { Comp11A, Comp11B } from '@src/components'
import { selectComponent } from "@src/components"

function Main() {
    const CompA = selectComponent['comp11A']
    const CompB = selectComponent['comp11B']

    return (<Box>
        <Text>Main</Text>
        <CompA />
        <CompB />
        {/* <Comp11A />
        <Comp11B /> */}
    </Box>)
}
export { Main }