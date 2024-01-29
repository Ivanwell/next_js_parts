import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart_redux'
import dataSelectscartReducer from './features/cardata_redux'

export const store = configureStore({
  reducer: { cartReducer, dataSelectscartReducer },
})
