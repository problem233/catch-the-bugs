import { hot } from 'react-hot-loader/root'

import { css } from '@emotion/core'
import { useReducer } from 'react'

import Death from './components/Death'
import Field from './components/Field'
import Panel from './components/Panel'
import { Dispatch, initialState, State } from './Context'
import { reducer } from "./reducer"

const style = css({
  margin: 'auto',

  '--width': '80vh',
  '--height': 'calc(var(--width) * 5 / 4)',
  '--field': 'calc(var(--width) - 2 * var(--padding))',
  '--panel': 'calc(var(--height) - 2 * var(--padding) - var(--field) - var(--gap))',
  '--gap': 'calc(var(--field) * 0.1 / 7)',
  width: 'var(--width)',
  height: 'var(--height)',
  boxSizing: 'border-box',

  '--padding': 'calc(var(--width) / 40)',
  padding: 'var(--padding)',
  display: 'grid',
  gridGap: 'var(--gap)',
  gridTemplateRows: 'auto var(--field)',

  backgroundColor: 'hsl(120, 100%, 80%)',
  color: 'hsl(120, 100%, 5%)',
  fontFamily: 'sans-serif',
  boxShadow: '0 0 var(--gap) hsl(120, 100%, 40%)',

  '@media (max-aspect-ratio: 4/5)': {
    '--width': '100vw'
  }
})

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...JSON.parse(localStorage.getItem('record') || '{}')
  })
  return <div css={style}>
    <Dispatch.Provider value={dispatch}>
      <State.Provider value={state}>
        <Panel />
        <div>
          <Field />
          <Death />
        </div>
      </State.Provider>
    </Dispatch.Provider>
  </div>
}

export default hot(App)
