import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}
const initialState: CounterState = { value: 0 }

const counterSlice = createSlice({
  initialState: initialState,
  name: 'counter',
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1
    },
    decrement: (state: CounterState) => {
      state.value -= 1
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

const { decrement, increment, incrementByAmount } = counterSlice.actions
export { decrement, increment, incrementByAmount, counterSlice }
