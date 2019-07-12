import React, { createContext } from 'react'

export type Reducer = React.Reducer<State, Partial<State>>

export const reducer: Reducer = (state, diff) => ({ ...state, ...diff })

export interface State {
  bugs: number[],
  timeout: [number, NodeJS.Timeout] | null,
  score: number
}

export const initialState: State = {
  bugs: [],
  timeout: null,
  score: 0
}

export const State = createContext<State>(null as any)
export const Dispatch = createContext<React.Dispatch<Partial<State>>>(null as any)
