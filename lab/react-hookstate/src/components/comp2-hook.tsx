import { useHookstate } from "@hookstate/core"
import { appStore } from "../features/app-store"

function useComp2() {
    const store: any = useHookstate(appStore)

    return ({store})
}
export { useComp2 }