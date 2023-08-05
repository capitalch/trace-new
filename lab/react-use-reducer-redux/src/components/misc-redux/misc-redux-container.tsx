import { RandomMessageEmitter, RandomMessageViewer } from "./random-message"
import { ReduxAsync } from "./redux-async"
import { ButtonAddRandomData, ButtonChangeRandomData, ButtonResetRandomData, ReduxList } from "./redux-list"


function MiscReduxContainer() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row m-10 align-middle gap-5">
                <RandomMessageViewer />
                <RandomMessageEmitter />
                <ButtonAddRandomData />
                <ButtonChangeRandomData />
                <ButtonResetRandomData />
                <ReduxList />
            </div>
            <ReduxAsync />
        </div>)
}
export { MiscReduxContainer }
