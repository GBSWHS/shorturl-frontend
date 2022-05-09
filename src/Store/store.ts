import { configureStore } from '@reduxjs/toolkit'
import longURLReducer from './longURLSlice'
import shortPathReducer from './shortPathSlice'

export const store = configureStore({
  reducer: {
    longURL: longURLReducer,
    shortPath: shortPathReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
