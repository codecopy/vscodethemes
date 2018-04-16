import { SearchParams } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import generatePages from '../utils/generatePages'
import PageLink from './PageLink'

interface PaginationProps {
  totalPages: number
  params: SearchParams
  onClick: (params: SearchParams) => any
}

const maxVisiblePages = 7

const Pagination: React.SFC<PaginationProps> = ({
  totalPages,
  params,
  onClick,
}) => {
  const pages = generatePages(totalPages, params.page, maxVisiblePages)

  return (
    <div className={classes.pagination}>
      {pages.map((page, index) => {
        // Show skip backward icon if second page is not adjacent to the third page.
        const isSkipBackward =
          totalPages > 3 && index === 1 && pages[1] !== pages[2] - 1
        // Show skip forward icon if the second last page is not adjacent to the last page.
        const isSkipForward =
          totalPages > 3 &&
          index === maxVisiblePages - 2 &&
          pages[maxVisiblePages - 2] !== pages[maxVisiblePages - 3] + 1

        return (
          <PageLink
            key={page}
            page={page}
            params={params}
            skipBackward={isSkipBackward}
            skipForward={isSkipForward}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}

const boxWidth = 20
const boxHeight = 2

const classes = {
  pagination: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: em(theme.gutters.lg - theme.gutters.sm),
    color: theme.colors.text,
    maxWidth: em(320),
  }),

  icon: css({
    height: em(theme.fontSizes.md),
  }),

  page: css({
    position: 'relative',
    width: '100%',
    fontSize: em(theme.fontSizes.md),
    lineHeight: em(theme.fontSizes.md),
    padding: `0 0 ${em(theme.gutters.sm)}`,
    background: 'transparent',
    border: 'none',
    color: theme.colors.text,
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      color: theme.colors.palette[0],
    },
  }),

  active: css({
    color: theme.colors.palette[0],
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: em(-boxWidth / 2),
      height: em(boxHeight),
      width: em(boxWidth),
      borderRadius: em(boxHeight),
      backgroundColor: theme.colors.palette[4],
    },
  }),
}

export default Pagination
