import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state:any)=>{
            state.count= state.count + 1
        },
        decrement: (state:any)=>{
            state.count = state.count - 1
        }
    }
})

export const {increment, decrement} = counterSlice.actions

export default counterSlice.reducer