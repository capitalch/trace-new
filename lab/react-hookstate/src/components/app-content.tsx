import { Box, Button } from '@chakra-ui/react'
import { appStore } from '@src/features'
import { useHookstate } from '@hookstate/core'
import { selectComponent } from '@src/components'

function AppContent() {
    const store = useHookstate(appStore)
    const compName = store.layouts.compName.value
    const SelectedComponent:any = selectComponent[compName]

    return (<Box>
        {/* <SelectedComponent /> */}
        <Button onClick={handleLoadA}>Load A</Button>
        <Button onClick={handleLoadB}>Load B</Button>
    </Box>)

    function handleLoadA() {
        store.layouts.compName.set('comp11A')
    }

    function handleLoadB() {
        store.layouts.compName.set('comp11B')
    }
}
export { AppContent }