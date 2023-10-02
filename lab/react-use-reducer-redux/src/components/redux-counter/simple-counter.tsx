import { useSelector } from "react-redux"

function SimpleCounter() {
    const count = useSelector((state: any) => {
        return state.counter.count
    })
    return (<div>
        Simple Count: {count}
    </div>)
}
export { SimpleCounter }