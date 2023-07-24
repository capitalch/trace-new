import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from '../features/counter/counter-slice'

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store, type RootState, type AppDispatch }
