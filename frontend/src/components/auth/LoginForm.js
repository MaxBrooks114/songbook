import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { renderTextField } from '../sharedComponents/MaterialUiReduxFormFields'

const useStyles = makeStyles((theme) => ({
  root: {

    '& .MuiOutlinedInput-root': {
      background: theme.palette.background.default,
      width: 300,
      [theme.breakpoints.down('md')]: {
        width: 240
      },
      [theme.breakpoints.down('sm')]: {
        width: 200
      },
      '& fieldset': {
        borderColor: theme.palette.info.main
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.dark
      }
    },
    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: theme.palette.info.main
    },
    ' & .MuiFormHelperText-contained': {
      color: theme.palette.common.orange
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.orange
    },

    '& .MuiFormLabel-root.Mui-error': {
      color: theme.palette.common.orange
    }
  },

  button: {
    color: theme.palette.info.main,
    marginTop: '1rem',
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.gray,
    '&:hover': {
      background: theme.palette.common.gray,
      color: theme.palette.secondary.dark
    }

  },

  errorMessages: {
    color: theme.palette.common.orange
  },

  input: {
    textTransform: 'capitalize'
  },

  label: {
    color: theme.palette.info.main,
    '&.shrink': {
      color: theme.palette.info.main
    }

  }

}))

const LoginForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles()
  const messages = useSelector((state) => state.messages)
  const errorMessages = useSelector((state) => state.errors.msg)
  const user = useSelector(state => state.auth.user)
  const onFormSubmit = (formValues) => {
    onSubmit(formValues)
  }

  const renderPasswordField = () => {
    return !user
      ? (
            <Field classes={classes} InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }} type="password" name="password" component={renderTextField} label="Password" />
        )
      : (<Link to="/passwordReset">Reset your Password</Link>)
  }

  const renderErrorMessages = () => {
    if (!errorMessages.headers) {
      return Object.values(errorMessages).map((msg) => <div key={msg} className={classes.errorMessages}>{msg}</div>)
    }
  }

  const renderMessages = () => {
    return Object.values(messages).map(msg => <div key={msg}>{msg}</div>)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
      <Grid container alignItems="flex-end" align="center" justify="flex-end" >
          <Grid item style={{ marginBottom: '4px' }} xs={12}>
            <Field classes={classes} name="username" component={renderTextField} label="Username" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }} />
          </Grid>
          <Grid item xs={12}>
              {renderPasswordField()}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" className={classes.button} variant="contained">
              {user ? 'Change Username' : 'Login'}
            </Button>
          </Grid>
           <Grid item xs={12}>
              {renderErrorMessages()}
              {renderMessages()}
          </Grid>
      </Grid>
    </form>
  )
}

const validate = (formValues) => {
  const errors = {}
  const requiredFields = ['username', 'password']
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'Login',
  validate
})(LoginForm)
