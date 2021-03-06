import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  heading: css({
    fontSize: rem(theme.fontSizes.xl),
    fontWeight: 'normal',
    lineHeight: '1em',
    marginTop: 0,
    marginBottom: rem(theme.gutters.md),
    color: theme.colors.text,
  }),
}
