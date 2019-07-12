import { css } from '@emotion/core'
import { useContext } from 'react'

import { Dispatch, State } from '../Context'
import Button from './Button'

export interface Props {
  no: number
}

const style = css({
  '--font-size': 'calc(var(--block) - 2 * var(--btn-padding))',
  fontSize: 'var(--font-size)',
  lineHeight: 'var(--font-size)'
})

export default ({ no }: Props) => {
  const state = useContext(State)
  const dispatch = useContext(Dispatch)
  const bug = state.bugs.includes(no)
  const clickHandler = bug
                     ? () => dispatch({
                         bugs: state.bugs.filter(n => n !== no),
                         score: state.score + 1
                       })
                     : () => {}
  return <Button css={style} onClick={clickHandler}>{bug && '🐛'}</Button>
}
