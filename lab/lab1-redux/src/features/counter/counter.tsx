import { RootState, } from '../../app/store'
import { increment, decrement } from './counter-slice'
import { useDispatch, useSelector } from 'react-redux'
function Counter() {
    const dispatch = useDispatch()
    const count = useSelector((state: RootState) => state.counter.value)
    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}

export { Counter }