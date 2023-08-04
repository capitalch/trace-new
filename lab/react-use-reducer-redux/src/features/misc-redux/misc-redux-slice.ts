import { Slice, createSlice } from "@reduxjs/toolkit";

const miscReduxSlice: Slice = createSlice({
  name: "miscRedux",
  initialState: {
    randomMessage: "xxx",
  },
  reducers: {
    sendRandomMessageAction: (state: any, data) => {
      state.randomMessage = data.payload;
    },
  },
});

const {reducer} = miscReduxSlice
const {sendRandomMessageAction} = miscReduxSlice.actions

export {reducer as randomMessageReducer, sendRandomMessageAction}