import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../features/counter/counter-slice'

function ReduxCounter() {
    const count = useSelector((state: any) => state.counter.count)
    const dispatch = useDispatch()
    return (<div style={{ margin: 10 }}>
        <p>Count: {count}</p>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
    </div>)
}
export { ReduxCounter }