'use client'

import { store } from './global_state'
import { Provider } from 'react-redux'
import React from 'react'

export function ReduxProvider({ children }) {
  return <Provider store={store}> {children} </Provider>
}
