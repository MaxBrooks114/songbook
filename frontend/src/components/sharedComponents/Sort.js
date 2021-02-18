import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { setFilter } from '../../actions/filter'
import { renderTextField } from './MaterialUiReduxFormFields'

const useStyles = makeStyles((theme) => ({

  root: {
    color: theme.palette.info.main,
    display: 'inline',
    verticalAlign: 'middle',
    textTransform: 'capitalize',
    width: '95%',
    marginRight: 'auto',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main
      },

      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.dark
      },

      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark
      }
    },

    '& .MuiInputBase-input': {
      color: theme.palette.info.main,
      textTransform: 'capitalize'
    },

    '& .MuiTextField-root': {
      color: theme.palette.info.main,
      width: 120,
      marginRight: 15,
      [theme.breakpoints.down('md')]: {
        marginRight: 0,
        width: 100
      }
    },

    '& .MuiOutlinedInput-input': {
      color: theme.palette.info.main,
      paddingTop: 10.5,
      paddingBottom: 10.5,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: '.8rem'
    },

    '& .MuiFormControl-root': {
      verticalAlign: 'middle'
    },
    '& .MuiFormControlLabel-label': {
      color: theme.palette.info.main,
      fontSize: '.8rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '.3rem'
      }
    },

    '& .MuiGrid-item': {
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px !important'
      }
    },

    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  },

  label: {
    color: theme.palette.info.main,
    fontSize: '.8rem',
    '&.shrink': {
      color: theme.palette.primary.dark
    }
  },

  listbox: {
    '& .MuiPaper-root': {
      background: theme.palette.background.default
    }
  },

  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',
    fontSize: '.8rem',
    '&[data-focus="true"]': {
      background: theme.palette.common.gray,
      color: theme.palette.info.main
    }
  }

}))

const Sort = ({ objectType }) => {
  const filterValues = useSelector(state => state.filter)
  const filterForm = useSelector(state => state.form.FilterForm)
  const songProps = ['title', 'artist', 'album', 'genre', 'tempo', 'time_signature', 'duration', 'year', 'valence', 'instrumentalness', 'energy', 'acousticness', 'created_at', 'updated_at', 'loudness', 'speechiness', 'liveness', 'danceability', 'key', 'mode']
  const sectionProps = ['name', 'start', 'tempo', 'time_signature', 'duration', 'created_at', 'updated_at', 'song', 'key', 'mode']
  const itemProps = objectType === 'songs' ? songProps : sectionProps

  const dispatch = useDispatch()

  useEffect(() => {
    if (!filterValues.sort && !filterValues.filter) {
      if (objectType === 'songs') {
        dispatch(setFilter({ sort: 'artist', order: 'ascending' }))
      } else {
        dispatch(setFilter({ sort: 'song', order: 'ascending' }))
      }
    }

    if (!itemProps.includes(filterValues.sort)) {
      dispatch(setFilter({ sort: 'created_at', order: 'ascending' }))
    }
  }, [filterValues.sort, filterValues.filter, objectType, itemProps, dispatch])

  const classes = useStyles()

  return (
        <form name="FilterForm" className={classes.root} >
              <Field classes={classes}
                      name="sort"
                      label="Sort"
                      component={renderTextField}
                      select
                      options={ itemProps && itemProps.length ? itemProps.map(prop => prop).sort() : null }
                      onChange={(e, v) => {
                        // redux forms do not allow for submitting forms onChange in a neat way so this is my dirty work around
                        if (filterForm && filterForm.values) dispatch(setFilter({ sort: v, order: filterForm.values.order, filter: true }))
                        if (filterForm && filterForm.values.sort !== filterValues.sort) dispatch(setFilter({ sort: v, order: filterForm.values.order, filter: true }))
                      }
                      }

                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                          shrink: 'shrink'
                        }
                      }}
              />

              <Field classes={classes}
                    name="order"
                    label="Order"
                    select
                    options={['ascending', 'descending']}
                    component={renderTextField}
                    onChange={(e, v) => {
                      // redux forms do not allow for submitting forms onChange in a neat way so this is my dirty work around
                      dispatch(setFilter({ order: v, sort: filterForm.values.sort, filter: true }))
                      if (filterForm.values.order !== filterValues.order) dispatch(setFilter({ order: v, sort: filterForm.values.sort, filter: true }))
                    }
                      }
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        shrink: 'shrink'
                      }
                    }}/>
        </form>
  )
}

export default reduxForm({
  form: 'FilterForm'

})(Sort)
