import { useReducer } from "react"
import { produce } from 'immer'

function ReducerComp1() {
    const initialState = {
        count: 0
    }
    const reducer = (state: any, action: any) => {
        let ret: any

        if (action.type === 'incr') {
            ret = produce(state, (draft: any) => {
                draft.count = draft.count + 1
            })
        }
        if (action.type === 'decr') {
            ret = produce(state, (draft: any) => {
                draft.count = draft.count - 1
            })
        }
        return (ret)
    }
    const [state, dispatch]: any = useReducer(reducer, initialState)

    return (<div>
        <p>Count: {state.count}</p>
        <p>
            <button onClick={handlePlus}>+</button>
            <button onClick={handleMinus}>-</button>
        </p>
    </div>)

    function handlePlus() {
        dispatch({ type: 'incr' })
    }

    function handleMinus() {
        dispatch({ type: 'decr' })
    }
}

export { ReducerComp1 }