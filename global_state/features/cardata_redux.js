import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: {
    dataForSelects: null,
    brand: null,
    model: null,
    engine: null,
    category: null,
    part: null,
    loading: false,
    globalBrand: null,
    globalModel: null,
    globalEngine: null,
    fullPath: null,
    bmBrands: null,
    bmModels: null,
    bmEngines: null,
    isPathShown: true,
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
    setGlobalBrand: (state, action) => {
      if (action.payload === 'Оберіть марку') {
        state.value.globalBrand = null
        state.value.globalModel = null
      } else {
        state.value.globalBrand = action.payload
        state.value.globalModel = null
      }
    },
    setGlobalModel: (state, action) => {
      if (action.payload === 'Оберіть модель') {
        state.value.globalModel = null
      } else {
        state.value.globalModel = action.payload
      }
    },
    changeLinkPath: (state, action) => {
      state.value.fullPath = action.payload
    },
    setBmBrands: (state, action) => {
      state.value.bmBrands = action.payload
    },
    setBmModels: (state, action) => {
      state.value.bmModels = action.payload
    },
    setBmEngines: (state, action) => {
      state.value.bmEngines = action.payload
    },
    setGlobalEngine: (state, action) => {
      state.value.engine = action.payload
    },
    setEngine: (state, action) => {
      state.value.engine = action.payload
    },
    setPathShown: (state, action) => {
      state.value.isPathShown = action.payload
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
  setGlobalBrand,
  setGlobalModel,
  changeLinkPath,
  setBmBrands,
  setBmModels,
  setBmEngines,
  setGlobalEngine,
  setEngine,
  setPathShown,
} = dataSelects.actions
export default dataSelects.reducer
