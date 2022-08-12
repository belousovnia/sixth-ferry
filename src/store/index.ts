import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";

const rootReducer = combineReducers( {
  main: mainSlice,
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;