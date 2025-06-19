import { configureStore } from "@reduxjs/toolkit";

//reducers
import appStateReducer from "./appState/appStateSlice";
import userReducer from "./user/userSlice";

//import RTKQ service

import { historyMateApi } from "../services.ts/api";

export const store = configureStore({
  reducer: {
    // Add the generated RTKQ service reducer as a specific top-level slice
    [historyMateApi.reducerPath]: historyMateApi.reducer,
    user: userReducer,
    appState: appStateReducer,
  },
  // Add  api middleware to enable caching, invalidation, polling,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(historyMateApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
