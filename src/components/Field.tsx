import { css } from '@emotion/core'
import range from 'lodash.range'

import Block from './Block'

const style = css({
  position: 'absolute',
  zIndex: 0,
  width: 'var(--field)',
  height: 'var(--field)',
  display: 'grid',
  '--block': 'calc((var(--field) - 7 * var(--gap)) / 8)',
  gridTemplateColumns: `
    var(--block) var(--block) var(--block) var(--block)
    var(--block) var(--block) var(--block) var(--block)`,
  gridTemplateRows: `
    var(--block) var(--block) var(--block) var(--block)
    var(--block) var(--block) var(--block) var(--block)`,
  gridGap: 'var(--gap)'
})

export default () => <div css={style}>{
  range(64).map(n => <Block key={n} block={n} />)
}</div>
