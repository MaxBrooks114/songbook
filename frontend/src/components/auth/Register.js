import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, Redirect } from 'react-router-dom'

import { register } from '../../actions/auth'
import UserForm from './UserForm'

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
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }
}))

const Register = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const onSubmit = (formValues) => {
    dispatch(
      register({
        ...formValues
      })
    )
  }

  const classes = useStyles()

  return isAuthenticated
    ? (
    <Redirect to={'/'} />
      )
    : (
      <div className={classes.container}>
        <div className={classes.toolbarMargin}></div>
        <div className={classes.root}>
        <Typography className={classes.title} variant="h2" align="center" gutterBottom>
          Register your SongBook
        </Typography>
        <UserForm onSubmit={onSubmit} />
        <div className={classes.toolbarMargin}></div>
        <Typography variant="subtitle1" align="center">
          Already have an account?{' '}
          <Link className={classes.link} component={RouterLink} to="/login">
            Log in
          </Link>
        </Typography>
        </div>
      </div>

      )
}

export default Register
