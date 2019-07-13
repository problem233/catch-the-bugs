import { css } from '@emotion/core'

import { Action, Actions, State, useContext } from '../Context'

const style = css({
  position: 'relative',
  top: 0,
  zIndex: 1,

  borderRadius: 'calc(var(--width) * 0.005)',
  width: 'var(--field)',
  height: 'var(--field)',

  overflow: 'auto',
  display: 'grid',
  '--size1': 'calc(var(--field) * 0.7)',
  '--size2': 'calc(var(--field) * 0.1)',
  gridTemplateColumns: 'auto var(--size1) auto',
  gridTemplateRows: 'auto var(--size1) var(--size2) auto',
  gridGap: 'var(--gap)',

  textAlign: 'center',
  opacity: 1,
  color: 'hsl(0, 100%, 40%)',
  backgroundColor: 'rgba(0, 0, 0, 50%)',

  transition: 'opacity 0.5s ease',
  userSelect: 'none',

  '&.hidden': {
    opacity: 0,
    pointerEvents: 'none'
  }
})

const withHighest = (state: State, score = state.score) =>
  (a: string, b: string, c: string) =>
    score <= 250 ? a : score <= 500 ? b : c

export default () => {
  const [state, dispatch] = useContext()
  const withCurrHighest = withHighest(state)
  return <div className={state.showDeath ? '' : 'hidden'}
              css={style}
              onClick={() => dispatch(new Action(Actions.end))}>
    <div css={{
      gridArea: '2 / 2 / 3 / 3',
      fontFamily: `KaiTi, BiauKai, 'AR PL UKai CN', serif`,
      fontSize: 'var(--size1)',
      lineHeight: 'var(--size1)'
    }}>{withCurrHighest('蔡', '菜', '死')}</div>
    <div css={{
      gridArea: '3 / 2 / 4 / 3',
      fontFamily: 'serif',
      fontSize: 'var(--size2)',
      lineHeight: 'var(--size2)',
      textAlign: 'justify',
      textAlignLast: 'justify',
      textJustify: 'inter-character',
      textTransform: 'uppercase'
    }}>&nbsp;{withCurrHighest('basketball', 'noob', 'death')}&nbsp;</div>
  </div>
}
