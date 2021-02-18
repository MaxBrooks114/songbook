import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, Redirect } from 'react-router-dom'

import { login } from '../../actions/auth'
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

  container: {
    minHeight: '110vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '100vh'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '180vh'
    }

  },

  link: {
    color: theme.palette.info.main
  },

  title: {
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }
}))

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const onSubmit = (formValues) => {
    dispatch(
      login({
        ...formValues
      })
    )
  }

  const classes = useStyles()

  return isAuthenticated && user
    ? (
    <Redirect to={`/users/${user.id}/progress`} />
      )
    : (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root}>
        <Typography className={classes.title} variant="h2" align="center" gutterBottom>
          Log in to SongBook
        </Typography>
        <LoginForm onSubmit={onSubmit} />
        <div className={classes.toolbarMargin}></div>
        <Typography  variant="subtitle1" align="center">
          Don't have an account?{' '}
          <Link className={classes.link} component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </div>
    </div>
      )
}

export default Login
