import { css } from '@emotion/core'

import { Action, Actions, useContext } from '../Context'
import Button from './Button'

export interface Props {
  block: number
}

const style = css({
  '--font-size': 'calc(var(--block) - 2 * var(--btn-padding))',
  fontSize: 'var(--font-size)',
  lineHeight: 'var(--font-size)'
})

export default ({ block }: Props) => {
  const [state, dispatch] = useContext()
  const bug = state.bugs.includes(block)
  const clickHandler = bug
                     ? () => dispatch(new Action(Actions.catch, block))
                     : () => {}
  return <Button css={style} onClick={clickHandler}>{bug && '🐛'}</Button>
}
