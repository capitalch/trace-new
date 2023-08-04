import { Slice, createSlice } from '@reduxjs/toolkit'

const miscReduxSlice: Slice = createSlice({
  name: 'miscRedux',
  initialState: {
    randomMessage: 'xxx',
    items: [{ name: '---select---', value: '' }]
  },
  reducers: {
    sendRandomMessageAction: (state: any, data) => {
      state.randomMessage = data.payload
    },
    populateItemsAction: (state: any, data) => {
      state.items.push(data.payload)
    },
    changeItemsAction: (state: any, data) => {
      state.items = data.payload
    },
    resetItemsAction: (state: any, data) => {
      state.items = [{ name: '---select---', value: '' }]
    }
  }
})

const { reducer } = miscReduxSlice
const {
  changeItemsAction,
  populateItemsAction,
  resetItemsAction,
  sendRandomMessageAction
} = miscReduxSlice.actions

export {
  changeItemsAction,
  reducer as randomMessageReducer,
  populateItemsAction,
  resetItemsAction,
  sendRandomMessageAction
}
