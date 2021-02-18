import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { resetPassword } from '../../actions/auth'
import { createMessage } from '../../actions/messages'
import { renderTextField } from '../sharedComponents/MaterialUiReduxFormFields'

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
    },

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
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.gray,
    '&:hover': {
      background: theme.palette.common.gray,
      color: theme.palette.secondary.dark
    }

  },

  container: {
    marginTop: 50,
    minHeight: '110vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '100vh'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '180vh'
    }

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

const PasswordReset = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const user = useSelector((state) => state.auth.user)
  const errorMessages = useSelector((state) => state.errors.msg)
  const renderErrorMessages = () => {
    for (const msg in messages) {
      return messages[msg]
    }
    if (Object.keys(errorMessages).includes('password')) {
      for (const key in errorMessages) {
        for (const msg of errorMessages[key]) {
          return msg
        }
      }
    }
  }
  const onFormSubmit = (formValues) => {
    const { password, password2 } = formValues
    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: 'Passwords must match' }))
    } else {
      dispatch(resetPassword(user.id, formValues))
    }
  }
  return (
    <div className={classes.container}>
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
       <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Reset Your Password
        </Typography>
      <Grid container align="center" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Field classes={classes} InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }} type="password" name="password" component={renderTextField} label="Password" />
          </Grid>
          <Grid item xs={12}>
            <Field
              classes={classes}
              type="password"
              name="password2"
              component={renderTextField}
              label="Confirm Password"
               InputLabelProps={{
                 classes: {
                   root: classes.label,
                   shrink: 'shrink'
                 }
               }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" className={classes.button} variant="contained">
              Reset Password
            </Button>
          </Grid>
          {renderErrorMessages()}
      </Grid>
        </form>
    </div>
  )
}

const validate = (formValues) => {
  const errors = {}
  const requiredFields = ['password', 'password2']
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'PasswordReset',
  validate
})(PasswordReset)
