import range from 'lodash.range'
import React from 'react'

import { Action, Actions, State } from './Context'

const genField = (prevBugs: number[], bugs: number) => {
  let arr: number[] = [] // tslint:disable-line: no-let prefer-const
  range(0, bugs).forEach(_ => {
    let n: number // tslint:disable-line: no-let
    do n = Math.floor(Math.random() * 64)
    while (arr.includes(n) || prevBugs.includes(n))
    arr.push(n) // tslint:disable-line: no-array-mutation
  })
  return arr
}

export const difficulty = (interval: number) => 100 - (interval - 200) / 18

const score =
  (state: State, newState: State,
   score = Math.sqrt(state.caught) * difficulty(state.interval)) => ({
    ...newState,
    highest: Math.max(state.highest, score),
    highestCaught: Math.max(state.highestCaught, newState.caught),
    lowestInterval: Math.min(state.lowestInterval, newState.interval),
    score
  })

type Reducer = React.Reducer<State, Action>

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case Actions.start:
      return { ...state,
        bugs: genField(state.bugs, 8),
        inGame: true
      }
    case Actions.catch:
      if (! state.inGame) return state
      else return score(state, { ...state,
        bugs: state.bugs.filter(block => block !== action.block),
        caught: state.caught + 1,
        dying: state.dying > 1 ? state.dying - 1 : 0
      })
    case Actions.refresh:
      return (! state.inGame) ? state
           : (state.dying >= 3) ? score(state, { ...state,
               inGame: false,
               showDeath: true
             })
           : {
               ...state,
               bugs: genField(state.bugs, 8),
               dying: state.dying + 1
             }
    case Actions.diffInc:
      return (! state.inGame) ? state : { ...state,
        interval: state.interval - Number(state.interval > 200)
      }
    case Actions.stop:
      return { ...score(state, state),
        bugs: [],
        caught: 0,
        dying: 1,
        interval: 2000,
        inGame: false,
        score: 0
      }
    case Actions.end:
      return { ...state,
        bugs: [],
        caught: 0,
        dying: 1,
        interval: 2000,
        score: 0,
        showDeath: false
      }
  }
}

export default reducer
