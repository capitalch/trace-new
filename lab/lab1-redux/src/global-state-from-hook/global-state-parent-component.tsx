import { ChildA } from "./child-a"
import { ChildB } from "./child-b"
import { useGlobalState } from "./global-state-hook"

function GlobalStateParentComponent() {
    const { count, setCount } = useGlobalState()
    return (<div><span>
        This is parent
    </span>
        <h2>{count}</h2>
        <button onClick={handleIncrement} className="btn btn-primary">Increment</button>
        <ChildA />
        <ChildB />
    </div>)

    function handleIncrement() {
        setCount(count + 1)
    }
}
export { GlobalStateParentComponent }