import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { createMessage } from '../../actions/messages'
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

  autoComplete: {
    color: theme.palette.info.main
  },

  button: {
    color: theme.palette.info.main,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.gray,
    marginTop: '1rem'
  },

  input: {
    textTransform: 'capitalize'
  },

  label: {
    color: theme.palette.info.main,
    '&.shrink': {
      color: theme.palette.info.main
    }

  },

  value: {
    color: theme.palette.info.main
  }

}))

const UserForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const errorMessages = useSelector((state) => state.errors.msg)
  const renderErrorMessages = () => {
    if (!errorMessages.headers) {
      return Object.values(errorMessages).map((msg) => <div key={msg} className={classes.errorMessages}>{msg}</div>)
    }
  }

  const renderMessages = () => {
    return Object.values(messages).map(msg => <div key={msg}>{msg}</div>)
  }
  const onFormSubmit = (formValues) => {
    const { password, confirm_password } = formValues
    if (password !== confirm_password) {
      dispatch(createMessage({ passwordNotMatch: 'Passwords must match' }))
    } else {
      onSubmit(formValues)
    }
  }
  return (
    <div>
      <Grid container align= "center" justify="center" spacing={2}>
        <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
          <Grid item xs={12}>
            <Field classes={classes} name="username" component={renderTextField} label="Username" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }}/>
          </Grid>
          <Grid item xs={12}>
            <Field classes={classes} type="email" name="email" component={renderTextField} label="E-Mail" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }}/>
          </Grid>
          <Grid item xs={12}>
            <Field
              classes={classes}
              type="password"
              name="password"
              component={renderTextField}
              label="Password"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }} />
          </Grid>
          <Grid item xs={12}>
            <Field
              classes={classes}
              type="password"
              name="confirm_password"
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
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
          {renderErrorMessages()}
          {renderMessages()}
          </Grid>
        </form>
      </Grid>
    </div>
  )
}

const validate = (formValues) => {
  const errors = {}
  const requiredFields = ['username', 'email', 'password', 'confirm_password']
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'Register',
  validate
})(UserForm)
