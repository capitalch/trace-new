import { Slice, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    nestedCount: {
      count: 0,
    },
  },
  reducers: {
    increment: (state: any) => {
      state.count += 1;
    },
    decrement: (state: any) => {
      state.count -= 1;
    },
    nestedIncrement: (state: any) => {
      state.nestedCount.count += 1;
    },
    nestedDecrement: (state: any) => {
      state.nestedCount.count -= 1;
    },
  },
});
export const { increment, decrement, nestedIncrement, nestedDecrement } = counterSlice.actions;
const { reducer } = counterSlice;
export { reducer as counterReducer };
