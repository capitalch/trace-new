import { Slice, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state: any) => {
      state.count += 1;
    },
    decrement: (state: any) => {
      state.count -= 1;
    },
  },
});
export const { increment, decrement } = counterSlice.actions;
const { reducer } = counterSlice;
export { reducer as counterReducer };
