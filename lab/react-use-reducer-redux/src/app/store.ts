import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../components/redux-counter/counter-slice'
import { multiCounterReducer } from '../features/multi-counter/multi-counter-slice'
import { randomMessageReducer } from '../features/misc-redux/misc-redux-slice'
import { dynamicMenuReducer } from '../features/dynamic-menu/dynamic-menu-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    multiCounter: multiCounterReducer,
    miscRedux: randomMessageReducer,
    dynamicMenu: dynamicMenuReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
