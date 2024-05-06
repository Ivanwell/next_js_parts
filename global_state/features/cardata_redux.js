import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: {
    fullPath: null,
    selectedCar: '',
  },
}

export const dataSelects = createSlice({
  name: 'dataSelects',
  initialState: initialState,
  reducers: {
    changeLinkPath: (state, action) => {
      if (!action.payload) {
        state.value.fullPath = null
      } else {
        state.value.fullPath = [
          {
            eng: '',
            ukr: 'Автозапчастини',
          },
          ...action.payload,
        ]
      }
    },
    setSelectedCar: (state, action) => {
      state.value.selectedCar = action.payload
    },
  },
})

export const { changeLinkPath, setSelectedCar } = dataSelects.actions
export default dataSelects.reducer
