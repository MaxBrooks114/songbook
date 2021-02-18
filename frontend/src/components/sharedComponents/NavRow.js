import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFilteredItems } from '../../selectors/filterSelectors'

const useStyles = makeStyles((theme) => ({

  button: {
    '&:hover': {
      background: theme.palette.primary.light
    }
  },
  buttonContainer: {
    textAlign: 'center'
  },

  navRow: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: 4
  },

  navButton: {
    padding: 0,
    height: 24,
    width: 24

  }

}))

const NavRow = ({ item, objectType }) => {
  const filteredItems = useSelector((state) => getFilteredItems(state, objectType), shallowEqual)
  const next = filteredItems[filteredItems.indexOf(item) + 1]
  const prev = filteredItems[filteredItems.indexOf(item) - 1]

  const history = useHistory()

  const classes = useStyles()
  return (
    <Grid container justify="space-between" className={classes.navRow}>
              <Grid item xs={4} className={classes.buttonContainer}>
                 {prev
                   ? <IconButton className={classes.button}
                    onClick={(event) => history.push(`/${objectType}/${prev.id}`)}
                > <SkipPreviousRoundedIcon className={classes.navButton} />
                </IconButton>
                   : null }
              </Grid>
                <Grid item xs={4} className={classes.buttonContainer} >
                  {next
                    ? <IconButton className={classes.button}
                        onClick={(event) => history.push(`/${objectType}/${next.id}`)}
                    > <SkipNextRoundedIcon className={classes.navButton}/>
                    </IconButton>
                    : null}
                </Grid>
            </Grid>
  )
}

export default NavRow
