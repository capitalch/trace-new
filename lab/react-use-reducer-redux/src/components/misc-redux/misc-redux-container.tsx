import { RandomMessageEmitter, RandomMessageViewer } from "./random-message"
import { ButtonAddRandomData, ButtonChangeRandomData, ButtonResetRandomData, ReduxList } from "./redux-list"


function MiscReduxContainer() {
    return (<div className="flex flex-row m-10 align-middle gap-5">
        <RandomMessageViewer />
        <RandomMessageEmitter />
        <ButtonAddRandomData />
        <ButtonChangeRandomData />
        <ButtonResetRandomData />
        <ReduxList />
    </div>)
}
export { MiscReduxContainer }
