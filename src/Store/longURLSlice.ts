import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "./store"

interface LongURLState {
  value: string
}

const initialState: LongURLState = {
  value: ''
}

export const longURLSlice = createSlice({
  name: 'longURL',
  initialState,
  reducers: {
    setLongURL: (state, action: PayloadAction<string>) => {
      state.value = encodeURIComponent(action.payload)
    }
  }
})

export const { setLongURL } = longURLSlice.actions
export const selectLongURL = (state: RootState) => state.longURL.value
export default longURLSlice.reducer
