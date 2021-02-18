import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { deleteUser, editUser } from '../../actions/auth'
import Spotify_Icon_RGB_Green from '../../assets/Spotify_Icon_RGB_Green.png'
import DeleteDialog from '../sharedComponents/DeleteDialog'
import LoginForm from './LoginForm'

const useStyles = makeStyles((theme) => ({

  root: {
    color: theme.palette.info.main,
    width: '50%',
    margin: 'auto',
    padding: '2rem',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    [theme.breakpoints.down('md')]: {
      width: '75%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  button: {
    color: theme.palette.background.default,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.gray,
      background: theme.palette.info.main
    }

  },

  buttonContainer: {
    marginTop: '1rem'
  },

  container: {
    minHeight: '110vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '100vh'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '180vh'
    }

  },

  delete: {
    color: theme.palette.info.main,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.orange,
    '&:hover': {
      color: theme.palette.common.orange,
      background: theme.palette.info.main
    }
  },

  link: {
    color: theme.palette.background.default,
    textDecoration: 'none'
  },

  spotifyLogo: {
    height: 21,
    width: 21,
    verticalAlign: 'middle'
  },

  title: {
    fontSize: '2.8rem',
    fontWeight: 600,
    color: theme.palette.info.main,
    textAlign: 'center',
    width: '100%',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }

}))

const UserEdit = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const accessToken = useSelector(state => state.auth.user.spotify_info.access_token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const onSubmit = (formValues) => {
    dispatch(
      editUser(user.id, {
        ...formValues
      })
    )
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const classes = useStyles()

  return !isAuthenticated
    ? (
    <Redirect to={'/login'} />
      )
    : (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root} >
        <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Edit Your Information
        </Typography>
        <fieldset>
          <LoginForm onSubmit={onSubmit} />
        </fieldset>
        {accessToken
          ? null
          : <Grid container justify="center" className={classes.buttonContainer}>
            <Button className={classes.button} >
               <a className={classes.link} href={`http://localhost:8000/api/spotify/login/${user.id}`}>Integrate Spotify</a>
              <img className={classes.spotifyLogo} src={Spotify_Icon_RGB_Green} alt="SpotifyLogo"/>
            </Button>
        </Grid>}
        <Grid container justify="center" className={classes.buttonContainer}>
            <Button className={classes.delete} onClick={handleClickOpen}>
              Delete Account
            </Button>
        </Grid>
        <DeleteDialog
          item={user}
          message1="Are you sure you want to delete your account?"
          message2="You will lose all data associated with your account including songs, instruments and sections." deleteFunction={deleteUser}
          open={open}
          setOpen={setOpen} />
      </div>
    </div>
      )
}

export default UserEdit
