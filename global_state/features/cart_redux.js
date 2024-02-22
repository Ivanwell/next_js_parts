import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as ga from '../../components/lib/gtag'

const initialState = {
  value: {
    list: [],
    total: 0,
    sum: 0,
    openedCheckoutProposal: false,
    imgCont: {
      visibility: false,
      image: null,
    },
  },
}

export const cart = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    adddToCart: (state, action) => {
      const check = state.value.list.findIndex(
        item => item.article === action.payload.article
      )
      if (check !== -1) {
        state.value.list[check].quantity += action.payload.quantity
      } else {
        state.value.list.push(action.payload)
        ga.event({
          action: 'add_to_cart',
        })
        state.value.openedCheckoutProposal = true
      }
      state.value.total += action.payload.quantity
      state.value.sum += action.payload.price * action.payload.quantity
    },
    removeOneItemRe: (state, action) => {
      const check = state.value.list.findIndex(
        item => item.article === action.payload.article
      )
      if (check === -1) {
        return
      } else {
        if (state.value.list[check].quantity === 1) {
          state.value.list.splice(check, 1)
        } else {
          state.value.list[check].quantity -= 1
        }
        state.value.total -= 1
        state.value.sum -= action.payload.price
      }
    },
    removeWholeItem: (state, action) => {
      const check = state.value.list.findIndex(
        item => item.article === action.payload.article
      )
      if (check === -1) {
        return
      } else {
        state.value.total -= action.payload.quantity
        state.value.sum -= action.payload.price * action.payload.quantity
        state.value.list.splice(check, 1)
      }
    },
    handleOpenPropToCheck: (state, action) => {
      state.value.openedCheckoutProposal = action.payload
    },
    deleteAllItems: (state, action) => {
      ;(state.value.total = 0), (state.value.sum = 0), (state.value.list = [])
    },
    showFullImage: (state, action) => {
      state.value.imgCont = {
        visibility: true,
        image: action.payload,
      }
    },
    hideFullImage: (state, action) => {
      state.value.imgCont = {
        visibility: false,
        image: null,
      }
    },
  },
})

export const {
  adddToCart,
  removeOneItemRe,
  handleOpenPropToCheck,
  deleteAllItems,
  showFullImage,
  hideFullImage,
} = cart.actions
export default cart.reducer
