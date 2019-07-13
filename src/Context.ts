import assert from 'assert'
import React, { createContext } from 'react'

export type State = typeof initialState

export const initialState = {
  bugs: [] as number[],
  caught: 0,
  dying: 1,
  highest: 0,
  highestCaught: 0,
  inGame: false,
  interval: 2000,
  lowestInterval: 2000,
  score: 0,
  showDeath: false
}

export enum Actions {
  start, catch, refresh, diffInc, stop, end
}

export class Action {
  constructor (public type: Actions, public block: number = -1) {
    if (type === Actions.catch) assert(block >= 0 && block < 64)
  }
}

export const State = createContext<State>(null as any)
export const Dispatch = createContext<React.Dispatch<Action>>(null as any)

export const useContext = (): [State, React.Dispatch<Action>] =>
  [React.useContext(State), React.useContext(Dispatch)]
