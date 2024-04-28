import { configureStore } from "@reduxjs/toolkit";
import cars from './slice'

export const store = configureStore({
  reducer: cars,
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>;