import { Comp1ForTab1, Comp2ForTab2 } from "./comp1-for-tabs"
import { NTabs, NTab } from "./n-tabs"

function NuTabsUsage() {
    return (

        <NTabs>
            <NTab label="Tab1">
                <Comp1ForTab1 />
            </NTab>
            <NTab label='Tab2'>
                <Comp2ForTab2 />
            </NTab>
        </NTabs>

    )
}
export { NuTabsUsage }
