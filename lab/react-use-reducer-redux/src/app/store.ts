import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter/counter-slice";
import { multiCounterReducer } from "../features/multi-counter/multi-counter-slice";
import { randomMessageReducer } from "../features/misc-redux/misc-redux-slice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    multiCounter: multiCounterReducer,
    miscRedux: randomMessageReducer,
  },
});
