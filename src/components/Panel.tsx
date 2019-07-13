import { css } from '@emotion/core'
import { useEffect } from 'react'

import { Action, Actions, useContext } from '../Context'
import { difficulty } from '../reducer'
import Button from './Button'

const style = css({
  width: 'var(--field)',
  display: 'grid',
  gridGap: 'var(--gap)',
  '--row': 'calc((var(--panel) - 4 * var(--gap)) / 5)',
  gridTemplateColumns: 'var(--panel) auto auto',
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
  gridArea: '1 / 2 / 3 / 4',
  '--title': 'calc(var(--row) * 2 + var(--gap))',
  fontSize: 'var(--title)',
  lineHeight: 'var(--title)'
})

export default () => {
  const [state, dispatch] = useContext()
  const clickHandler = () => {
    if (state.inGame) dispatch(new Action(Actions.stop))
    else dispatch(new Action(Actions.start))
  }
  useEffect(() => {
    if (state.bugs.length === 8)
      setTimeout(() => dispatch(new Action(Actions.refresh)), state.interval)
  }, [state.bugs])
  useEffect(() => {
    if (state.inGame)
      setInterval(() => dispatch(new Action(Actions.diffInc)), 50)
    else {
      clearTimeout()
      localStorage.setItem('record', JSON.stringify({
        highest: state.highest,
        highestCaught: state.highestCaught,
        lowestInterval: state.lowestInterval
      }))
    }
  }, [state.inGame])
  return <div css={style}>
    <Button css={btnStyle} onClick={clickHandler}>
      {state.inGame ? '⏸️' : '▶️'}
    </Button>
    <h1 css={titleStyle}>Catch the Bugs!</h1>
    <div css={{ gridArea: '3 / 2 / 4 / 3' }}>
      Caught: <span>{state.caught}</span>
    </div>
    <div css={{ gridArea: '3 / 3 / 4 / 4' }}>
      Highest: <span>{state.highestCaught}</span>
    </div>
    <div css={{ gridArea: '4 / 2 / 5 / 3' }}>
      Difficulty: <span>{difficulty(state.interval).toFixed(2)}</span>
    </div>
    <div css={{ gridArea: '4 / 3 / 5 / 4' }}>
      Highest: <span>{difficulty(state.lowestInterval).toFixed(2)}</span>
    </div>
    <div css={{ gridArea: '5 / 2 / 6 / 3' }}>
      Score: <span>{state.score.toFixed(2)}</span>
    </div>
    <div css={{ gridArea: '5 / 3 / 6 / 4' }}>
      Highest: <span>{state.highest.toFixed(2)}</span>
    </div>
  </div>
}
