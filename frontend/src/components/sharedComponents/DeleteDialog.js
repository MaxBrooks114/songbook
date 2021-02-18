import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({

  dialog: {
    '& .MuiDialog-paper': {
      background: theme.palette.secondary.main
    },

    '& .MuiTypography-root': {
      color: theme.palette.info.main
    },

    '& .MuiButton-textPrimary': {
      color: theme.palette.info.main
    }

  }

}))
const DeleteDialog = ({ item, open, setOpen, message1, message2, deleteFunction }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">{message1}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message2}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                handleClose()
                dispatch(deleteFunction(item.id, item))
              }}
              color="primary"
              style={{ color: theme.palette.common.orange }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
  )
}

export default DeleteDialog
