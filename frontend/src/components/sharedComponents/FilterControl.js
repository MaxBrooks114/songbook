import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { clearFields, Field, initialize, reduxForm, reset } from 'redux-form'

import { clearFilter, clearNonArrayFields, setFilter } from '../../actions/filter'
import filter_arrow_left from '../../assets/filter_arrow_left.svg'
import Spotify_Icon_RGB_Green from '../../assets/Spotify_Icon_RGB_Green.png'
import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { millisToMinutesAndSeconds, normalize, renderText, titleCase } from '../../helpers/detailHelpers'
import { renderAutoCompleteDataField, renderRadioGroup, renderSlider, renderTextField } from './MaterialUiReduxFormFields'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 180,
    color: theme.palette.info.main,
    textTransform: 'capitalize',

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

    '& input': {
      fontSize: '.8rem',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    },

    '& .MuiInputBase-input': {
      color: theme.palette.info.main,
      textTransform: 'capitalize'
    },

    '& .MuiTextField-root': {
      color: theme.palette.info.main
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.info.main
    },

    '& .MuiFormControlLabel-label': {
      color: theme.palette.info.main,
      fontSize: '.8rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem'
      }
    },

    '& .MuiGrid-item': {

      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px !important'
      }

    },

    '& .MuiTypography-body1': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem'
      }
    }

  },

  accordion: {
    background: theme.palette.common.gray,
    color: theme.palette.info.main,
    marginBottom: '1em',
    '& .MuiAccordionSummary-content': {
      flexGrow: 0
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'flex-start',
      [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem'
      }
    }
  },

  button: {
    color: theme.palette.info.light,
    display: 'inline-block',
    borderRadius: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%,  ${theme.palette.common.gray} 150%)`,
    '&:hover': {
      background: theme.palette.common.gray,
      color: theme.palette.secondary.dark
    }

  },

  clearButton: {
    borderRadius: 4,
    display: 'inline-block',
    marginLeft: 26,
    color: theme.palette.common.gray,
    background: theme.palette.info.light,
    '&:hover': {
      color: theme.palette.info.light,
      background: theme.palette.common.gray
    }

  },

  drawerIcon: {
    height: 54,
    width: 54
  },

  drawerIconContainer: {
    '&:hover': {
      background: theme.palette.common.gray
    }
  },

  label: {
    color: theme.palette.info.main,
    fontSize: '.8rem',
    '&.shrink': {
      color: theme.palette.primary.dark
    }
  },

  link: {
    color: theme.palette.background.default,
    textDecoration: 'none'
  },

  listbox: {
    background: theme.palette.common.gray

  },

  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',
    fontSize: '.8rem',
    '&[data-focus="true"]': {
      background: theme.palette.background.default,
      color: theme.palette.info.main
    }
  },

  select: {
    height: 40
  },

  spotify: {
    color: theme.palette.background.default,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.gray,
      background: theme.palette.info.main
    }

  },

  spotifyLogo: {
    height: 21,
    width: 21,
    verticalAlign: 'middle'
  }

}))

const FilterControl = ({ objectType, handleSubmit, setOpenDrawer, openDrawer }) => {
  const dispatch = useDispatch()
  const filterForm = useSelector(state => state.form.FilterForm, shallowEqual)
  const filterValues = useSelector(state => state.filter, shallowEqual)
  const instruments = useSelector(state => state.instruments, shallowEqual)
  const songs = Object.values(useSelector(state => state.songs), shallowEqual)
  const location = useLocation()
  const accessToken = useSelector(state => state.auth.user.spotify_info.access_token, shallowEqual)
  const items = Object.values(useSelector((state) => state[objectType]), shallowEqual)
  const userId = useSelector(state => state.auth.user.id)
  const songOrSections = location.pathname.split('/')[1]
  const booleans = {
    true: true,
    false: false
  }

  const initializeSliders = () => {
    dispatch(setFilter({ duration: [0, Math.max(...items.filter(item => item !== 0 && !isNaN(parseInt(item.duration))).map((item) => parseInt((item.duration)) + 1))] }))

    dispatch(setFilter({ tempo: [0, Math.max(...items.filter(item => !isNaN(parseInt(item.tempo))).map((item) => parseInt((item.tempo)) + 1))] }))

    dispatch(setFilter({ year: [0, Math.max(...items.filter(item => !isNaN(parseInt(item.year))).map((item) => parseInt((item.year)) + 1))] }))
  }

  useEffect(() => {
    if (filterForm && filterForm.values && !filterForm.values.title && !filterForm.values.name && !filterForm.values.album && !filterForm.values.artist && !filterForm.values.key && !filterForm.values.genre) {
      dispatch(setFilter({ filter: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songOrSections])

  useEffect(() => {
    if (filterForm && !filterForm.values) {
      dispatch(initialize('FilterForm', {
        ...filterValues,
        artist: '',
        genre: '',
        album: '',
        key: ''
      }))
    }
  }, [objectType, dispatch, items, filterForm, filterValues])

  useEffect(() => {
    return () => {
      dispatch(clearNonArrayFields())
    }
  }, [dispatch])

  useEffect(() => {
    if (songs.length === 0) setOpenDrawer(false)
  })

  useEffect(() => {
    initializeSliders()
  }, [location.pathname])

  useEffect(() => {
    if (filterValues.duration.some(val => val === null)) initializeSliders()
  })

  const renderAdvancedFilters = () => {
    const advancedOptions = objectType === 'songs' ? ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'] : []
    return advancedOptions.length
      ? advancedOptions.map(option => {
        return (
            <AccordionDetails key={option}>
               <Grid item sm={12} xs={12}>
              <Field classes={classes}
                  min={1}
                  max={3}
                  marks={[{ value: 1, label: 'Low' }, { value: 2, label: 'Medium' }, { value: 3, label: 'High' }]}
                  valueLabelDisplay={'off'}

                  name= {option}
                  component={renderSlider}
                  label={titleCase(option)}
                  />
              </Grid>
            </AccordionDetails>
        )
      })
      : null
  }

  const renderTextFields = () => {
    const fields = objectType === 'songs' ? ['title'] : ['name']

    return fields.length > 0
      ? fields.map(field => {
        return (
           <Grid item sm={12} xs={12} key={field}>
              <Field classes={classes} name={field} label={titleCase(field)}
                   InputLabelProps={{
                     classes: {
                       root: classes.label,
                       shrink: 'shrink'
                     }
                   }} component={renderTextField} />
           </Grid>
        )
      })
      : null
  }

  const renderStringFields = () => {
    const fields = objectType === 'songs' ? ['artist', 'album', 'genre'] : []
    return fields.length > 0
      ? fields.map(field => {
        return (
           <Grid item sm={12} xs={12} key={field}>
              <Field
                  options={_.uniq(songs.filter(song => song[field]).map((song) => song[field])).sort()}
                  classes={classes}
                  name={field}
                  component={renderAutoCompleteDataField}
                  label={titleCase(field)}
                   InputLabelProps={{
                     classes: {
                       root: classes.label,
                       shrink: 'shrink'
                     }
                   }}
                  />
              </Grid>
        )
      })
      : null
  }

  const renderRadioFields = () => {
    const fields = objectType === 'songs' ? ['original', 'explicit'] : ['learned']
    return fields.length > 0
      ? fields.map((field) => {
        return (
          <Grid container direction="row" justify="center" key={field}>
            <Grid item xs={8}>
              <Field classes={classes} name={field} title={field} component={renderRadioGroup} InputLabelProps={{
                classes: {
                  formControlLabel: classes.label,
                  label: classes.label
                }
              }} />
            </Grid>
        </Grid>
        )
      })
      : null
  }

  const renderYearField = () => {
    return objectType === 'songs'
      ? (
         <Grid item sm={12} xs={12}>
          <Field classes={classes}
                 min={Math.min(...items.filter(item => !isNaN(parseInt(item.year))).map((item) => parseInt(item.year.split('-')[0])))}
                 max={Math.max(...items.filter(item => !isNaN(parseInt(item.year))).map((item) => parseInt(item.year.split('-')[0])))}

                 valueLabelDisplay='auto'
                 name="year"
                 component={renderSlider}
                 label="Year Released"

                 />

          </Grid>
        )
      : null
  }

  const renderSongAndInstrumentFields = () => {
    const fields = ['song', 'instrument']
    return objectType === 'sections'
      ? fields.map((field) => {
        const fieldProp = field === 'song' ? 'title' : 'name'
        const choices = field === 'song' ? songs.filter(song => !!song.sections.length).sort((a, b) => a.title > b.title ? 1 : -1) : Object.values(instruments)
        return (
            <Grid item key={field}>
              <Field
                classes={classes}
                name={field}
                label={titleCase(field)}
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    shrink: 'shrink'
                  }
                }}
                component={renderAutoCompleteDataField}
                options={choices.map(choice => choice[fieldProp])}/>
            </Grid>
        )
      })
      : null
  }

  const onFormSubmit = (formValues) => {
    onSubmit(formValues)
  }

  const onSubmit = (formValues) => {
    dispatch(
      setFilter({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
        original: formValues.original !== '' ? booleans[formValues.original] : formValues.original,
        explicit: formValues.explicit !== '' ? booleans[formValues.explicit] : formValues.explicit,
        learned: formValues.learned !== '' ? booleans[formValues.learned] : formValues.learned,
        filter: true
      })
    )
  }
  const classes = useStyles()

  return (
     <div >

      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
          <img src={filter_arrow_left} alt='close filter drawer' className={classes.drawerIcon} />
      </IconButton>
       <form
            className={classes.root}
            onSubmit={handleSubmit(onFormSubmit)}
            >
      <Grid container direction="column" align="center" spacing={2} justify="center" >
        {!accessToken
          ? <Grid item xs={12}>
            <Button className={classes.spotify} >
               <a className={classes.link} href={`http://localhost:8000/api/spotify/login/${userId}`}>Integrate Spotify</a>
              <img className={classes.spotifyLogo} src={Spotify_Icon_RGB_Green} alt="SpotifyLogo"/>
            </Button>
          </Grid>
          : null }
        <Grid item xs={12}>
          <Button className={classes.button} type="submit" variant="contained">
            Filter
          </Button>
           <Button className={classes.clearButton} onClick={e => {
             dispatch(reset('FilterForm'))
             dispatch(clearFields('FilterForm'))
             dispatch(clearFilter())
             initializeSliders()
           }} variant="contained">
                    clear
            </Button>
        </Grid>
              {renderTextFields()}
              {renderStringFields()}
            <Grid item sm={12} xs={12}>
              <Field
                options={_.uniq(items.filter(item => item.key !== null).map((item) => renderText(keys, item.key))).sort()}
                classes={classes}
                name="key"

                component={renderAutoCompleteDataField}
                label="Key"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    shrink: 'shrink'
                  }
                }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field

                  options={modes.map(mode => Object.values(mode)[0])}
                  classes={classes}
                  name="mode"
                  component={renderAutoCompleteDataField}
                  label="Mode"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Field

                  options={_.uniq(items.filter(item => !isNaN(parseInt(item.time_signature))).map((item) => `${item.time_signature}/4`))}
                  classes={classes}
                  name="time_signature"
                  component={renderAutoCompleteDataField}
                  label="Time Signature" />
            </Grid>

          <Grid container justify="center" align="center" alignItems="center">
          <Grid item sm={12} xs={10}>
              <Field
                classes={classes}
                min={0}
                max={Math.max(...items.filter(item => !isNaN(parseInt(item.duration))).map((item) => parseInt((item.duration)) + 1))}
                name="duration"
                valueLabelDisplay='auto'
                valueLabelFormat={x => millisToMinutesAndSeconds(x) }
                component={renderSlider}
                label="Duration"

                />
              </Grid>
              {renderYearField()}
          <Grid item sm={10} xs={10} >
              <Field classes={classes}
                    min={Math.min(...items.filter(item => !isNaN(parseInt(item.tempo)) || item.tempo === 0).map((item) => parseInt(item.tempo)))}
                    max={Math.max(...items.filter(item => !isNaN(parseInt(item.tempo)) || item.tempo === 0).map((item) => parseInt(item.tempo)))}
                    name="tempo"
                    valueLabelDisplay='auto'
                    component={renderSlider}
                    label="Tempo"
                    />
          </Grid>
          </Grid>
          {renderSongAndInstrumentFields()}
          <Grid item xs={12} >
              <Grid container direction="row" justify={objectType === 'songs' ? 'flex-start' : 'center'}>
                { renderRadioFields() }
              </Grid>
          </Grid>
        { objectType === 'songs'
          ? <Grid item xs={12}>
             <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.accordionHeader}>Advanced</Typography>
                </AccordionSummary>
                <Grid container justify="space-evenly">
                      {renderAdvancedFilters()}
                </Grid>
             </Accordion>
          </Grid>
          : null}
          </Grid>
      </form>
    </div>
  )
}

export default React.memo(reduxForm({
  form: 'FilterForm'
})(FilterControl))
