import {
  Action,
  Slice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContent = createAsyncThunk(
  "miscRedux/fetchContent",
  async () => {
    const res = await axios("https://jsonplaceholder.typicode.com/photos");
    const data = await res.data;
    return data;
  }
);

const initialState = {
  randomMessage: "xxx",
  items: [{ name: "---select---", value: "" }],
  isLoading: false,
  error: null,
  contents: [],
};

const miscReduxSlice: Slice = createSlice({
  name: "miscRedux",
  initialState: initialState,
  reducers: {
    sendRandomMessageAction: (state: any, action: any) => {
      state.randomMessage = action.payload;
    },
    populateItemsAction: (state: any, action) => {
      state.items.push(action.payload);
    },
    changeItemsAction: (state: any, action) => {
      state.items = action.payload;
    },
    resetItemsAction: (state: any, action) => {
      state.items = [{ name: "---select---", value: "" }];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(fetchContent.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.contents = action.payload;
    });

    builder.addCase(fetchContent.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
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

export function selectRandomItems(state: any) {
  const items = state.miscRedux.items;
  // const itemsMap = items.map((x:any)=>x)
  // return itemsMap;
  return(items)
}

export const selectorRandomItems = createSelector(selectRandomItems,(items:any)=>items.map((x:any)=>x))
