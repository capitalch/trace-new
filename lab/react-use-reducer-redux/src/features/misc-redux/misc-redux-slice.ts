import { Action, Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContent = createAsyncThunk(
  "miscRedux/fetchContent",
  async () => {
    const res = await axios("https://jsonplaceholder.typicode.com/photos");
    const data = await res.data;
    return data;
  }
);

const miscReduxSlice: Slice = createSlice({
  name: "miscRedux",
  initialState: {
    randomMessage: "xxx",
    items: [{ name: "---select---", value: "" }],
    isLoading: false,
    error: null,
    contents: [],
  },
  reducers: {
    sendRandomMessageAction: (state: any, data) => {
      state.randomMessage = data.payload;
    },
    populateItemsAction: (state: any, data) => {
      state.items.push(data.payload);
    },
    changeItemsAction: (state: any, data) => {
      state.items = data.payload;
    },
    resetItemsAction: (state: any, data) => {
      state.items = [{ name: "---select---", value: "" }];
    },
  },
  
  // extraReducers: (builder) => {
  //   builder.addCase(fetchContent.pending, (state: any) => {
  //     state.isLoading = true;
  //   });

  //   builder.addCase(fetchContent.fulfilled, (state: any, action: any) => {
  //     state.isLoading = false;
  //     state.contents = action.payload;
  //   });

  //   builder.addCase(fetchContent.rejected, (state: any, action: any) => {
  //     state.isLoading = false;
  //     state.error = action.error.message;
  //   });
  // },
});

const { reducer } = miscReduxSlice;
const {
  changeItemsAction,
  populateItemsAction,
  resetItemsAction,
  sendRandomMessageAction,
} = miscReduxSlice.actions;

export {
  changeItemsAction,
  reducer as randomMessageReducer,
  populateItemsAction,
  resetItemsAction,
  sendRandomMessageAction,
};
