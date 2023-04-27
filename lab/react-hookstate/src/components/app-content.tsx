import { Box, Button } from '@chakra-ui/react'
import { appStore } from '@src/features'
import { useHookstate } from '@hookstate/core'
import { selectComponent } from '@src/components'

function AppContent() {
    const store: any = useHookstate(appStore)
    const compName = appStore.layouts.compName.value
    const SelectedComponent: any = selectComponent[compName]

    return (<Box>
        <Button onClick={handleLoadA}>Load A</Button>
        <Button onClick={handleLoadB}>Load B</Button>
        <Button onClick={handleLoadC}>Load C</Button>
    </Box>)

    function handleLoadA() {
        appStore.layouts.compName.set('comp11A')
    }

    function handleLoadB() {
        // store.layouts.compName.set('comp11B')
        appStore.layouts.compName.set('comp11B')
        // store.layouts.selectedComponent.set(()=><>ABC</>)
    }

    function handleLoadC() {
        //   store.layouts.compName.set('comp11C')
        store.layouts.set((lay: any) => {
            lay.comp = ()=><>XYZ</>
            return(lay)
        })
    }
}
export { AppContent }