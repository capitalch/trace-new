import { useGlobalState } from "./global-state-hook"

function ChildA() {
    const { count, setCount } = useGlobalState()

    return (<div>
        <span>Child A</span>
        <h2>{count}</h2>
        <button onClick={handleIncrement} className="btn btn-primary">Increment</button>
    </div>)

    function handleIncrement() {
        setCount(count + 1)
    }
}
export { ChildA }