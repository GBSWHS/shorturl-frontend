import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "./store"

interface ShortPathState {
  value: string
}

const initialState: ShortPathState = {
  value: ''
}

export const shortPathSlice = createSlice({
  name: 'shortPath',
  initialState,
  reducers: {
    setShortPath: (state, action: PayloadAction<string>) => {
      state.value = encodeURIComponent('/' + action.payload)
    }
  }
})

export const { setShortPath } = shortPathSlice.actions
export const selectShortPath = (state: RootState) => state.shortPath.value
export default shortPathSlice.reducer
