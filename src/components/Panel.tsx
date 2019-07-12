import { css } from '@emotion/core'
import range from 'lodash.range'
import { useContext } from 'react'

import { Dispatch, State } from '../Context'
import Button from './Button'

const style = css({
  width: 'var(--field)',
  display: 'grid',
  gridGap: 'var(--gap)',
  '--row': 'calc((var(--panel) - 4 * var(--gap)) / 5)',
  gridTemplateColumns: 'var(--panel) auto',
  gridTemplateRows: 'var(--row) var(--row) var(--row) var(--row) var(--row)',
  fontSize: 'var(--row)',
  lineHeight: 'var(--row)',
  userSelect: 'none',
  '& span': { color: 'hsl(120, 100%, 30%)' }
})

const btnStyle = css({
  gridArea: '1 / 1 / 6 / 2',
  fontSize: 'calc(var(--panel) * 0.6)',
  lineHeight: 'calc(var(--panel) - 2 * var(--btn-padding))'
})

const titleStyle = css({
  margin: 0,
  gridArea: '1 / 2 / 3 / 3',
  '--title': 'calc(var(--row) * 2 + var(--gap))',
  fontSize: 'var(--title)',
  lineHeight: 'var(--title)'
})

const genField = (bugs: number) => {
  let arr: number[] = [] // tslint:disable-line: no-let prefer-const
  range(0, bugs).forEach(_ => {
    let n: number // tslint:disable-line: no-let
    do n = Math.floor(Math.random() * 64)
    while (arr.includes(n))
    arr.push(n) // tslint:disable-line: no-array-mutation
  })
  return arr
}

export default () => {
  const state = useContext(State)
  const dispatch = useContext(Dispatch)
  const createTimeout = () => dispatch({
    timeout: [Date.now(), setTimeout(createTimeout, 1000)],
    bugs: genField(8)
  })
  const clickHandler = () => {
    if (state.timeout) {
      clearTimeout(state.timeout[1])
      dispatch({ timeout: null, bugs: [] })
    } else {
      dispatch({ score: 0 })
      createTimeout()
    }
  }
  return <div css={style}>
    <Button css={btnStyle} onClick={clickHandler}>
      {state.timeout ? '⏸️' : '▶️'}
    </Button>
    <h1 css={titleStyle}>Catch the Bugs!</h1>
    <div css={{ gridArea: '3 / 2 / 4 / 3' }}>
      Score: <span>{state.score}</span>
    </div>
    <div css={{ gridArea: '4 / 2 / 5 / 3' }}></div>
    <div css={{ gridArea: '5 / 2 / 6 / 3' }}></div>
  </div>
}
