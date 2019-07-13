import { css } from '@emotion/core'
import { HTMLAttributes } from 'react'

const style = css({
  boxSizing: 'border-box',
  borderRadius: 'calc(var(--width) * 0.005)',
  '--btn-padding': 'calc(var(--width) * 0.01)',
  padding: 'var(--btn-padding)',
  backgroundColor: 'hsl(120, 60%, 40%)',
  boxShadow: '0 0 var(--gap) hsl(120, 60%, 40%)',
  textAlign: 'center',
  userSelect: 'none',
  transition: 'background-color 0.1s',
  ':hover': {
    backgroundColor: 'hsl(120, 60%, 35%)'
  },
  ':active': {
    backgroundColor: 'hsl(120, 60%, 30%)'
  },
  '&.disabled': {
    backgroundColor: 'hsl(120, 60%, 50%)',
    boxShadow: 'none'
  }
})

export default (props: HTMLAttributes<HTMLDivElement> & { disabled?: boolean }) =>
  <div css={style}
       className={props.disabled ? 'disabled' : ''}
       {...props}>{props.children}</div>
