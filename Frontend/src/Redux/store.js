import { configureStore } from "@reduxjs/toolkit";

import problemsReducer from "./problemSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    problems: problemsReducer,
    profile: profileReducer,
  },
});