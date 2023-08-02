import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
