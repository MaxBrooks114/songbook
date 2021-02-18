import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { renderAutoCompleteDataField, renderTextField } from '../sharedComponents/MaterialUiReduxFormFields'
import { instrumentFamilies, instrumentList, instrumentTonalities } from './instruments'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      background: theme.palette.background.default,
      width: 300,
      [theme.breakpoints.down('md')]: {
        width: 160
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
    background: theme.palette.common.gray
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

  listbox: {
    background: theme.palette.background.default
  },

  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: theme.palette.primary.main,
      color: theme.palette.background.default
    }
  },

   songFieldContainer: {
      height: 49, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
  },

  value: {
    color: theme.palette.info.main
  }

}))

const InstrumentForm = ({ onSubmit, handleSubmit, initialValues }) => {
  const classes = useStyles()

  const onFormSubmit = (formValues) => {
    onSubmit(formValues)
  }
  return (

    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
      <Grid container alignItems="center" spacing={2} align="center" justify="flex-end" >
         <Grid item xs={12} md={6} >
            <Field
              classes={classes}
              required
              options={instrumentList.sort()}
              name="name"
              defaultValue={initialValues && initialValues.name ? initialValues.name : undefined}
              component={renderAutoCompleteDataField}
              label="Name"
            />
          </Grid>

          <Grid item xs={12} md={6} className={classes.songFieldContainer}>
            <Field
              classes={classes}
              name="year"
              component={renderTextField}
              label="Year"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }}/>
          </Grid>
         <Grid item xs={12} md={6}>
            <Field
              classes={classes}
              name="make"
              component={renderTextField}
              label="Make"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }} />
          </Grid>

          <Grid item xs={12} md={6}>
           <Field
              classes={classes}
              name="model"
              component={renderTextField}
              label="Model"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              options={instrumentFamilies.sort()}
              classes={classes}
              name="family"
              component={renderAutoCompleteDataField}
              defaultValue={initialValues && initialValues.family ? initialValues.family : undefined}
              label="Family"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field
              options={instrumentTonalities.sort()}
              classes={classes}
              name="tonal_range"
              component={renderAutoCompleteDataField}
              defaultValue={initialValues && initialValues.tonal_range ? initialValues.tonal_range : undefined}
              label="Tonality"
               InputLabelProps={{
                 classes: {
                   root: classes.label,
                   shrink: 'shrink'
                 }
               }}
            />
          </Grid>

          <Grid item xs={12} md={3} >
            <Button type="submit" className={classes.button} variant="contained">
              Submit
            </Button>
          </Grid>
      </Grid>
    </form>

  )
}

const validate = (formValues) => {
  const errors = {}
  const requiredFields = ['title', 'artist']
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'InstrumentCreate',
  validate
})(InstrumentForm)
