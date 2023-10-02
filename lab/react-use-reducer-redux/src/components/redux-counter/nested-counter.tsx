import { useSelector } from "react-redux"

function NestedCounter() {
    const count = useSelector((state: any) => {
        return state.counter.nestedCount.count
    })

    return (<div>
        Nested Count: {count}
    </div>)
}
export { NestedCounter }