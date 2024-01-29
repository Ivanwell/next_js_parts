import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: {
    dataForSelects: null,
    brand: null,
    model: null,
    category: null,
    part: null,
    loading: false,
  },
}

export const dataSelects = createSlice({
  name: 'dataSelects',
  initialState: initialState,
  reducers: {
    setDataForForm: (state, action) => {
      state.value.dataForSelects = action.payload
    },
    setBrand: (state, action) => {
      if (action.payload === 'Оберіть марку') {
        state.value.brand = null
        state.value.model = null
        state.value.category = null
        state.value.part = null
      } else {
        state.value.brand = action.payload
      }
    },
    setModel: (state, action) => {
      if (action.payload === 'Оберіть модель') {
        state.value.model = null
        state.value.category = null
        state.value.part = null
      } else {
        state.value.model = action.payload
      }
    },
    setCategory: (state, action) => {
      if (action.payload === 'Оберіть категорію') {
        state.value.category = null
        state.value.part = null
      } else {
        state.value.category = action.payload
      }
    },
    setPart: (state, action) => {
      if (action.payload === 'Оберіть запчастину') {
        state.value.part = null
      } else {
        state.value.part = action.payload
      }
    },
    setLoadingData: (state, action) => {
      state.value.loading = action.payload
    },
  },
})

export const {
  setDataForForm,
  setBrand,
  setModel,
  setCategory,
  setPart,
  setLoadingData,
} = dataSelects.actions
export default dataSelects.reducer
