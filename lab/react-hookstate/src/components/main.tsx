import { Box, Text } from "@chakra-ui/react"
import { appStore, AppStoreType } from '@src/features'
import { useHookstate, State } from '@hookstate/core'
// import { Comp11A, Comp11B } from '@src/components'
import { selectComponent, AppContent } from "@src/components"


function Main() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    const compName = store.layouts.compName.value
    const SelectedComponent:any = selectComponent[compName]

    const CompA = selectComponent['comp11A']
    const CompB = selectComponent['comp11B']
    
    return (<Box m={15}>
        <SelectedComponent />
        <Text>{store.test.value}</Text>
        <AppContent />
        <Text>Main</Text>
        <CompA />
        <CompB />
        {/* <Comp11A />
        <Comp11B /> */}
    </Box>)
}
export { Main }