import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, nestedIncrement, nestedDecrement } from './counter-slice'
import { store } from '../../app/store'
import { useEffect } from 'react'
import { SimpleCounter } from './simple-counter'
import { NestedCounter } from './nested-counter'

function ReduxCounter() {
    const dispatch = useDispatch()

    return (<div style={{ margin: 10 }}>
        <div className='flex gap-2'>
            <SimpleCounter />
            <NestedCounter />
        </div>
        <div className='flex gap-2 my-2'>
            <button className='bg-slate-200 rounded-md px-2 py-1' onClick={() => dispatch(increment())}>+ Add</button>
            <button className='bg-slate-200 rounded-md px-2 py-1' onClick={() => dispatch(decrement())}>- Minus</button>
        </div>
        <div className='flex gap-2 my-2'>
            <button className='bg-slate-200 rounded-md px-2 py-1' onClick={() => dispatch(nestedIncrement())}>+ Add Nested</button>
            <button className='bg-slate-200 rounded-md px-2 py-1' onClick={() => dispatch(nestedDecrement())}>- Minus Nested</button>
        </div>
    </div>)
}
export { ReduxCounter }