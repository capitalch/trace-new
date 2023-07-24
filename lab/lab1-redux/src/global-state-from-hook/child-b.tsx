import { useGlobalState } from "./global-state-hook"

function ChildB() {
    const { count, setCount } = useGlobalState()

    return (<div>
        <span>Child B</span>
        <h2>{count}</h2>
        <button onClick={handleIncrement} className="btn btn-primary">Increment</button>
    </div>)

    function handleIncrement() {
        setCount(count + 1)
    }
}
export { ChildB }