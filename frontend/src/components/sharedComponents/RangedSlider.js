import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    color: theme.palette.info.main,

    '& .MuiSlider-markLabelActive': {

      color: theme.palette.info.main
    },

    '& .MuiSlider-thumb': {
      color: theme.palette.info.main,
      '& .MuiSlider-valueLabel': {
        color: theme.palette.background.default,

        '& .PrivateValueLabel-label-64': {
          color: theme.palette.background.default
        }

      }
    },

    [theme.breakpoints.down('sm')]: {
      width: 200,
      padding: '10px 0'
    }

  },

  title: {
    fontSize: '.8rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      fontSize: '.8rem'
    }

  }

}))

const RangedSlider = ({ min, max, label, marks, valueLabelDisplay, valueLabelFormat, onChange, ...other }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState([min, max])
  const handleChange = (event, newValue, other) => {
    setValue(newValue)
    onChange(newValue)
  }
  return (
    <div >
     <Typography align="center" className={classes.title} id="range-slider" gutterBottom>{label}</Typography>
      <Slider
        className={classes.root}
        onChange={handleChange}
        value={value}
        {...other}
        valueLabelDisplay={valueLabelDisplay}
        valueLabelFormat={valueLabelFormat}
        min={min}
        max={max}
        marks={marks}
        defaultValue={[min, max]}
        aria-labelledby="range-slider"
      />
    </div>
  )
}

export default RangedSlider
