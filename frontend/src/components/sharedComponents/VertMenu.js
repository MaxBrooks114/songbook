import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

  deleteChoice: {
    color: theme.palette.common.orange
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.darkGreen
    }
  },

  menu: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.info.main
  },

  menuItem: {
    ...theme.typography.tab,
    '& .MuiMenuItem-root': {
      justifyContent: 'center'
    }
  }

}))

const VertMenu = ({ song, section, instrument, popped, setAnchorEl, anchorEl, setOpen, objectType }) => {
  const item = song || section || instrument
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={popped}
      onClose={handleMenuClose}
      classes={{ paper: classes.menu }}
    >
      <MenuItem
        className={classes.menuItem}
        onClick={() => {
          handleMenuClose()
        }}>
        <Link className={classes.link} to={`/${objectType}/edit/${item.id}`}>Edit</Link>
      </MenuItem>
        <MenuItem
          className={classes.deleteChoice}
          onClick={() => {
            handleMenuClose(); handleClickOpen()
          }}
        >
          Delete
        </MenuItem>
    </Menu>
  )
}

export default VertMenu
