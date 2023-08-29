import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../features/counter/counter-slice'
import { store } from '../app/store'
import { useEffect } from 'react'

function ReduxCounter() {
    const myStore: any = store
    const state = store.getState()
    const counterState = state.counter
    const count = useSelector((state: any) => state.counter)
    const dispatch = useDispatch()

    useEffect(() => {
        store.subscribe(() => { 
            console.log(state) 
        })
    }, [])

    return (<div style={{ margin: 10 }}>
        <p>Count: {count.count}</p>
        <button onClick={() => dispatch(increment())}>+ Add</button>
        <button onClick={() => dispatch(decrement())}>- Minus</button>
        <button onClick={handleShowStoreValue} className='ml-2 bg-slate-100 p-2 rounded-md hover:bg-slate-200'>Show store value</button>
    </div>)

    function handleShowStoreValue() {
        alert(counterState.count)
    }
}
export { ReduxCounter }